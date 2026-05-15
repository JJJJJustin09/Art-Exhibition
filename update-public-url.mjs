import { readFile, writeFile } from "node:fs/promises";

const rawUrl = process.argv[2];

if (!rawUrl) {
  console.error("Usage: node update-public-url.mjs https://your-public-domain.com");
  process.exit(1);
}

let publicUrl;

try {
  publicUrl = new URL(rawUrl);
} catch {
  console.error("The public URL must be a valid absolute URL, for example https://chromaticoilsalon.com");
  process.exit(1);
}

if (!["http:", "https:"].includes(publicUrl.protocol)) {
  console.error("The public URL must start with http:// or https://");
  process.exit(1);
}

publicUrl.hash = "";
publicUrl.search = "";
publicUrl.pathname = publicUrl.pathname.replace(/\/+$/, "");

const siteUrl = publicUrl.toString().replace(/\/$/, "");
const homeUrl = `${siteUrl}/`;
const galleryUrl = `${siteUrl}/#gallery`;
const imageUrl = `${siteUrl}/assets/hero-gallery.jpg`;

const replacements = [
  {
    file: "index.html",
    transform(content) {
      return content
        .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${homeUrl}" />`)
        .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${imageUrl}" />`)
        .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${imageUrl}" />`)
        .replace(/<meta property="og:url" content="[^"]*" \/>/, "")
        .replace(
          /<meta property="og:site_name" content="Chromatic Oil Salon" \/>/,
          `<meta property="og:url" content="${homeUrl}" />\n    <meta property="og:site_name" content="Chromatic Oil Salon" />`,
        )
        .replace(/"image": ".*?"/, `"image": "${imageUrl}"`)
        .replace(/"url": ".*?",\n        "description"/, `"url": "${homeUrl}",\n        "description"`)
        .replace(
          /"name": "Chromatic Oil Salon",\n        "description"/,
          `"name": "Chromatic Oil Salon",\n        "url": "${homeUrl}",\n        "description"`,
        );
    },
  },
  {
    file: "robots.txt",
    transform(content) {
      return content.replace(/Sitemap: .*/, `Sitemap: ${siteUrl}/sitemap.xml`);
    },
  },
  {
    file: "sitemap.xml",
    transform(content) {
      let locIndex = 0;
      const urls = [homeUrl, galleryUrl];
      return content.replace(/<loc>.*?<\/loc>/g, () => `<loc>${urls[locIndex++] ?? homeUrl}</loc>`);
    },
  },
  {
    file: "site.webmanifest",
    transform(content) {
      return content.replace(/"start_url": ".*?"/, `"start_url": "${homeUrl}"`);
    },
  },
];

for (const replacement of replacements) {
  const content = await readFile(replacement.file, "utf8");
  await writeFile(replacement.file, replacement.transform(content));
}

console.log(`Updated public URL to ${homeUrl}`);
