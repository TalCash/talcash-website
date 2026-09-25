# talcash.com

The TalCash website: plain HTML and CSS, one small script, nothing loaded from other servers.
The code of the coin itself lives at [TalCash/TalCash](https://github.com/TalCash/TalCash).

```
public/index.html    the page
public/styles.css    all styling (light and dark follow the visitor's system setting)
public/day.js        today's 1,440 blocks, one square per minute
public/favicon.svg   the mark
public/404.html      shown for unknown addresses
public/_headers      security headers
wrangler.jsonc       tells Cloudflare to serve public/ as a static site
```

## Preview

Open `public/index.html` in a browser, or serve the folder:

```
python -m http.server 8000 --directory public
```

## Publish (Cloudflare Workers)

The repository is connected to Cloudflare (**Workers & Pages**, project `talcash-website`) with no
build command and the deploy command `npx wrangler deploy`. Every push to `main` goes live by itself.
The domain is set under the project's **Settings → Domains & Routes**.
