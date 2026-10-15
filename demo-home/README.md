# Break the Barriers Academy — sample website

Static site: HTML5, CSS3, Bootstrap 5.3 and vanilla JS. Bootstrap, Bootstrap Icons and the Poppins/Inter fonts are **self-hosted** in `assets/vendor/`, so there are no third-party requests and the CSP can be strict.

## Run locally
- Quick look: open `index.html` in a browser (works from `file://`).
- Recommended: `npx serve .` (or `python -m http.server 8000`) in this folder, then open the printed URL.

## Deploy
Upload the folder to any static host (Netlify, Cloudflare Pages, Vercel, cPanel, S3). Then:
1. Replace `https://www.example.com` with the real domain in all `.html` files (canonical + Open Graph), `sitemap.xml` and `robots.txt`.
2. Send the security headers. `_headers` works on Netlify/Cloudflare Pages. Apache: `Header set Content-Security-Policy "<same policy as _headers>"` (plus `X-Content-Type-Options nosniff`, `Referrer-Policy`, `Strict-Transport-Security`). `frame-ancestors` only works as an HTTP header, not the `<meta>` CSP.
3. Serve over HTTPS.

## Verified content (from the supplied posters)
Batch Classes ₹4,999 · Cluster Classes ₹9,999 · Personal Training ₹19,999 · each 2 months · 44 sessions · Mon–Fri · 1 hour daily · weekends off · online via Google Meet. WhatsApp: +91 93600 46012 (`https://wa.me/919360046012`). To change the number, search and replace `919360046012` and `93600 46012` (also `whatsappNumber` in `assets/js/script.js`).

## Enquiry form — demo only
`contact.html` validates input in the browser, then opens WhatsApp with a pre-filled message. **Nothing is stored or emailed.** For stored enquiries use a trusted backend or form service with server-side validation and spam protection (CAPTCHA/honeypot); never put keys in frontend code. If you add one, update the CSP `connect-src`/`form-action`.

## Please confirm with the academy owner before launch
- **Student permission:** testimonial excerpts are anonymised ("BTB student"), but the feedback videos show identifiable students (one video has a student's first name burned in; the class videos show other learners and their names). Get consent, or swap them.
- **Videos on stage (IIT Madras, speaking event):** I assumed these show the academy's trainer; please confirm.
- **Hero/award photo:** the trophy is visible but no award is claimed on the site. Add wording only once the award is verified.
- **Logo:** no standalone logo file was supplied, so the gold BTB emblem was extracted from the promotional poster (low resolution; ask for the original vector/PNG). Two different logos appear in the materials (gold eagle emblem; older book-and-stars logo). The eagle emblem was used since it matches the palette.
- **Spelling:** one poster says "Break the Barrier Academy"; the site uses "Break the Barriers Academy".
- **Outdated items not used:** "New batch 11th Aug / 19th April" overlays, old website URL (breakthebarriersacademy.com), "flexible timings" and "access to materials" claims, and the "8pm batch" video.
- **Levels:** students mention "Level 1/2/3"; the posters describe one 2-month, 44-session programme, so levels are not mentioned on the site.
- **Not provided:** the WhatsApp voice message could not be opened, real class photographs (only video), social media URLs (so no social links), founder bio/qualifications.
- Source `img/` folder (original WhatsApp files) is not needed for deployment.

## Structure
`index, about, courses, learning-experience, testimonials, contact .html` · `assets/css/style.css` · `assets/js/script.js` · `assets/images` · `assets/videos` · `assets/vendor` · `sitemap.xml` · `robots.txt` · `_headers`