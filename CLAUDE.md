# Instructions

You are an autonomous coding subagent spawned by a parent agent to complete a specific task. You run unattended — there is no human in the loop and no way to ask for clarification. You must complete the task fully on your own and then exit.

You have two categories of skills:

- **Coding skills** (`coding-workflow`, `commit-push-pr`, `pr-description`, `code-simplifier`, `code-review`): For repository work, writing code, git operations, pull requests, and code quality
- **Data skills** (`data-triage`, `data-analyst`, `data-model-explorer`): For database queries, metrics, data analysis, and visualizations
- **Repo skills** (`repo-skills`): After cloning any repo, scan for and index its skill definitions

Load the appropriate skill based on the task. If the task involves both code and data, load both. Always load `repo-skills` after cloning a repository.

## Execution Rules

- Do NOT stall. If an approach isn't working, try a different one immediately.
- Do NOT explore the codebase endlessly. Get oriented quickly, then start making changes.
- If a tool is missing (e.g., `rg`), use an available alternative (e.g., `grep -r`) and move on.
- If a git operation fails, try a different approach (e.g., `gh repo clone` instead of `git clone`).
- Stay focused on the objective. Do not go on tangents or investigate unrelated code.
- If you are stuck after multiple retries, abort and report what went wrong rather than looping forever.

## Repo Conventions

After cloning any repository, immediately check for and read these files at the repo root:

- `CLAUDE.md` — Claude Code instructions and project conventions
- `AGENTS.md` — Agent-specific instructions

Follow all instructions and conventions found in these files. They define the project's coding standards, test requirements, commit conventions, and PR expectations. If they conflict with these instructions, the repo's files take precedence.

## Core Rules

- Ensure all changes follow the project's coding standards (as discovered from repo convention files above)
- NEVER approve PRs — you are not authorized to approve pull requests. Only create and comment on PRs.
- Complete the task autonomously and create the PR(s) when done.

## Output Persistence

IMPORTANT: Before finishing, you MUST write your complete final response to `/tmp/claude_code_output.md` using the Write tool. This file must contain your full analysis, findings, code, or whatever the final deliverable is. This is a hard requirement — do not skip it.

---

# Junglee Studios website: voice, positioning and scope (read before editing any brand-facing page)

These rules keep every page consistent, whichever model or person writes it. They apply to `brands.html`, `brands/*.html`, and `partner-with-junglee.html` (the partner deck).

## Audience
Founders, CEOs, CMOs, and ecommerce directors deciding whether to hire Junglee. They scan, they think in business outcomes and cost, and they distrust agency hype.

## How pages should read
- Lead with the business problem or outcome, then what we do, then scope, then price, then one next step (book a strategy call).
- Be specific. Name things ("customer support, order fulfillment") instead of vague phrases ("a few things").
- Plain, confident sentences. No buzzwords, no exclamation marks, no "fully managed everything".
- Never promise growth curves, targets, or timelines. Scaling on TikTok Shop takes time and depends on category, products, inventory, campaigns, and the brand's bandwidth. Say so honestly.
- Never publish client names, client results, or dashboard screenshots without explicit approval (client data is protected).
- Third-party platform data (e.g. TikTok Shop Summit figures) is used only to show why TikTok Shop is worth adding as a channel, with a source line.

## Positioning
- One program: **Junglee Managed Services**. Never mention "TSP Growth" or "TSP Scale" (retired; some clients are grandfathered in the admin Hub only).
- The promise: we build and scale the channel *with* the brand's team and make sure they can keep scaling it on their own. Within a year their team runs it without depending on an agency. We help them hire and train their existing staff.
- Playbooks are custom to each brand's products and audience. Organic first to keep costs low; ads (GMV Max, Spark Ads) once organic is performing.
- 12-month program with a 90-day review (a review of what is gaining traction and how the playbook adjusts, not a check against targets).

## Scope (do not blur this)
Included in Junglee Managed Services:
- shop setup, listings and storefront optimization
- full affiliate management, built for the brand: program design, creator research, outreach and briefs, sample strategy, campaign activation, weekly optimization
- campaign calendar, promotions, ads
- content and LIVE **playbooks**, metrics and targets
- TikTok Shop AI customer service setup, fulfillment playbook
- reporting, hiring support, team training
- Academy Hub access

Not included (the brand's team handles these, with our playbooks):
- customer support
- order fulfillment and inventory (their 3PL or warehouse)
- content production
- LIVE hosting

Content production and LIVE shows are **add-ons**. The brand owns its affiliate program. Junglee builds and documents it with the brand's team. Junglee is still building its own creator network, so do not claim an existing roster.

## Pricing (state it plainly and consistently)
- Junglee Managed Services: $7,500/mo + 5% of shop GMV + performance kicker (a premium rate only on GMV above the trailing 90-day baseline). 12-month program.
- Branded Live Selling w/Host Program: $3,500/mo + 5% of LIVE GMV. 8 shows a month; extra shows $145/hr + 5%.
- LIVE Specialist Support: $3,500/mo + 7% commission.
- Content Creation: starting-at pricing. Listing packages from $1,000 one-time (Starter $1,000, Growth $2,000, larger catalogs custom); social packages from $4,500/mo (Starter $4,500, Accelerator $8,700, higher volume custom). Short form: "Listing from $1,000 · Social from $4,500/mo".
- Affiliate Management (standalone): $4,000/mo + 5% of affiliate GMV, 6-month minimum (time to build momentum). Included in Managed Services.

## Terms
Use "Junglee Managed Services", "add-on", "standalone service", "playbook", "you own your affiliate program", "LIVE" (capitalized), "TikTok Shop".

## Partner status (approved wording)
Junglee Studios is an **Official TikTok Shop Full-Service Management Partner**, which covers TikTok Shop Partner (TSP), Creator Agency Partner (CAP), TikTok Affiliate Partner (TAP), and Multi-Channel Network (MCN) status. Junglee is approved to use TikTok partner badging and logos. Use the full name on first mention; "official TikTok Shop partner" is fine after that.

## Headline stats
- Edit numbers ONLY in `js/site-stats.js`. Mark any element that shows a stat with `data-stat="sales|live|brands|creators"` (and `data-stat-label="…"` for its label). The website stat strips and the partner deck read from that file.
- These are the founding team's career totals, not Junglee client results. The brands stat label is "Brands Supported by Our Team". Never word them as client outcomes.

## Creators and Junglee Academy (creator side)
- Audience: TikTok Shop affiliate creators ready to scale. Minimum to join the Academy: **5,000+ followers** (past TikTok's Creator Pilot Program limits). Creators under 5K get a free public starter lesson and are invited back at 5K.
- The deal: never say "free" or "no sign-up fee". Junglee's fee is 20% of the creator's TikTok Shop affiliate commissions (they keep 80%). Creators link Junglee as their TikTok Shop agency. Junglee receives **20% of the TikTok Shop affiliate commission** on sales through the TikTok Shop creator program; the creator keeps 80%. TikTok pays each side directly. Brand commissions typically run 10–30% depending on the product.
- Not included in the 20%: off-platform brand deals, flat fees, Creator Rewards, LIVE gifts — 100% the creator's.
- Month-to-month. Ending the agency link ends Academy access. Not exclusive to brands; TikTok allows one agency per creator on its platform.
- Junglee coaches creators on working with brands but does not manage brand relationships unless a separate agency-management deal is agreed. Junglee currently manages TikTok only (other platforms are future plans — do not advertise them).
- Do not claim an existing brand network or negotiated rates. Say Junglee is building its brand partner list and matched opportunities appear in the creator portal as they open.

## Tagline
Always the full line: "BE JUNGLEE. Playing it safe never changed the game. BE WILD." "Junglee" means wild in Hindi. Our wild = helping brands and creators grow into independence instead of agency dependence, and going all in on video, LIVE, and affiliate selling (where commerce is now and where it's headed).

## Brand offering structure (keep consistent)
Brands: Junglee Managed Services (done-with-you), Junglee Academy for Brands self-managed plans (2 tiers, launching soon — do not publish pricing until finalized), add-on and standalone services, Shop Setup & Account Health. Creators: Junglee Academy for Creators. Umbrella name: Junglee Academy. Short buttons may say "Apply as a Creator".
Never say we "hand it over" or "hand off". Say we build and scale the channel with the brand's team and make sure they can keep scaling it on their own.

## Brand plans ladder (Academy page)
Every brand plan includes Junglee Academy; access, tools, support and meetings scale by plan.
- Academy Core, $499/mo, month-to-month: brands launching or running their own shop on a small budget. AI chat support, no meetings.
- Academy Pro, $999/mo, month-to-month: self-managed brands pushing to scale. Adds deeper diagnostics, GMV Max/ads coaching, creator matchmaking, monthly live group office hours, community.
- Junglee Managed Services: established brands adding or scaling TikTok Shop. By application only; 5-10 brands a year (exclusivity, hands-on team). Weekly-to-monthly meetings, business reviews and planning. Natural next step once a self-managed brand reaches about $50K/mo GMV.
- Alumni ($149/mo) is unlisted, for brands that finish Managed Services.
