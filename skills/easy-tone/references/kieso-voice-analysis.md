# Kieso voice analysis (the source voice)

This file records what the textbook voice looks like, measured on real pages. `easy-tone` uses it to know what to unpack when a student pastes a Kieso passage. It follows the `VOICE PROFILE` schema of the `brand-voice` skill and adds a difficulty map.

## Source set

Book: Kieso, Weygandt, Warfield, *Intermediate Accounting: IFRS Edition*, 4th ed., Wiley, 2020.
Pages are PDF page numbers of `intermediate_accounting_kieso_compressed.pdf`. Printed page numbers differ.

| PDF pages | Chapter | Sections seen on those pages |
|---|---|---|
| 64-77 | Ch 1, Financial Reporting and Accounting Standards | Objective of financial reporting, general-purpose financial statements, equity investors and creditors, entity perspective, decision-usefulness, standard-setting organizations (IASB, IOSCO), due process, types of pronouncements, hierarchy of IFRS |
| 121-149 | Ch 2, Conceptual Framework | Qualitative characteristics (completeness, neutrality, free from error, comparability, verifiability, timeliness, understandability, materiality), basic elements, assumptions (economic entity, going concern, monetary unit, periodicity, accrual basis), measurement (historical cost, fair value and its hierarchy, value in use, current cost), recognition (revenue and expense) |
| 217-247 | Ch 3, The Accounting Information System | Journalizing, posting, chart of accounts, the Yazici Advertising worked transactions, trial balance, adjusting entries (deferrals, accruals, depreciation, bad debts), adjusted trial balance |

74 pages, about 15,400 words, about 800 sentences.

## Measured profile

Numbers come from a simple script (sentence split on end punctuation, syllables estimated). Treat grade levels as plus or minus one grade.

| Measure | Ch 1 | Ch 2 | Ch 3 | Combined |
|---|---|---|---|---|
| Words analysed | 2,818 | 6,863 | 5,675 | 15,356 |
| Average sentence length (words) | 19.6 | 19.9 | 18.5 | 19.3 |
| Median sentence length | 16 | 17 | 17 | 17 |
| Flesch-Kincaid grade | 15.0 | 14.4 | 13.0 | 14.0 |
| Words with 3+ syllables | 30.0% | 27.8% | 25.5% | 27.3% |
| Parentheses per sentence | 0.24 | 0.23 | 0.26 | 0.24 |
| Passive-looking verbs (count) | 33 | 75 | 77 | 185 |
| "we / our / us" (count) | 1 | 25 | 8 | 34 |
| "you / your" (count) | 1 | 5 | 3 | 9 |
| Question marks in running text | 2 | 17 | 1 | 20 |
| Contractions | 2 | 0 | 0 | 2 |
| Exclamation marks | 0 | 1 | 0 | 1 |
| Em dashes | 6 | 20 | 18 | 44 |

The 90th percentile sentence has 31 words. The longest runs past 100 words when a list sits inside one sentence.

Reading: university level (grade 13 to 15). A grade 5 reader sits at grade 5 or 6.

## VOICE PROFILE

```text
VOICE PROFILE
=============
Author: Kieso, Weygandt, Warfield (textbook voice, IFRS edition)
Goal: teach financial accounting to university students and serve as a reference
Confidence: high for sentence-level patterns (about 800 sentences), medium for tone claims

Source Set
- Ch 1, PDF pp. 64-77
- Ch 2, PDF pp. 121-149
- Ch 3, PDF pp. 217-247

Rhythm
- Medium-long sentences, average 19 words, median 17, with long enumerations inside one sentence
- Heavy use of linking words: Thus, However, Therefore, That is, In other words, For example
- Short punchy sentences appear only for stance ("We disagree.") or a rhetorical "Why?"

Compression
- Dense. Noun stacks ("general-purpose financial reporting", "decision-usefulness approach")
- Abstract nouns carry the action ("the exercise of prudence", "recognition of expenses")
- Terms of art explained with other terms of art

Capitalization
- Conventional. Title Case headings. ALL CAPS for ILLUSTRATION labels
- Key terms appear in bold at first use, then plain

Parentheticals
- Frequent, about 1 per 4 sentences
- Country code after a company: Nestle (CHE), Airbus (DEU)
- Short clarifiers: "(or purpose)", "(e.g., IOSCO)", "(a liability)"

Question Use
- Rare in prose. Mostly a section-opening question or a rhetorical "Why?" that is answered in the next sentence

Claim Style
- Definition first, flat and authoritative, often a quoted IFRS wording
- Bracketed numbers [n] point to authoritative literature
- Occasional authorial stance: "We disagree."
- Examples with named real companies and numbers

Preferred Moves
- "For example," followed by a real company
- "To illustrate, assume that ..." followed by a hypothetical case with numbers
- Numbered lists of elements, reasons or steps
- A running example (Yazici Advertising) analysed in a fixed panel: Transaction, Basic Analysis, Equation Analysis, Debit-Credit Analysis, Journal Entry, Post to Ledger
- Callout boxes: Learning Objective, Underlying Concepts, What Do the Numbers Mean?
- One analogy from daily life now and then (betting on boxing and wrestling to explain neutrality)

Banned Moves (absent in the source)
- Slang, emoji, jokes, exclamation marks
- First person singular
- Direct address with "you" (nine uses in 15,000 words)
- Contractions (two uses, both "Let's")

CTA Rules
- None. Sections end with a summary sentence or a pointer to a later chapter

Channel Notes
- Print textbook only. No channel variation
```

## Difficulty map: what makes the pages hard

| Driver | Example from the pages | What easy-tone does |
|---|---|---|
| Noun stacks | "general-purpose financial statements" | Say who they are for and what they do: "reports made for everybody who reads them" |
| Abstract nouns hiding a verb | "the exercise of prudence" | Turn it into a verb: "being careful" |
| Long chains of clauses | 31+ words | Cut into 2 or 3 sentences |
| Passive voice | "revenue is recognized", "assets are overstated" | Name who does it: "the company writes down the revenue" |
| Terms defined by other terms | elements defined by other elements | Build up from the everyday word first, then attach the official word |
| Acronyms | IASB, IFRS, IOSCO, FASB, SME | Spell out once with a plain gloss: "the group that writes the rulebook" |
| Paired technical opposites | overstated and understated, deferrals and accruals | Give each its own picture and a one-line test |
| Real firms as examples | Airbus, Nokia, Siemens | Add a small human example first, then keep the firm as a "Real example" line |
| Bracketed references | [5], [17] | Drop in the easy version. Add on request |

## Move-by-move translation

| Kieso move | Easy-tone treatment |
|---|---|
| Bold term plus definition in one sentence | Keep the bold term. Put the everyday meaning in the next 12 words |
| "For example," plus real company | Keep as a "Real example" line after the small human example |
| "To illustrate, assume that ..." | Replace with Mia's lemonade stand (see `rewrite-examples.md`) |
| Yazici analysis panel (six rows) | Keep the six rows, one plain sentence each |
| Numbered list of elements | Keep the list, one short line per item, plus a cheat-sheet table at the end |
| "Thus," / "Therefore," | "So" |
| "However," | "But" at the start of a sentence |
| "That is," / "In other words," | A new short sentence |
| Rhetorical "Why?" | Allowed once per section, answered in the next sentence |
| "We disagree." stance | Keep the stance as a plain sentence: "The book says the rules must be free from bias." |
| Learning Objective box | Becomes a one-line "Big idea" at the top |
