# Finding and verifying sources

Contents: what Claude delivers, parameters to capture, the pipeline, verification levels, quality tiers, reference formatting, annotated bibliographies, parallel work, red flags, honest limits.

The university's test for sources is that a reader can look them up and see how the argument follows from them. Claude therefore does the searching, the checking and the comparing, and hands the student sources that are real, relevant, ranked and formatted. Claude works from search results and from the pages themselves. A reference typed from memory skips that check, so every entry comes from a page Claude opened in the session.

## What Claude delivers: the source dossier

Use `wbs/templates/source-dossier.md`. One row per source with:

- formatted reference (author-date by default) and DOI link or stable URL;
- source type and quality tier;
- what it argues, in two sentences, taken from the abstract or full text;
- the key finding or figure, with section or page when the full text was read;
- supports, opposes or complicates the student's position, and the section of the assignment it serves;
- access (open access, author or repository copy, library login needed);
- verification level (V1 to V4, below) and the page used for the check;
- what the student can safely claim from it and what stays outside what was read.

Add a landscape summary at the top: what the literature agrees on, where it disagrees, and which gaps remain. This synthesis is where Claude saves the student the most time.

## Parameters to capture (take them from the brief, otherwise use the defaults and say so)

| Parameter | Default when the brief is silent |
|---|---|
| Question or section the sources serve | Ask in one line if the request does not make it clear |
| Number of sources | 8 to 12 per report section; 5 to 8 for a short essay |
| Date range | Last 10 years, plus foundational works that the field still cites |
| Types | Peer-reviewed articles first; academic books; reports from established bodies |
| Discipline and context | The module's field; sector or country when the assignment names one |
| Citation style | Harvard author-date (the module slides use it); the brief overrides |
| Access | Prefer open access or items reachable through the Warwick library |
| Balance | Include evidence for and against the student's position |

## Pipeline

1. **Frame.** Turn the question into three to five search framings with synonyms. Cover four angles: a recent review or meta-analysis, foundational studies, counter-evidence, and a practitioner or institutional report.
2. **Search wide.** Run the framings in parallel with the tools the session offers. Order of preference: the general web search tool; Firecrawl search with the research or pdf category; Tavily search; the Firecrawl paper search for biomedical and arXiv topics; site-targeted queries (SSRN, EconPapers and RePEc, PubMed and PMC, publisher domains, university repositories such as Warwick WRAP). When an open scholarly API such as Crossref or OpenAlex is reachable from the session, use it for metadata, and test one call first since some sandboxes block it.
3. **Collect candidates.** Remove duplicates and anything without an identifiable author, venue and year.
4. **Verify metadata (V1).** Open the publisher page, the DOI link or an index page (EconPapers, PubMed, SSRN, repository). Confirm title, every author, year, journal or publisher, volume, issue, pages and DOI. Copy the DOI from the page. Note the page used.
5. **Verify content (V2 and V3).** Read the abstract for every candidate. For sources that will carry the key claims, read the open-access full text (publisher open access, author copy, SSRN, PMC, repository) and note the section or page of each finding. When only the abstract is reachable, say so.
6. **Triage for quality.** Apply the tiers below, check for retractions (search the title plus "retraction"), and drop predatory or unknown venues.
7. **Map to the argument.** Tag each source as supports, opposes or complicates, and name the section it serves. State the gaps and run a second round of searches for them.
8. **Deliver the dossier.** Include the landscape summary, the table, the reference list, and the section or page behind each key finding.
9. **Optional spot-check (V4).** The dossier lists the passages behind the main claims. Opening two or three of them takes minutes and moves those sources to V4. Paywalled items that stayed at V1 or V2 are flagged so that the student knows which claims rest on abstracts.
10. **Log.** Add the search terms, tools and date to the AI log.

A student with Warwick library access can upload a PDF or paste the text to deepen any entry. Claude then reads the full text (V3) and extracts findings, methods and limits with page references.

## Tool fallbacks and field notes (from a live run)

A live run of this pipeline delivered eight verified sources from about 14 searches and nine page scrapes. These notes come from that run.

- **When the page fetcher fails** (for example a DNS error on EconPapers, AEA, repository hosts), use the Firecrawl scrape tool for verification. EconPapers and RePEc pages work well: they list authors, journal, volume, issue, pages, abstract and DOI in one page, and the scrape metadata carries `citation_*` fields.
- **Large publisher pages** can return hundreds of thousands of characters. Read only the metadata block and the abstract (parse the saved output with jq or python) so that the context stays small.
- **Choose V3 targets before spending the budget.** Pick the two or three sources that carry the key numbers and try their open-access copies (author repository, SSRN, PMC, university repository) first, with PDF page limits. Publisher PDFs time out often, so allow one retry.
- **Retraction check in one pass:** scan each publisher or index page for a retraction or correction banner, and run one search of the title plus "retraction" for the sources that carry the key claims. Use the Crossref `updated-by` field when Crossref is reachable.
- **When the requested balance is thin** (for example "at least two against" for a niche sector), deliver the best honest set and say which opposing sources are partial or indirect. Report gaps (no recent retail-specific negative result, no country-specific study) and offer a second search round. Never inflate a source into a stronger position than it takes.
- **Time and cost:** a full eight-source dossier takes several minutes and dozens of tool calls. For more than six sources, run subagents in parallel, each verifying two or three candidates.
- **Date edges:** flag a source that sits at the boundary of the requested date range (for example online late 2015, volume 2016).
- **Dropped candidates:** list the candidates seen in search results that never reached a confirming page, so the student knows they were excluded for verification reasons.

## Pairing with the base research pipeline


The base pipeline of this skill (deep-research, from imbad0202/academic-research-skills) offers a heavier route: systematic literature search, source verification, fact-check mode, systematic review with PRISMA, and APA 7 report compilation. Use it for a large literature scan, a systematic or scoping review, or a fact-check of a contested claim. Keep this layer's rules on top:

- Route the output of deep-research through the verification levels (V1 to V4) before anything enters a dossier.
- Reference style follows the brief. WBS slides use author-date, so convert any APA 7 output to the style the brief names.
- Borrow its checks in every search, even without the full pipeline:
  - **DOI mismatch**: a DOI that resolves to an article with a different title is a classic fabrication pattern. Compare the title behind the DOI with the title in the reference.
  - **Triangulation**: confirm that an article appears in two independent indexes (Crossref, OpenAlex, Semantic Scholar, a publisher page).
  - **Retraction status**: Crossref records an update notice on retracted papers (the `updated-by` field of the DOI record).
  - **Venue check**: indexed in Scopus or Web of Science, listed in DOAJ, publisher a member of COPE, ISSN valid, no match with predatory-journal lists.
  - **Claim check**: a contested claim needs support from two or more independent sources.
- Its API protocols (Crossref, OpenAlex, Semantic Scholar) need open internet. Some sandboxes block those hosts, so test one call first and fall back to page-based verification.

## Verification levels

| Level | Meaning | Use in the assignment |
|---|---|---|
| V0 | Seen in a search summary or in the module's own reference list (lecture deck, reading list), page not opened | Cite in full Harvard form, with a verify flag. Claims limited to what the lecture or the summary states. No numbers or quotations beyond that |
| V1 | Metadata confirmed on a publisher, DOI or index page | Allowed in the reference list once the content level is also met |
| V2 | Abstract read | Allowed for background claims that the abstract states |
| V3 | Full text read by Claude (open access or uploaded), with section or page | Allowed for specific findings, figures and quotations |
| V4 | The student confirmed the passage in the source | Standard for the sources that carry the argument |

State the level in every dossier row. Specific numbers and quotations come only from V3 or V4 sources.

## When verification tools are down

Network access to scholarly pages can fail (DNS errors, exhausted credits, rate limits). The work still ships:

1. Deliver the complete piece with full Harvard in-text citations and a reference list. Sources that rest on the module's own reference list or on consistent search results count as V0, and a lecturer's reference list is a trustworthy basis for existence.
2. Copy only details that two or more search results or the module list agree on. Leave a field as "[to confirm]" when no result gives it, and never fill gaps from memory.
3. Put a short table at the end: each V0 source, what to confirm (year, pages, the passage behind a claim), and where (publisher page or DOI link).
4. State at the top of the message, in one line, that verification tools were unavailable and that the reference list sits at V0. Offer to upgrade it to V1 to V3 when tools return, or when the student pastes the page or uploads the PDF.
5. Keep numbers, statistics and direct quotations for sources at V1 or above, or attribute them as "as the lecture reports".

## Quality tiers

1. Peer-reviewed journal articles and academic books from university presses. Confirm the journal exists on the publisher site and that the article is not retracted. When the module names a journal ranking, apply it.
2. Working papers and preprints (SSRN, NBER, arXiv). Label them as not peer-reviewed, and check whether a published version exists.
3. Reports from established bodies (World Economic Forum, OECD, UN agencies, regulators, professional institutes, consultancies). Check authorship, method and date. Several Big Four reports were retracted or refunded after AI hallucinations, so read the method section before relying on them.
4. News, blogs, campaign material, company pages. Use for context and for leads to primary sources. A satirical or campaign figure (for example the "Save the AI" postcard numbers) needs a primary study behind it.

## Reference formatting

- Default Harvard author-date. Give the in-text form and the list entry. Match the brief when it names a style.
- Take details from the verified page. Write DOIs as https://doi.org/... links.
- Web pages carry an accessed date.
- Keep the list alphabetical when the style asks for it.

## Annotated bibliography

- Claude fills the notes for each entry (argument, method, evidence, limits, relevance, one quotation with page) from V2 or V3 material, using `wbs/templates/annotated-bibliography-entry.md`.
- Claude writes the finished annotations (two to four sentences each, in the style and length the brief asks for) and the full bibliography in the required reference style.
- Claude helps keep the annotations short, specific and comparable across entries.

## Parallel work

For more than eight sources, spawn subagents that each verify two or three candidates to the standard above and return the dossier rows. The main agent checks every discrepancy between subagent reports before delivering.

## Red flags and trap examples from the lectures

- A chart whose source line reads "?????" (Week 2 deck). Trace the primary source before using the numbers.
- Citation years that disagree inside one deck: the Week 8 slides cite Samiolo et al. as 2023 in the text and 2021 in the list. Check the version of record.
- Reference lists that recite author-year pairs a reader cannot match to an article.
- Statistics repeated by secondary sites without a primary source.
- Slides and transcripts are teaching material. Cite the sources they point to, after reading them.

## Honest limits

- Paywalled full text is out of reach without the student's upload. Claude reports the verification level it reached.
- A search can miss relevant work. Claude states the search terms and tools used, and says "not found" when that is the case.
- Search summaries can contain errors in volume, pages or numbers. Claude takes details from the opened page.
- Claude has not read anything it marks V1 or V2 beyond the metadata or abstract, and the dossier says so.
