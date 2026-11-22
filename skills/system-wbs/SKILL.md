---
name: system-wbs
description: "Working method for Warwick Business School (WBS) coursework. It sets the order of work and names which skill runs at which step: deep-research-wbs for sources and drafting, scientific-critical-thinking for evidence quality, critical-thinking-logical-reasoning for stress-testing the argument, no-ai-slop and then humanizer for the final edit, plus the checks and the AI use note at the end. Use it at the start of any WBS task (report paragraph, essay, annotated bibliography, inquiry note, presentation, peer feedback on another group's draft, study session), and whenever the student says system wbs, metodologia, WBS rules, IB1450, Deliverable, group assignment, peer feedback, or asks which skills to use and when. Spanish triggers: metodologia de trabajo, como trabajamos, usa todas las skills, reglas WBS, feedback a otro grupo, tarea de WBS."
metadata:
  version: "1.0.0"
  status: active
  related_skills:
    - deep-research-wbs
    - scientific-critical-thinking
    - critical-thinking-logical-reasoning
    - no-ai-slop
    - humanizer
    - brainstorming
    - ux-writing
    - find-skills
---

# System WBS: the working method

This skill is the playbook for any WBS task. It says what to do first, which skill to invoke at each step, what each step must produce, and what has to be true before moving on. The skills it coordinates are `deep-research-wbs`, `scientific-critical-thinking`, `critical-thinking-logical-reasoning`, `no-ai-slop` and `humanizer`. `pptx`, `brainstorming`, `ux-writing` and `find-skills` join when the task needs them.

## Standing rules (every answer, every step)

1. **Invoke, then claim.** Run a skill with the Skill tool at the step that needs it. Report a skill as used only after the call happened. Keep a running list of the skills invoked in the session, because the AI use note quotes that list.
2. **Deliver the work.** Do the whole job in one pass. Ask at most one question, and only when the answer changes the result. State assumptions in one line.
3. **Real sources only.** Every reference comes from a page opened in the session. Each carries a verification level: V1 (index or publisher page), V2 (abstract), V3 (full text), V4 (passage spot-checked). A number is quoted with its page. A source that cannot be opened stays out, or goes in a confirm-table.
4. **Brief and rubric first.** Read the brief, the rubric, the word limit and the AI rule before writing. In-text citations count towards the word count. A body paragraph makes one main point, stated in the first sentence. A conclusion adds no new evidence and no new opinions. Recommendations appear only where the brief asks for them.
5. **Claims match evidence.** The claim has the same scope as the study design, sample and measure behind it. An author's interpretation stays labelled as interpretation. Correlation stays correlation.
6. **Plain English, UK spelling, Harvard.** Short sentences. Explain jargon in plain words (for example, CSR is corporate social responsibility). No em dashes. No contrast structures of the "not X but Y" or "not only X but also Y" type. No banned words from `no-ai-slop`.
7. **Peer feedback skips source checks.** When reviewing another group's draft, judge the reasoning, the structure and the brief rules. Do not verify their references.

## The pipeline

| Step | Moment | Skill to invoke | Output | Gate before moving on |
|---|---|---|---|---|
| 0. Intake | A new task arrives | `deep-research-wbs` (WBS layer, `wbs/wbs-layer.md`) | Task, word limit, rubric, AI rule, module, assumptions in one line | The exact question is known |
| 1. Plan | Before any searching or writing | `brainstorming` (only when the structure is new), `deep-research-wbs` (`wbs/critical-thinking.md`) | Argument map: question, claim for each paragraph, evidence needed, opposing view | Each paragraph has one point that answers the question |
| 2. Find and verify sources | The plan lists what evidence is needed | `deep-research-wbs` (`lit-review` or `quick`; subagents when the list is long) | Source dossier with a V level for each source, supporting and opposing sources | Each source opened; at least one source that corroborates and one that contradicts or qualifies |
| 3. Appraise the evidence | Sources are verified | `scientific-critical-thinking` | Evidence card per source: finding, page, four-word quote, design, sample, measure, limit | The strength of each claim matches its card |
| 4. Draft | Cards are ready | `deep-research-wbs` (`wbs/writing-and-argument.md`) | Paragraph built as PEER with Academic Phrasebank phrases, verbatim, page noted | One point in the first sentence; word count inside the limit |
| 5. Stress-test | The draft exists | `critical-thinking-logical-reasoning` | List of gaps: unsupported steps, hidden assumptions, evidence that stops short of the conclusion, inconsistencies with other sections | Each gap fixed or cut |
| 6. Remove AI patterns | The argument is settled | `no-ai-slop` first, then `humanizer` | Edited text in the writer's voice | Meaning, numbers, citations and word count re-checked after the edit |
| 7. Final audit | Text is clean | `deep-research-wbs` (self-audit in `wbs/wbs-layer.md`) | Harvard list (alphabetical, hanging indent, no numbering, cited sources only), UK spelling, recount | Checklist passes |
| 8. Declare AI use | The piece is final | `deep-research-wbs` (`wbs/templates/ai-declaration-draft.md`) | AI use note and, when the brief asks, the Inquiry Note | The note names the skills actually invoked and what each did |

PEER stands for Point (one idea in the first sentence), Explanation (why it holds), Evidence (author, year, page), Evaluation (one limit or opposing view), Relevance (one sentence linking to the next paragraph).

## Task variants

**Annotated bibliography.** Steps 0, 2, 3, 6, 7, 8. The evidence card becomes the annotation (what it found, how strong, how it helps the report).

**Report paragraph or essay section.** All steps. In step 4, use the Academic Phrasebank file the student supplied and quote its phrases verbatim with page numbers.

**Inquiry Note or reflection.** Steps 0, 4, 6, 8. Write from what happened in the project, in first person plural, within the limit. The note covers how analytical points were identified, how the argument was built, where and how AI was used, and what was easy and hard.

**Peer feedback on another group's draft.**
1. Read the form and the brief for the task.
2. Run `critical-thinking-logical-reasoning` and `scientific-critical-thinking` on the paragraphs under review. Check: does the evidence reach the conclusion, does the paragraph contradict the introduction, does it follow the brief's rules, is the evidence specific.
3. Write Strengths, Weaknesses and Suggested actions in the form's layout. Use bullets, plain words, important points only. Add severity tags when asked.
4. Run `no-ai-slop` and `humanizer` on the feedback.
5. Put the text in the student's own form layout.

**Presentation or slides.** Step 1 with `brainstorming`, then `pptx` for the file. Run `no-ai-slop` on the slide text. Use `ux-writing` for short labels and button-style text.

**Study session.** `deep-research-wbs` (`wbs/study-modes.md`): quiz, teach-back, explain. The brief's AI rule decides how much help is allowed.

## What each skill does in this system

- `deep-research-wbs`: the engine for sources, verification, writing guidance, the WBS rules and the AI use note.
- `scientific-critical-thinking`: tests the quality of one piece of evidence (design, sample, measure, effect size, confounders, causation).
- `critical-thinking-logical-reasoning`: tests the argument as a whole (fallacies, unsupported steps, hidden assumptions, consistency).
- `no-ai-slop`: removes AI patterns and keeps the writer's voice. It runs before `humanizer`.
- `humanizer`: a second pass that makes the text read like a person wrote it.
- `brainstorming`: shapes a new structure or plan before building it.
- `pptx` and `ux-writing`: slides and short interface-style copy.
- `find-skills`: finds an installable skill when the task needs a capability this system lacks.

## Hand-off order

Research, then appraise, then draft, then stress-test, then remove AI patterns, then audit, then declare. Edits in steps 6 and 7 can drop a number, a citation or a qualifier, so each of them ends with a re-check against the evidence cards.

## Student preferences (edit freely)

- Chat in Spanish. Coursework text in English with UK spelling.
- Avoid contrast structures of the "not X but Y" type, in chat and in drafts.
- Prefer words the sources use. The student dislikes: appear, harm, distress, survival, threaten, default risk, fast-moving. Accepted: correspond, bankruptcy risk.
- Use Google Calendar only when the student asks for it.
- Give three options per PEER element when asked for phrases, taken verbatim from the Academic Phrasebank with page numbers.

## End of every deliverable

Close with one line that lists the skills invoked in this task and the verification level reached for the sources, so the student can copy it into the AI use note. Credit skills in the AI use note and keep them out of the reference list.
