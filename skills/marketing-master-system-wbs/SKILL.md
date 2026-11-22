---
name: marketing-master-system-wbs
description: "Master skill for marketing work. It routes any marketing request to the right installed skill in the right order (diagnose, strategy, offer and price, plan and goals, execute, measure, operate), says which skill leads when several overlap, and adds the textbook frameworks the installed skills lack (4Ps and 7Ps, Byron Sharp, Binet and Field, governance). Use for marketing strategy, STP, positioning, SWOT, Ansoff, BCG, Blue Ocean, brand architecture, brand equity, customer journey, pricing, conjoint, elasticity, customer research, market sizing, marketing plans, OKRs, content strategy, ads, launches, conversion optimisation, analytics, marketing mix modelling, RevOps, and any marketing assignment or report. Part of the system-wbs method: use it whenever system-wbs meets a marketing task. Spanish triggers: marketing, estrategia de marketing, plan de marketing, posicionamiento, segmentacion, precios, marca, lanzamiento, investigacion de mercado, medicion de marketing."
metadata:
  version: "1.0.0"
  status: active
  related_skills:
    - system-wbs
    - deep-research-wbs
    - biz-stp
    - biz-swot
    - biz-bcg-matrix
    - ansoff-matrix
    - blue-ocean-strategy
    - brand-architecture
    - grad-brand-equity
    - brand-measurement
    - biz-customer-journey
    - pricing
    - algo-price-conjoint
    - algo-price-elasticity
    - conjoint-design
    - conjoint-diagnostics
    - customer-research
    - market-research
    - marketing-research
    - marketing-plan
    - marketing-ideas
    - brainstorm-okrs
    - goal-setting-okrs
    - content-strategy
    - ads
    - launch
    - cro-methodology
    - analytics
    - mmm-modeling
    - revops
    - revops-stack-rationalization
---

# Marketing master (system-wbs)

This skill is the marketing branch of `system-wbs`. It is the front door for marketing work. It picks the phase, names the lead skill for that phase, runs the supporting skills in order, and fills the gaps the installed skills leave. It holds no frameworks of its own beyond the ones in `references/frameworks-gap.md`. The detail lives in the installed skills, and this skill decides which of them to open.

## Rules that apply to every marketing task

1. **Scope first.** When the task belongs to a WBS module, `system-wbs` governs. Use only what the module covers. A framework outside the module needs the student's permission, requested with the template in `system-wbs`. Without a module, work at full depth.
2. **One lead skill per question.** Pick the lead from `references/skill-map.md`. Open a supporting skill only when the lead names a gap it fills. Do not run all skills "just in case".
3. **Open a skill with the Skill tool before relying on it.** Report a skill as used only after the call.
4. **No invented numbers.** A figure comes from the user's data, a cited source or a tool result. When an input is missing, write MISSING and say what would fill it. Market sizes, elasticities, conversion rates and benchmarks all follow this rule.
5. **Label the evidence.** Separate fact, assumption and hypothesis in every output. Give one sentence on what would change the recommendation.
6. **Translate the business type.** Several installed skills assume a software or subscription business (free trials, seats, activation, MQL). For retail, fashion, FMCG, services or non-profits, translate the idea to the real funnel and say so in one line. Do not copy software metrics into other sectors.
7. **Frameworks are tools. Sources are books and papers.** In assessed work, cite the original source from `references/sources.md` (with its verification level) and never cite a skill or a blog summary. Use the evaluation prompts in `references/frameworks-gap.md` to test each framework against the case.
8. **Ask at most one question**, and only when the answer changes which skill runs: the business type, the decision to make, or the data available.

## The seven phases

| # | Phase | Question it answers | Lead skill | Supporting skills |
|---|---|---|---|---|
| 1 | Diagnose | Where are we and what do customers do? | `biz-swot` | `market-research`, `customer-research`, `biz-customer-journey`, `marketing-research` |
| 2 | Strategy | Who do we serve, how do we win, where do we grow? | `biz-stp` | `ansoff-matrix`, `biz-bcg-matrix`, `blue-ocean-strategy`, `brand-architecture`, `grad-brand-equity` |
| 3 | Offer and price | What do we sell and for how much? | `pricing` | `algo-price-conjoint`, `algo-price-elasticity`, `conjoint-design`, `conjoint-diagnostics` |
| 4 | Plan and goals | What do we do, in what order, with what budget? | `marketing-plan` | `goal-setting-okrs`, `brainstorm-okrs`, `marketing-ideas` |
| 5 | Execute | How do we reach and convert people? | `content-strategy` or `ads` or `launch` (by task) | `cro-methodology`, `marketing-research` |
| 6 | Measure and learn | Is it working and why? | `analytics` | `brand-measurement`, `cro-methodology`, `mmm-modeling` |
| 7 | Operate | Are the people, process and tools in place? | `revops` | `revops-stack-rationalization`, governance checklist in `references/frameworks-gap.md` |

Phases run in order for a full plan. A narrow request enters at its phase and pulls earlier phases only when a missing input blocks it (for example, pricing without a defined segment first asks for the STP result).

## Routing a request

| The user says | Enter at | Run |
|---|---|---|
| "Who is our customer", "positioning", "segments" | 2 | `biz-stp`, then `customer-research` if no data |
| "Strengths and weaknesses", "competitive position" | 1 | `biz-swot`, then `market-research` for the external side |
| "How do we grow", "new markets or products" | 2 | `ansoff-matrix`, then `blue-ocean-strategy` if the market is crowded |
| "Which products to invest in" | 2 | `biz-bcg-matrix`, then `ansoff-matrix` |
| "Brand strategy", "sub-brands", "brand strength" | 2 | `brand-architecture`, `grad-brand-equity`, then `brand-measurement` |
| "Where do we lose customers", "funnel", "journey" | 1 | `biz-customer-journey`, then `analytics` and `cro-methodology` |
| "What should we charge", "will a price rise hurt" | 3 | `pricing`, then `algo-price-elasticity` or `algo-price-conjoint` when data exists |
| "Design or check a conjoint study" | 3 | `conjoint-design` or `conjoint-diagnostics` |
| "Interviews", "reviews", "what customers think" | 1 | `customer-research` |
| "Market size", "survey sample size", "score segments" | 1 | `market-research` |
| "Marketing plan", "go-to-market plan", "budget" | 4 | `marketing-plan`, then OKR skills for goals |
| "Set OKRs" | 4 | `goal-setting-okrs`, then `brainstorm-okrs` |
| "Ideas to get customers" | 4 | `marketing-ideas` |
| "What content to make" | 5 | `content-strategy` |
| "Run or fix paid ads" | 5 | `ads`, then `analytics` for the numbers |
| "Plan a launch" | 5 | `launch` |
| "Landing page not converting", "A/B test" | 5 | `cro-methodology` |
| "Is this metric right", "tracking plan" | 6 | `analytics` |
| "Is the brand working" | 6 | `brand-measurement` |
| "Budget split across channels", "media mix model" | 6 | `mmm-modeling` (needs data and the PyMC library) |
| "Sales and marketing disagree on leads" | 7 | `revops` |
| "Too many tools" | 7 | `revops-stack-rationalization` |
| "4Ps", "7Ps", "how brands grow", "brand and activation split", "governance" | any | `references/frameworks-gap.md` |

## Working method

1. **Frame.** Restate the decision in one line, name the business type and the phase. Check the scope rule.
2. **Gather inputs.** List what each skill needs. Mark what the user has and what is MISSING. Ask one question only when a gap blocks the lead skill.
3. **Run the lead skill, then the supporting ones in phase order.** Carry each output forward as an input (STP result feeds pricing, pricing feeds the plan, the plan feeds measurement).
4. **Stress-test.** For each framework used, apply its evaluation prompts from `references/frameworks-gap.md`. In WBS work, run `critical-thinking-logical-reasoning` on the argument and `scientific-critical-thinking` on any study cited.
5. **Deliver.** One page: decision, recommendation, evidence labelled as fact, assumption or hypothesis, risks, MISSING inputs, next step. Add sources in Harvard when the work is assessed.
6. **Clean the text.** Run `no-ai-slop`, then `humanizer`, then re-check numbers and citations.

## Reference files

- `references/skill-map.md`: every installed marketing skill, its lead role, what it covers, what it lacks, and which skills named in their descriptions are not installed.
- `references/frameworks-gap.md`: 4Ps and 7Ps, Byron Sharp, Binet and Field, a governance checklist, and evaluation prompts for the main frameworks.
- `references/sources.md`: verified Harvard references with verification levels, plus the sources still to verify.

## Skills named in the installed descriptions that are not installed

The installed skills point to siblings such as `ad-creative`, `copywriting`, `seo-audit`, `social`, `product-marketing`, `conversion-tracking`, `attribution`, `ab-testing`, `offers`, `paywalls`, `emails` and `cold-email`. These are not present. When a task needs one of them, say so in one line and continue with the closest installed skill, or ask the student whether to find it with `find-skills`.
