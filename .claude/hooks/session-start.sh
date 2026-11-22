#!/bin/bash
# SessionStart hook: installs the third-party skills listed in .claude/skills-manifest.tsv
# into ~/.claude/skills, pinned to the commit that was reviewed. Runs only in Claude Code
# cloud sessions. It never fails the session: a skill that cannot be fetched is reported
# on stderr and retried at the next session start.
#
# Test locally:  FORCE_SKILL_INSTALL=1 SKILLS_TARGET=/tmp/skills-test .claude/hooks/session-start.sh

set -uo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ] && [ "${FORCE_SKILL_INSTALL:-}" != "1" ]; then
  exit 0
fi

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
MANIFEST="$ROOT/.claude/skills-manifest.tsv"
TARGET="${SKILLS_TARGET:-$HOME/.claude/skills}"
SELF="$ROOT/.claude/hooks/session-start.sh"
STAMP="$TARGET/.session-start.sha256"

[ -f "$MANIFEST" ] || { echo "skills manifest not found: $MANIFEST" >&2; exit 0; }
mkdir -p "$TARGET"

# Skip when the manifest and this script are unchanged and every listed skill is present.
need=0
sha256sum --check --status "$STAMP" 2>/dev/null || need=1
if [ "$need" = 0 ]; then
  while IFS=$'\t' read -r name repo commit path; do
    case "$name" in ''|'#'*) continue ;; esac
    [ -f "$TARGET/$name/SKILL.md" ] || { need=1; break; }
  done < "$MANIFEST"
fi
[ "$need" = 0 ] && exit 0

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

# One job per repo and commit: partial fetch of the pinned commit, sparse checkout of the needed paths.
fetch_repo() {
  local repo="$1" commit="$2" dir="$3"
  shift 3
  local paths=("$@") whole=0 p
  for p in "${paths[@]}"; do [ "$p" = "." ] && whole=1; done
  mkdir -p "$dir" && cd "$dir" || return 1
  git init -q . &&
  git remote add origin "https://github.com/$repo.git" &&
  timeout 240 git fetch -q --depth 1 --filter=blob:none origin "$commit" || return 1
  if [ "$whole" = 0 ]; then
    git sparse-checkout init --no-cone >/dev/null 2>&1 || return 1
    git sparse-checkout set "${paths[@]/#//}" >/dev/null 2>&1 || return 1
  fi
  timeout 240 git checkout -q FETCH_HEAD || return 1
}

declare -A seen
jobs_started=0
while IFS=$'\t' read -r name repo commit path; do
  case "$name" in ''|'#'*) continue ;; esac
  key="${repo//\//_}_${commit:0:12}"
  [ -n "${seen[$key]:-}" ] && continue
  seen[$key]=1
  paths=()
  while IFS=$'\t' read -r n2 r2 c2 p2; do
    case "$n2" in ''|'#'*) continue ;; esac
    [ "$r2" = "$repo" ] && [ "$c2" = "$commit" ] && paths+=("$p2")
  done < "$MANIFEST"
  ( fetch_repo "$repo" "$commit" "$WORK/$key" "${paths[@]}" || touch "$WORK/$key.failed" ) &
  jobs_started=$((jobs_started + 1))
done < "$MANIFEST"
wait

failures=0
while IFS=$'\t' read -r name repo commit path; do
  case "$name" in ''|'#'*) continue ;; esac
  key="${repo//\//_}_${commit:0:12}"
  src="$WORK/$key/$path"
  if [ -f "$WORK/$key.failed" ] || [ ! -f "$src/SKILL.md" ]; then
    echo "skill not installed: $name ($repo@${commit:0:12})" >&2
    failures=$((failures + 1))
    continue
  fi
  rm -rf "$TARGET/$name"
  cp -r "$src" "$TARGET/$name" && rm -rf "$TARGET/$name/.git"
  printf 'repo: https://github.com/%s\ncommit: %s\npath: %s\n' "$repo" "$commit" "$path" > "$TARGET/$name/.source"
done < "$MANIFEST"

# Write the stamp only when every skill installed, so a failed run is retried next time.
if [ "$failures" = 0 ]; then
  sha256sum "$MANIFEST" "$SELF" > "$STAMP"
  echo "skills installed in $TARGET"
else
  echo "$failures skill(s) failed; they will be retried at the next session start" >&2
fi
exit 0
