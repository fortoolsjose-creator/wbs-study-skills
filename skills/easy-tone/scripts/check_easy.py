#!/usr/bin/env python3
"""Check a piece of text against the easy-tone targets.

Usage:
    python3 -I check_easy.py answer.txt
    cat answer.txt | python3 -I check_easy.py -

Reports sentence length, Flesch-Kincaid grade, long-word share, passive-looking
verbs, dashes, banned words and contrast-sentence candidates. Contrast hits are
candidates for review. A human (or Claude) decides whether each one is real.
"""
import re
import statistics
import sys

TARGET_AVG = 12.0
MAX_SENT = 20
TARGET_FK = 6.0
MAX_LONG_WORDS = 0.15

CONTRAST = [
    (r"\bnot only\b", "not only ... but also"),
    (r"\b(?:not|n['’]t)\b[^.!?\n]{0,80}\b(?:but|instead|rather)\b", "not X but/instead/rather Y"),
    (r"\brather than\b", "rather than"),
    (r"\binstead of\b", "instead of"),
    (r"\bmore than just\b", "more than just"),
    (r"\bnot just\b", "not just"),
    (r"\bno [a-z]+,? just\b", "no X, just Y"),
    (r"\bless [a-z ]{1,25},? more\b", "less X, more Y"),
    (r"\b(?:it|this|that)(?:['’]s| is| isn['’]t| is not)\b[^.!?\n]{0,60}[,;]\s*(?:it|this|that)(?:['’]s| is)\b", "It is X, it is Y pair"),
    (r"\bnot about\b", "not about"),
    (r"\bdon['’]t think of\b[^.!?\n]*\bthink of\b", "Don't think of X. Think of Y"),
]

BANNED = [
    "utilize", "leverage", "commence", "in order to", "with respect to",
    "pertains", "aforementioned", "furthermore", "moreover", "hence",
    "thus", "therefore", "delve", "crucial", "landscape", "robust",
    "seamless", "simply", "obviously", "of course",
]


def syllables(word: str) -> int:
    w = re.sub(r"[^a-z]", "", word.lower())
    if not w:
        return 0
    groups = len(re.findall(r"[aeiouy]+", w))
    if w.endswith("e") and groups > 1 and not w.endswith("le"):
        groups -= 1
    return max(groups, 1)


def clean(text: str) -> str:
    text = re.sub(r"```.*?```", " ", text, flags=re.S)
    text = re.sub(r"`([^`]*)`", r"\1", text)
    text = re.sub(r"\*\*|__|\*", "", text)
    text = re.sub(r"^\s{0,3}#{1,6}\s*", "", text, flags=re.M)
    text = re.sub(r"^\s*(?:[-+*]|\d+[.)])\s+", "", text, flags=re.M)
    text = re.sub(r"^\s*\|?\s*:?-{3,}.*$", "", text, flags=re.M)
    text = text.replace("|", ". ")
    return text


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    raw = sys.stdin.read() if sys.argv[1] == "-" else open(sys.argv[1], encoding="utf-8").read()
    text = clean(raw)

    sentences = []
    for line in text.split("\n"):
        for s in re.split(r"(?<=[.!?])\s+", line.strip()):
            if len(s.split()) >= 3:
                sentences.append(s.strip())
    words = re.findall(r"[A-Za-z][A-Za-z’']*", text)
    if not sentences or not words:
        print("No sentences found.")
        return 1

    lengths = [len(s.split()) for s in sentences]
    avg = statistics.mean(lengths)
    syl = sum(syllables(w) for w in words)
    fk = 0.39 * (len(words) / len(sentences)) + 11.8 * (syl / len(words)) - 15.59
    long_share = sum(1 for w in words if syllables(w) >= 3) / len(words)
    passive = re.findall(r"\b(?:is|are|was|were|be|been|being)\s+\w+(?:ed|en)\b", text, flags=re.I)
    dashes = text.count("—") + text.count("–") + len(re.findall(r"\s--\s", text))

    print(f"Sentences: {len(sentences)}   Words: {len(words)}")
    print(f"Average sentence length: {avg:.1f} words (target <= {TARGET_AVG:.0f})")
    print(f"Median / longest: {statistics.median(lengths):.0f} / {max(lengths)} (longest target <= {MAX_SENT})")
    print(f"Flesch-Kincaid grade: {fk:.1f} (target <= {TARGET_FK:.0f})")
    print(f"Words with 3+ syllables: {long_share*100:.0f}% (target <= {MAX_LONG_WORDS*100:.0f}%)")
    print(f"Passive-looking verbs: {len(passive)}")
    print(f"Dashes: {dashes} (target 0)")

    too_long = [s for s, n in zip(sentences, lengths) if n > MAX_SENT]
    if too_long:
        print(f"\nSentences over {MAX_SENT} words ({len(too_long)}):")
        for s in too_long[:10]:
            print(f"  - {s[:140]}")

    low = text.lower()
    hits = [b for b in BANNED if re.search(r"\b" + re.escape(b) + r"\b", low)]
    if hits:
        print("\nBanned words found: " + ", ".join(hits))

    contrast_hits = []
    for pattern, label in CONTRAST:
        for s in sentences:
            if re.search(pattern, s, flags=re.I):
                contrast_hits.append((label, s))
    if contrast_hits:
        print(f"\nContrast-sentence candidates ({len(contrast_hits)}). Rewrite each as the true statement alone:")
        for label, s in contrast_hits[:15]:
            print(f"  [{label}] {s[:150]}")

    ok = (
        avg <= TARGET_AVG + 1
        and fk <= TARGET_FK + 1
        and not too_long
        and not contrast_hits
        and not hits
        and dashes == 0
    )
    print("\nRESULT: " + ("PASS" if ok else "REVIEW"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
