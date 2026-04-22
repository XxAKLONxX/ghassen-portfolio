# Keyword Research Template
*A working framework — v1.0*

> Authored by **Ghassen Bahroun** · SEO/SEM Specialist
> This is the template I use for greenfield keyword research across multilingual B2B and consumer projects. Import the columns below into a spreadsheet and work through the phases in order.

---

## PHASE 1 — FOUNDATION (before touching a tool)

Before opening SEMrush or GSC, answer in writing:

1. **Business goal** — leads, sales, sign-ups, brand awareness?
2. **Target markets & languages** — country, language, regional nuances
3. **Buyer personas** — job title, pains, vocabulary (technical vs. lay terms)
4. **Products/services** — exact catalogue, not a summary
5. **Competitors** — 3–5 direct, 2–3 indirect, plus 1 aspirational
6. **Current baseline** — top 20 queries in GSC last 90 days, by impressions and by clicks

> Why this matters: most low-value keyword lists come from skipping Phase 1. Without it, you end up ranking for volume, not demand.

---

## PHASE 2 — SEED DISCOVERY

Build the seed list from multiple sources. Do not paste it all into one tool.

**Sources:**
- Your own site's GSC queries (last 12 months)
- Competitor domains — SEMrush / Ahrefs "organic keywords" top 100 per competitor
- Customer interviews — how do they describe the problem?
- Sales/support transcripts — literal phrases from conversations
- Reddit, Quora, industry forums, Amazon reviews
- Google autocomplete, "People also ask", related searches
- Product catalogue — one seed per category and per key attribute

Target: **30–80 seeds** before expansion.

---

## PHASE 3 — EXPANSION

Run seeds through 2+ tools and merge. Do not rely on a single data source.

**Tools to combine:**
- SEMrush keyword magic / keyword gap
- Google Search Console (already-ranking queries to expand)
- Google Keyword Planner (for commercial volume sanity check)
- AlsoAsked or AnswerThePublic (for question-based queries)
- Bulk autocomplete scrapers (for long-tail, localised)

De-duplicate, normalise, then tag.

---

## PHASE 4 — THE MASTER SPREADSHEET

### Columns

| Column | Description | Example |
|---|---|---|
| `keyword` | The exact query | industrial hinge suppliers france |
| `language` | ISO code | fr |
| `market` | Country / region | FR |
| `search_volume` | Monthly, avg last 12 mo | 320 |
| `kd` | Keyword difficulty (SEMrush scale) | 28 |
| `cpc` | Avg CPC (currency) | €2.40 |
| `intent` | I / N / C / T (Info / Nav / Comm / Trans) | C |
| `funnel_stage` | TOFU / MOFU / BOFU | MOFU |
| `cluster` | Topic cluster name | Industrial Hinges |
| `parent_keyword` | The head term for this cluster | industrial hinges |
| `serp_type` | Featured snippet, local pack, shopping, images, video, standard | Standard + PAA |
| `competitor_rank_1` | Top competitor ranking | manufacturerA.com |
| `current_rank` | Your current position | not ranking |
| `target_url` | The page that should rank | /en/products/hinges/industrial |
| `page_status` | Exists / Create / Update / Merge | Create |
| `priority` | P1 / P2 / P3 | P1 |
| `notes` | Context, caveats | Low volume, high commercial intent |

### Intent taxonomy

| Code | Intent | Typical modifiers |
|---|---|---|
| **I** | Informational | what is, how to, guide, examples |
| **N** | Navigational | brand name, brand + product |
| **C** | Commercial | best, review, compare, vs, top |
| **T** | Transactional | buy, price, quote, supplier, near me |

Map each keyword to the **right page type** for its intent. Forcing transactional keywords onto blog posts is one of the most common mistakes.

---

## PHASE 5 — CLUSTERING

Group keywords that should live on the **same page** into clusters.

**Rules of thumb:**
- Same search intent → same page
- Shared top-10 SERP URLs (≥ 3 overlapping results) → same page
- Different intent or product scope → separate pages
- Long-tail variations of a head term → same page as the head term (not separate)

For each cluster, define one **parent keyword** (the highest-volume representative) and the target URL.

---

## PHASE 6 — PRIORITISATION

Score each cluster across three axes (1–5):

- **Opportunity** = volume × intent quality × current gap
- **Effort** = content creation + technical + link building required
- **Confidence** = how likely to rank given DR, existing pages, SERP features

Priority = `Opportunity / Effort × Confidence`

Rank clusters, then commit the top **10–15** to a 90-day content plan.

---

## PHASE 7 — HANDOFF

For each priority cluster, produce a brief:

- Parent keyword + 5–10 supporting keywords
- Target URL + page type
- Search intent and funnel stage
- Top 3 SERP competitors with a note on format/length
- Mandatory subtopics (from PAA + competitor H2s)
- Internal linking plan — which existing pages link in, which this links out to
- Success metric — "rank top 5 for `parent_keyword` within 90 days" or "generate X organic sessions/month by Q+1"

---

## ONGOING CADENCE

- **Weekly** — GSC query drift check, new query discovery
- **Monthly** — update `current_rank` column, SERP feature changes
- **Quarterly** — full cluster refresh, re-prioritisation, seasonal adjustments
- **Annually** — rebuild the seed list from scratch, especially for fast-moving verticals

---

*Made with care · ghassenbahroun@yahoo.fr · github.com/XxAKLONxX*
