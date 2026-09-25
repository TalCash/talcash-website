# talcash.com

The TalCash website: plain HTML and CSS, one small script, nothing loaded from other servers.
The code of the coin itself lives at [TalCash/TalCash](https://github.com/TalCash/TalCash).

```
index.html    the page
styles.css    all styling (light and dark follow the visitor's system setting)
day.js        today's 1,440 blocks, one square per minute
favicon.svg   the mark
404.html      shown for unknown addresses
_headers      security headers for Cloudflare Pages
```

## Preview

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

## Publish (Cloudflare Pages)

In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, pick this repository, leave the
build command empty and set the output directory to `/`. Then add `talcash.com` under **Custom
domains**. Every push to the main branch goes live by itself.
