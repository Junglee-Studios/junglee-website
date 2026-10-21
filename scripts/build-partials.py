#!/usr/bin/env python3
"""Stamp partials/nav.html and partials/footer.html into every public page.

Edit the partials, then run:  python3 scripts/build-partials.py
Pages keep full header/footer HTML so search engines see the links.
"""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
NAV = (ROOT / "partials/nav.html").read_text()
FOOT = (ROOT / "partials/footer.html").read_text()
# Private tools/portals use their own header and are left alone.
SKIP = {"client-calculator.html", "client-portal.html", "shop-setup.html",
        "tsp-intake.html", "partner-with-junglee.html"}

HEADER_RE = re.compile(r'(<header id="site-header">\n).*?(</header>)', re.S)
FOOTER_RE = re.compile(r'(<footer id="site-footer">\n).*?(</footer>)', re.S)

def nav_for(page):
    # Mark the current page in the desktop nav, as loader.js does at runtime.
    if not page:
        return NAV
    return re.sub(r'(<div class="navlinks".*?)(<a [^>]*data-page="%s")' % re.escape(page),
                  lambda m: m.group(1) + m.group(2) + ' aria-current="page"', NAV, count=1, flags=re.S)

def main():
    changed, check = [], "--check" in sys.argv
    for f in sorted(list(ROOT.glob("*.html")) + list(ROOT.glob("brands/*.html"))):
        if f.name in SKIP and f.parent == ROOT:
            continue
        s = f.read_text()
        m = re.search(r'<body[^>]*data-page="([^"]*)"', s)
        out = HEADER_RE.sub(lambda x: x.group(1) + nav_for(m and m.group(1)) + x.group(2), s)
        out = FOOTER_RE.sub(lambda x: x.group(1) + FOOT + x.group(2), out)
        if out != s:
            changed.append(str(f.relative_to(ROOT)))
            if not check:
                f.write_text(out)
    print(("Out of date: " if check else "Updated: ") + (", ".join(changed) or "none"))
    sys.exit(1 if check and changed else 0)

if __name__ == "__main__":
    main()
