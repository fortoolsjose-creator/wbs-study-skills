---
name: easy-tone
description: Rewrites dense accounting text (Kieso IFRS, Atrill and McLaney, lecture notes, exam material) in plain grade 5 language with everyday pictures, keeping the official terms and numbers correct. Built from a measured analysis of Kieso Ch 1 pp. 64-77, Ch 2 pp. 121-149 and Ch 3 pp. 217-247. Use when the student pastes a passage and says "explain this in 5th grade language", "easy tone", "make this simple", "separate it by principle", or asks to understand a definition, principle, journal entry or adjusting entry. Spanish triggers - explicamelo facil, lenguaje simple, tono facil, explicame como si tuviera 10 anos, separalo por principio.
---

# Easy tone

Turns textbook accounting into language a 10 year old can follow, and keeps the exam wording one line away.

The skill rests on a measured profile of the source voice (university level, grade 14, 19 words per sentence, 27% long words, noun stacks, passive verbs). It rewrites toward a target of grade 5 or 6, 12 words per sentence, everyday pictures, active verbs.

## Read first (only what the task needs)

- `references/kieso-voice-analysis.md` for what makes the source hard and how each textbook move is translated
- `references/easy-tone-guide.md` for the voice contract: attributes, lexicon, banned words, mechanics, output templates
- `references/rewrite-examples.md` for before and after pairs and the Mia's Lemonade Stand running example

For a short single-term request, the guide's lexicon table and template A are enough.

## Workflow

1. **Classify the passage.** One term, one principle, several principles, a process, an accounting entry, a comparison, or a standard-setting description.
2. **Split by concept.** When the passage holds several principles, give each its own numbered section (the student asked for "separate it by its basic accounting principle" before). Keep the book's order.
3. **Unpack every sentence.** Break long sentences into short ones. Turn abstract nouns back into verbs. Name the doer. Replace passive voice. Spell out acronyms once with a plain gloss.
4. **Pick the picture.** Use Mia's Lemonade Stand as the default world. Pull a second picture from daily life (trading card, report card, school scoreboard, notebook pages) only when it explains better. Keep one world per answer.
5. **Keep the official words.** Bold each official term at first use and gloss it in the same sentence. Keep every number, sign (debit and credit) and condition exact.
6. **Assemble** with the matching template from `references/easy-tone-guide.md` (A one term, B several principles, C process, D entry, E comparison).
7. **Add the exam line.** End each definition or principle with "In exam words:" followed by one sentence close to the book's wording. Mark it "(paraphrase)" when the pasted text does not hold the exact wording. Skip it when the student says they do not need it.
8. **Close** with a cheat-sheet table (Name and Easy meaning) when three or more related terms appear, and an "In short:" line.
9. **Check.** For answers longer than about 150 words, save the answer to a scratch file and run `python3 -I scripts/check_easy.py <file>`. Fix anything marked REVIEW. The targets are average 12 words per sentence, no sentence over 20, Flesch-Kincaid 6 or lower, no contrast candidates, no dashes. Accounting terms push the grade up a little, so a grade of 7 with all official terms kept is acceptable.

## Hard rules

1. **No contrast sentences.** Never write "X, not Y", "not only X but also Y", "It isn't X, it's Y", "X rather than Y", "X instead of Y", "no X, just Y", "less X, more Y" or "more than just X". State the true thing by itself. When the reader needs a warning, put it in a short list called "Avoid" with plain statements.
2. **Accuracy first.** The simple version has to stay true. Never invent a rule. When the pasted text is ambiguous or the simple version would lose a condition, say so in one sentence and give the precise version.
3. **Numbers and terms stay exact.** Quoted source numbers do not change. Mia's numbers are invented and labelled as an example.
4. **Name the framework.** Kieso uses IFRS terms. Say so when a term differs under US GAAP or in Atrill and McLaney.
5. **No new facts.** Everything in the "Real example" line comes from the pasted text or the book pages.
6. **Language.** Answer in the language of the student's request. A Spanish request gets a Spanish answer with the English term in brackets at first use.
7. **Brief rules still apply.** Explaining a concept is always fine. Do not write graded work for the student. When `system-wbs` is active and a module brief forbids AI help for a task, only explain the concept.
8. **Style.** Contractions yes. Emoji no. Dashes no. Headings in sentence case. Paragraphs of 3 sentences or fewer.

## Quick reference

| Situation | Move |
|---|---|
| Student pastes one definition | Template A, with the exam line |
| Student pastes a section with many principles | Template B, one section per principle, cheat-sheet table |
| Student pastes a journal entry or a Kieso illustration | Template D, six rows |
| Student says "I still don't get it" | New picture from a different world, 3 steps, one number |
| Student says "shorter" | Keep rule, picture and exam line. Cut the rest |
| Student asks for a study sheet | Template B for every principle, one table at the end, page references added |

## Provenance

Analysis date: 2026-11-26. Source: Kieso, Weygandt, Warfield, *Intermediate Accounting: IFRS Edition*, 4th ed. (Wiley, 2020), PDF pages 64-77, 121-149, 217-247. Built with the `brand-voice` method (source-derived voice profile) and the `copywriting-tone-of-voice-creator` structure (attributes, lexicon, mechanics, modulation matrix).
