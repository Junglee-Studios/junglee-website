# junglee-website
## Shared header & footer
Edit `partials/nav.html` / `partials/footer.html`, then run
`python3 scripts/build-partials.py` to stamp them into every page
(`--check` reports pages that are out of date). Footer styles live in
`styles/base.css`. The Academy app mirrors the footer in
`client/src/components/site/SiteFooter.tsx` — update it too.
