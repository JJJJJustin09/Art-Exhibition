# Chromatic Oil Salon Deployment

This site is a static website. It can be deployed on GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any static web host.

## Required Before Search Engines Can Find It

1. Deploy the site to a public URL.
2. Replace the placeholder SEO URL:

```bash
node update-public-url.mjs https://your-real-domain.com
```

3. Upload the updated files again if you ran the script after deployment.
4. Submit the public URL and sitemap to search engines:
   - Google Search Console: submit `https://your-real-domain.com/sitemap.xml`
   - Bing Webmaster Tools: submit the same sitemap
   - Baidu Search Resource Platform: use this if China/Baidu discovery matters

## Recommended Static Host: Netlify

1. Go to Netlify.
2. Create a new site from this folder or drag this project folder into Netlify Drop.
3. After Netlify gives you a public URL, run:

```bash
node update-public-url.mjs https://your-netlify-site.netlify.app
```

4. Redeploy the folder.
5. Submit the sitemap URL to search engines.

## Recommended Custom Domain Step

After buying a domain, connect it in your host dashboard. Then run:

```bash
node update-public-url.mjs https://your-domain.com
```

Redeploy once more so `robots.txt`, `sitemap.xml`, canonical tags, and social preview images all point to the final domain.

## Files Search Engines Use

- `index.html`: title, description, Open Graph, Twitter card, structured data
- `robots.txt`: crawl permission and sitemap location
- `sitemap.xml`: public URLs to index
- `site.webmanifest`: app/site metadata

## Current Limitation

If `supabase-config.js` is empty, upload, likes, and comments run in browser-local preview mode. Public visitors can interact in their own browser, but uploaded works are not shared with other visitors.

To make uploads visible to everyone:

1. Create a Supabase project.
2. Create a public Storage bucket named `artworks`.
3. Open Supabase SQL Editor and run `supabase-schema.sql`.
4. In `supabase-config.js`, fill in:

```js
window.OIL_SALON_SUPABASE = {
  url: "https://YOUR_PROJECT.supabase.co",
  anonKey: "YOUR_PUBLIC_ANON_KEY",
};
```

5. Upload the updated files to GitHub again.

After this, uploaded artworks are saved to Supabase Storage and metadata is saved to the Supabase database, so other visitors can see them.
