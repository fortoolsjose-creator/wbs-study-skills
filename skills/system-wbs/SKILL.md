---
name: system-wbs
description: "Working method for Warwick Business School (WBS) coursework. It sets the order of work and names which skill runs at which step: deep-research-wbs for sources and drafting, scientific-critical-thinking for evidence quality, critical-thinking-logical-reasoning for stress-testing the argument, no-ai-slop and then humanizer for the final edit, plus the checks and the AI use note at the end. Use it at the start of any WBS task (report paragraph, essay, annotated bibliography, inquiry note, presentation, peer feedback on another group's draft, study session), and whenever the student says system wbs, metodologia, WBS rules, IB1450, Deliverable, group assignment, peer feedback, or asks which skills to use and when. Spanish triggers: metodologia de trabajo, como trabajamos, usa todas las skills, reglas WBS, feedback a otro grupo, tarea de WBS. Marketing tasks (strategy, positioning, pricing, brand, marketing plan, analytics, any marketing assignment) go to marketing-master-system-wbs."
metadata:
  version: "1.2.0"
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
    - marketing-master-system-wbs
---

# System WBS: the working method

This skill is the playbook for any WBS task. It says what to do first, which skill to invoke at each step, what each step must produce, and what has to be true before moving on. The skills it coordinates are `deep-research-wbs`, `scientific-critical-thinking`, `critical-thinking-logical-reasoning`, `no-ai-slop` and `humanizer`. `pptx`, `brainstorming`, `ux-writing` and `find-skills` join when the task needs them. Marketing tasks go to `marketing-master-system-wbs`, which routes them to the installed marketing skills.

## Standing rules (every answer, every step)

1. **Invoke, then claim.** Run a skill with the Skill tool at the step that needs it. Report a skill as used only after the call happened. Keep a running list of the skills invoked in the session, because the AI use note quotes that list.
2. **Deliver the work.** Do the whole job in one pass. Ask at most one question, and only when the answer changes the result. State assumptions in one line. The permission request in the scope rule below counts as that question.
3. **Real sources only.** Every reference comes from a page opened in the session. Each carries a verification level: V1 (index or publisher page), V2 (abstract), V3 (full text), V4 (passage spot-checked). A number is quoted with its page. A source that cannot be opened stays out, or goes in a confirm-table.
4. **Brief and rubric first.** Read the brief, the rubric, the word limit and the AI rule before writing. In-text citations count towards the word count. A body paragraph makes one main point, stated in the first sentence. A conclusion adds no new evidence and no new opinions. Recommendations appear only where the brief asks for them.
5. **Claims match evidence.** The claim has the same scope as the study design, sample and measure behind it. An author's interpretation stays labelled as interpretation. Correlation stays correlation.
6. **Plain English, UK spelling, Harvard.** Short sentences. Explain jargon in plain words (for example, CSR is corporate social responsibility). No em dashes. No contrast structures of the "not X but Y" or "not only X but also Y" type. No banned words from `no-ai-slop`.
7. **Peer feedback skips source checks.** When reviewing another group's draft, judge the reasoning, the structure and the brief rules. Do not verify their references.

## Scope rule: stay inside the module until the student gives permission

1. **Start with what the module covers.** Use the module pack (`wbs/modules/<module>/`, for IB1450 `wbs/modules/ib1450/`), the lectures, the brief, the rubric and the readings the student supplied. Frameworks, theories, methods, data sources and professional tools that these materials do not cover stay out of the plan, the searches, the drafts and the feedback.
2. **Ask before going further.** A topic outside the module needs the student's permission first. When unsure whether a topic is covered, treat it as not covered and ask. Until the answer arrives, keep working inside the module.
3. **Offer only relevant topics.** Offer a topic only when it connects directly to what the student asked for and would take the work beyond the expected university level. Group the offers in one question, with at most three topics.
4. **Explain the offer in the simplest way.** The permission request uses plain words, short sentences and no jargon. It answers five things:
   - What the topic is, in one line.
   - Why it is relevant to this exact request.
   - What the work gains from it (for example, a stronger evaluation or a more professional argument).
   - What it costs (extra words, extra reading, the chance that the marker expects only module content).
   - A yes or no question, with the option to continue inside the module.
5. **Follow the answer.**
   - Yes: use the topic, keep it easy to cut (one sentence or one paragraph that stands alone), and record in the AI use note that the work went beyond the module with the student's permission.
   - No, or no reply: continue inside the module. Do not raise the same topic again in this task unless the student asks.
6. **Marketing frameworks follow the same rule.** STP, SWOT, Ansoff, BCG, Blue Ocean, pricing methods, brand equity, conjoint and marketing mix models count as outside the module unless the module's materials teach them. `marketing-master-system-wbs` asks for permission with the template below before it uses one.
7. **The rule covers every step.** It applies to the plan, the source search, the evidence, the drafting, the phrases and the peer feedback. Critical thinking on topics the module does cover needs no permission.

Permission request template (write it in the language the student is using in chat):

> Permission to go beyond the module: [topic]
> What it is: [one line]
> Why it fits your request: [one or two short sentences]
> What your work gains: [one line]
> What it costs: [extra words, reading or risk]
> Shall I use it? Yes or no. If no, I stay inside the module.

## The pipeline

| Step | Moment | Skill to invoke | Output | Gate before moving on |
|---|---|---|---|---|
| 0. Intake | A new task arrives | `deep-research-wbs` (WBS layer, `wbs/wbs-layer.md`) | Task, word limit, rubric, AI rule, module, list of topics the module covers, assumptions in one line | The exact question is known and the covered topics are listed |
| 1. Plan | Before any searching or writing | `brainstorming` (only when the structure is new), `deep-research-wbs` (`wbs/critical-thinking.md`) | Argument map: question, claim for each paragraph, evidence needed, opposing view, plus any relevant topic outside the module held back for a permission request | Each paragraph has one point that answers the question, and every topic used is covered by the module or approved by the student |
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

**Marketing task (strategy, positioning, pricing, brand, marketing plan, measurement).** Run steps 0 and 1, then hand the content work to `marketing-master-system-wbs`. It picks the phase, the lead skill and the supporting skills, and adds the textbook frameworks the installed skills lack. This skill keeps control of the scope rule, the evidence checks (steps 3 and 5), the clean-up (step 6), the final audit (step 7) and the AI use note (step 8). In step 2, take framework references from `marketing-master-system-wbs/references/sources.md` and raise each one to the verification level the brief expects. A framework from a skill counts as a tool and a source from the reference list counts as a citation.

**Presentation or slides.** Step 1 with `brainstorming`, then `pptx` for the file. Run `no-ai-slop` on the slide text. Use `ux-writing` for short labels and button-style text.

**Study session.** `deep-research-wbs` (`wbs/study-modes.md`): quiz, teach-back, explain. The brief's AI rule decides how much help is allowed.

## What each skill does in this system

- `deep-research-wbs`: the engine for sources, verification, writing guidance, the WBS rules and the AI use note.
- `scientific-critical-thinking`: tests the quality of one piece of evidence (design, sample, measure, effect size, confounders, causation).
- `critical-thinking-logical-reasoning`: tests the argument as a whole (fallacies, unsupported steps, hidden assumptions, consistency).
- `no-ai-slop`: removes AI patterns and keeps the writer's voice. It runs before `humanizer`.
- `humanizer`: a second pass that makes the text read like a person wrote it.
- `brainstorming`: shapes a new structure or plan before building it.
- `marketing-master-system-wbs`: the front door for marketing work. It routes a request through seven phases (diagnose, strategy, offer and price, plan and goals, execute, measure, operate) and names the lead skill for each.
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
