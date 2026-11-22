# Skill map

Reviewed on 2026-11-22. Every skill below is installed from a public repo, its files were scanned and no scripts were run. The `.source` file inside each skill folder records the repo and commit.

## Who leads when skills overlap

| Topic | Lead | Then | Reason |
|---|---|---|---|
| Positioning | `biz-stp` | `marketing-research` (messaging), `blue-ocean-strategy` (new space) | STP is the full method. The others serve copy or category creation. |
| Growth options | `ansoff-matrix` | `blue-ocean-strategy`, `biz-bcg-matrix` | Ansoff lists the four routes. BCG ranks a portfolio. Blue Ocean adds new demand. |
| Pricing | `pricing` | `algo-price-elasticity`, `algo-price-conjoint` | `pricing` sets the structure. The two others quantify it. |
| Conjoint | `conjoint-design` | `conjoint-diagnostics`, `algo-price-conjoint` | Design before analysis. Diagnostics review a finished study. |
| Research with customers | `customer-research` | `marketing-research`, `market-research` | Interviews and reviews first. Sizing and samples second. |
| Planning | `marketing-plan` | `goal-setting-okrs`, `brainstorm-okrs`, `marketing-ideas` | The plan sets sequence and budget. OKRs set goals. Ideas feed tactics. |
| Measurement | `analytics` | `cro-methodology`, `brand-measurement`, `mmm-modeling` | Tracking comes first. Tests, brand health and mix models need it. |
| Brand | `brand-architecture` | `grad-brand-equity`, `brand-measurement` | Structure, then equity theory, then tracking. |

## Installed skills

| Skill | Source repo | Covers | Does not cover | Notes |
|---|---|---|---|---|
| `biz-swot` | asgard-ai-platform/skills | SWOT with TOWS matrix | Quantified scoring | Textbook framing, MIT |
| `biz-stp` | asgard-ai-platform/skills | Segmentation, targeting, positioning, perceptual maps | Primary data collection | Pair with `customer-research` |
| `biz-bcg-matrix` | asgard-ai-platform/skills | Growth-share matrix | GE-McKinsey matrix | Check the market-share assumption |
| `biz-customer-journey` | asgard-ai-platform/skills | Five-stage journey and touchpoints | Journey analytics tooling | Pair with `analytics` |
| `grad-brand-equity` | asgard-ai-platform/skills | Aaker dimensions, Keller CBBE pyramid | Financial brand valuation | Cite Keller (1993) and Aaker (1991) |
| `algo-price-conjoint` | asgard-ai-platform/skills | Conjoint basics, willingness to pay | Design and diagnostics | Short, 595 words |
| `algo-price-elasticity` | asgard-ai-platform/skills | Arc elasticity, script `arc_elasticity.py` | Cross-price and dynamic models | Script reads a local JSON file |
| `ansoff-matrix` | phuryn/pm-skills | Four growth routes | Quantified sizing | One file |
| `brainstorm-okrs` | phuryn/pm-skills | Team OKR drafting | OKR review cadence | One file |
| `goal-setting-okrs` | RefoundAI/lenny-skills | OKR practice from Lenny's archive | Marketing-specific KRs | Built from podcast and newsletter quotes |
| `blue-ocean-strategy` | wondelai/skills | Strategy canvas, ERRC, six paths, buyer utility map | Competitive data collection | Nine files |
| `cro-methodology` | wondelai/skills | Funnel audit, A/B hypotheses, objection handling | Statistical power tooling | Seven files |
| `brand-architecture` | arnabbagxd/brand-building-skills | Branded house, house of brands, sub-brands | Naming research | One file |
| `brand-measurement` | arnabbagxd/brand-building-skills | Brand KPIs, equity scorecard | Survey fieldwork | One file |
| `revops-stack-rationalization` | mbfinotti/revops-skills | Tool inventory, TIME scoring, renewal calendar | Contract negotiation | Long, 3,300 words |
| `pricing` | coreyhaines31/marketingskills | Tiers, value metrics, Van Westendorp, freemium | Retail and promotional pricing | Software orientation |
| `customer-research` | coreyhaines31/marketingskills | Interviews, surveys, personas, JTBD, review mining | Quantitative modelling | Software orientation |
| `marketing-plan` | coreyhaines31/marketingskills | Channels, budget, team, AARRR goals | Sector-specific plans | Example plan is a software product |
| `marketing-ideas` | coreyhaines31/marketingskills | 139 tactics | Channel depth | Software orientation |
| `analytics` | coreyhaines31/marketingskills | Tracking plans, GA4, GTM, UTMs, metric checks | CRM analytics | Mentions MMM in one line |
| `launch` | coreyhaines31/marketingskills | Launch checklists, Product Hunt, waitlists | Retail launches | Software orientation |
| `revops` | coreyhaines31/marketingskills | Lifecycle stages, MQL and SQL, routing | Service teams | B2B orientation |
| `content-strategy` | coreyhaines31/marketingskills | Topic clusters, calendars, roadmaps | Writing the pieces | Needs `copywriting` (not installed) for drafts |
| `ads` | coreyhaines31/marketingskills | Google, Meta, LinkedIn planning and diagnosis | Creative production | Labels unavailable inputs MISSING |
| `market-research` | alirezarezvani/claude-skills | TAM, SAM, SOM, sample sizes, segment scoring with three Python scripts | Qualitative research | Never returns an unsourced number |
| `marketing-research` | ishwarjha/claude-marketing-research-skill | Value proposition, avatar, awareness and sophistication, competitor research | Academic method | Direct-response style |
| `conjoint-design` | scdenney/open-science-skills | Attributes, power, AMCE and marginal means | Commercial tooling | Academic orientation, licence not declared |
| `conjoint-diagnostics` | scdenney/open-science-skills | Severity-ranked review of a conjoint study | Fieldwork | Licence not declared |
| `mmm-modeling` | pymc-labs/pymc-marketing | Media mix models with adstock and saturation | Anything without data | Needs the PyMC Marketing library, 10 files |

## Not installed (referenced by the descriptions above)

`ad-creative`, `copywriting`, `seo-audit`, `social`, `product-marketing`, `conversion-tracking`, `attribution`, `ab-testing`, `offers`, `paywalls`, `emails`, `cold-email`, `cro` (the sibling named inside `ads`), `ux-heuristics`, `one-page-marketing`, `good-strategy-bad-strategy`, `crossing-the-chasm`, `obviously-awesome`.

## Reviewed and left out

`survey-designer` (inbharatai): 251 words, low support. `qualitative-coding` (Marazii): pre-approves Bash and other tools in its `allowed-tools` block, so the block must be removed before use. The five `lg-*` skills (lingegrace): good content, single author, no stars.
