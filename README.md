# JOspeed portfolio

Joseph Onifade’s React + Vite portfolio. The homepage leads from the original hero into three selected projects and the full work archive, a short bio and capabilities, four recent field notes, and an inquiry form for project work and engineering roles.

## Run and verify

Use Node 22.12+ and npm. `npm ci` installs the correct platform binaries (the historical checkout contains Windows dependencies).

```sh
npm ci
npm run dev
npm run build
```

`npm run build` renders the actual React routes to static HTML, including the Markdown bodies, case decisions, evidence and navigation. Vite builds the client and a build-only `StaticRouter` renderer (`src/entry-static.jsx`). Clean entries hydrate the existing DOM; links with a filter, fragment or saved navigation state start in the requested view. No production Node server or second, crawler-specific set of pages is required.

Only deploy the **fresh `dist/`** from this command, not the historical checked-in output or the intermediate `dist-ssr/`. `scripts/generate-seo.js` derives `sitemap.xml` and `robots.txt` from the same published inventory; there are no hand-maintained copies in `public/`. The preferred origin is `https://buildwithjospeed.vercel.app`. `/coverflow` remains an alias for `/gallery`; query strings, aliases, drafts and the error page are not sitemap entries. Vercel’s `cleanUrls` / `trailingSlash` settings serve flat entries; don’t add a blanket 200 rewrite to `index.html`.

`npm run preview` serves the build, including permanent redirects and a `404` for unknown pages. For an Arena preview use `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS=.e2b.app npm run preview -- --host 0.0.0.0`. To check the first response yourself, turn off JavaScript, open `/blog/getting-started-with-rag-2025`, read **The Production Architecture**, then follow **See Quivellox in action** to its source passage.

```sh
npm run lint
npm run test:blog
npx playwright install chromium
npm run test:e2e
```

The journey tests run at 1440×900 and 390×844. By default they build the site and start a production preview. Set `PORTFOLIO_TEST_URL` to use an already-running server instead. They cover keyboard and fragment navigation, archive filters and 3D cover links, the local slot-booking demo, real project routes, images, and the contact form's error/retry/success paths **without sending a real message**. The sharing tests also fetch every case with JavaScript disabled, check the actual image files and exercise article ↔ case navigation.

## Update the work

Edit `src/data/projects.js`. `selection` determines the order on the homepage; `1` is the feature. The same record supplies the summary, role, platforms or delivery, media, sample links, case study and capability link. Leave `github` or `live` null unless the link actually opens that project's repository or product.

**Work archive:** `/work` opens the full project grid. The Mobile, Web and AI & automation filters use the project’s `category`; `selection` moves a project to the front without duplicating it. `/gallery` and the older `/coverflow` URL open the same index in 3D. Category and active cover are linkable: for example, `/gallery?category=web&project=homeplate`. Each cover opens its case study. Use the previous/next buttons, or focus the covers and use the arrow keys.

- **Revive Touch:** Joseph was the solo full-stack developer (UI/UX, mobile front end, backend and delivery) of an iOS/Android app for on-site massage bookings at poker tournaments. The app uses React Native (Expo), TypeScript and Convex. The poker table is editorial artwork, and the overlaid booking is an illustration, not a client screenshot. **Try a sample booking** opens `/case-study/revive-touch#demo` directly from Selected Work. Choose a fictional time, confirm it and inspect the therapist’s schedule, or change an unbooked time’s availability. The sample runs in memory without any backend connection; reset or reload to start over. The booking field note keeps its original published URL. When the client approves a capture, add it under `public/projects/work/` and change `visual` to `{ kind: 'screenshot', theme: 'paper', label, src, alt, caption }`.
- **Quivellox:** local capture of the [public inquiry desk UI](https://github.com/JosephOnifade1/quivellox), including its answer renderer and evidence inspector. The sample conversation uses the example escalation policy from the project's public preview; it is not a live model response. The **Check a sample citation** link in Selected Work opens `/case-study/quivellox#sample-answer`. Follow **[1] View source** to focus and highlight the cited excerpt on page 12, then **Back to answer** to return to the citation. The document name, page and exact passage live in `visual.exchange.citation`; no PDF download or live inference is involved.
- **Borynx:** local capture of the [public community app](https://github.com/JosephOnifade1/freelancer-s-hub)'s New Posts feed using its built-in demo mode. No production accounts, credentials or private posts were used.

The hero keeps its original headline and artwork. The introduction uses the shared role and location, links Quivellox to its case study and invites both project and role inquiries. Its counts come from the published collections; the **Field notes** count opens `/blog`.

**Résumé:** The quiet **Download résumé** link in About serves `public/resume/joseph-onifade-resume.pdf` directly, including without JavaScript. It is a one-page, text-based project résumé with public contact and case-study links, not an inferred employment history. To update it, edit the confirmed facts in `src/data/profile.js` / `src/data/projects.js` and the contributions in `scripts/render-resume.js`, then run `npx playwright install chromium` and `npm run resume:pdf`. Review the page and check in the resulting PDF. A personal résumé can instead replace the file at the same path; keep the link’s page count accurate. The normal site build does not need a browser.

Hash destinations such as `/#projects`, `/#skills` and `/#contact` remain stable; the contact form sends project **or** role inquiries to the existing Formspree endpoint. “Start a similar project” attaches the known case name as a removable `reference` field in the inquiry, separate from the visitor’s message. A copied similar-project link carries only the public project slug; a general contact link has no reference. Without JavaScript, the case offers the same form in a disclosure with a reference checkbox; all inquiries still use POST, never personal information in a query string. Contact also has a separate **Hire me on Upwork** card. Its destination is `UPWORK_PROFILE` in `src/components/UpworkProfileLink.jsx`; it is a plain external profile link, not a widget, and does not transmit the inquiry draft.

**Client feedback:** Under “The booking flow,” Revive Touch shows a factual project note (`#project-note`) alongside the sample workflow. To replace it with a testimonial, set `caseStudy.approvedTestimonial` in `src/data/projects.js` to `{ quote, credit }` using the exact wording and public credit the client has approved. Leave it `null` otherwise. These records are bundled into the site, so keep private drafts and permission correspondence out of them.

**Upwork brief:** `/#upwork-brief` opens an optional local editor beneath the profile link. “Start a similar project” seeds the brief with that case’s public URL; opening Contact directly does not guess a project from analytics. Visitors can edit the deliverable, timeline and budget, and explicitly add the project note from the form without importing the name or email fields. **Copy brief** copies only the displayed text. If the clipboard is unavailable, the editor selects the text for manual copying. Neither action submits a message, opens Upwork, or stores the draft in browser storage. The separate **Open Upwork** link lets visitors choose when to leave, without adding the brief to the profile URL.

**Blog:** “Field notes.” previews the four newest published articles. `/blog` shows every article once, with search, category filters and a featured story. The RAG guide and Quivellox case study remain linked in both directions.

**Brand assets:** In the masthead and footer, `BrandLockup` uses the citron `public/brand/jospeed-mark.svg` as the **JO** in **JOspeed**. Only “speed” follows the mark; the accessible name is the full word. The SVG’s paths in `scripts/brand-mark.js` follow the selected drawing (`design/brand/jospeed-monogram.png`); the concept raster is not shipped. The tab icon widens the gap between the letters for a 16px tab. The SVG, 32px PNG, multi-size ICO, 180px Apple touch icon and 512px publisher logo are static files. After editing the drawing, public identity or hero artwork, run `npm run brand:assets` to regenerate the logo, icons and portfolio card (Sharp; DejaVu Sans, Serif and Sans Mono for the card lettering).

**Share previews:** The homepage and index pages use `public/share/jospeed-portfolio.jpg`: a 1200×630 card with the joined JOspeed wordmark, the existing hero sculpture, and the public identity from `src/data/profile.js`. The old `/og-image.png` URL serves the new composition for already-shared links. An article uses its own `coverImage`, falling back to the portfolio card only if it has no cover. Each `/case-study/:id` has its own title (`name` + `shareSubtitle`), description (`summary`) and 1200×630 JPEG in `public/share/cases/`. All eight case cards and the portfolio card use the same `wordmark()` drawing: the selected JO monogram followed immediately by the “speed” suffix used on the site. Tab, touch and publisher icons remain monogram-only; journal covers keep their own artwork. The three selected cards label the illustration or sample UI; the others diagram the components in the project record. After changing the work or its artwork, run `npm run share:images` and review the resulting images. These small static assets are served directly, not generated on a social crawler’s request. `src/seo/pageHead.js` owns the canonical origin and route metadata for both direct HTTP responses and client navigation. Vercel serves the built `.html` files with clean URLs; a catch-all rewrite to the homepage would hide them.

## Manage the blog

The source of truth is `content/blog/*.md`. The filename is the `/blog/:slug` URL; editing a title need not break an existing link. Each build reads the same published collection for the homepage, index, article pages, share metadata and sitemap. The template supplies the article H1 from `title`; start body sections at `##` instead of repeating the title. Posts are ordered by date, then slug when dates match. If several posts are featured, the newest featured post leads the index.

**Optional editor dashboard:** `.pages.yml` configures [Pages CMS](https://app.pagescms.org) for this repository. No database migration, public `/admin` route, or client-side write credentials are required.

1. Once the branch containing `.pages.yml` is on GitHub, sign in to Pages CMS with your GitHub account. Review the app's requested permissions and grant access to **only** `JosephOnifade1/jospeed-portfolio`.
2. Select the repository **and the branch you intend to edit**. In **Blog posts**, create or edit the Markdown body, summary, date, category, search tags, cover and featured status. `relatedProject` is optional; reserve it for a project's companion build guide. Blog image uploads default to `public/projects/journal/`. Each post’s `coverImage` supplies its thumbnail and share image.
3. New entries start with **Draft — exclude from the site** on. Turn it off to include an article on the next build, or back on to unpublish without deleting the file. Use a preview branch to review a change before merging it into your production branch. Saving in the editor is a Git commit, not a production deployment. Copies can persist in Git history, old deployments and preview caches.
4. Delete an article through the collection only if you want its URL removed on the next build. Don't delete an image another article or case study still uses. Published filenames are not renamed by the editor.

A draft is excluded from generated HTML, navigation, sitemap and the production JS bundle. **It is not confidential:** anyone who can read the repository can read the Markdown, and files under `public/` are served regardless of draft status. Keep private material out of both. You can still edit posts by hand; use a plain YAML header, a `YYYY-MM-DD` date, and a boolean `draft` flag. Run `npm run test:blog` and `npm run build` to verify.

The Field Notes illustrations are numbered 1200×630 JPEGs. To regenerate the series, run `node scripts/render-journal-covers.js`. The script renders only its named plates, not other covers uploaded through the editor.

**Public facts:** Maintain the confirmed name, role, city and email in `src/data/profile.js`. Use a city and country, not a guessed pin, business address or operating hours. The existing `llms.txt` is a short directory until the dedicated discovery change.

**Editorial TODO:** Before publishing conversion, ranking, latency or retention figures, confirm the measurement, date range and permission to publish. Until then describe what the reader can see or do. Keep private evidence out of this repository.

## Measure the journey

With Vercel Web Analytics custom events enabled on the deployment, compare these before/after metrics over the same time window. Establish a baseline first if these events have not been collected previously.

| Event | Meaning |
| --- | --- |
| `selected_work_viewed` | Selected Work appeared in view; counted once per tab session. |
| `case_study_opened` | A case study rendered. Properties: project slug and source (`hero`, `selected_work`, `capabilities`, `work_archive`, `work_gallery`, `next_case`, `blog_post`, or `direct`). Deduplicated per project/source per tab session. |
| `inquiry_sent` | Formspree accepted a submission. `last_case` is the last case-study slug viewed in this tab, or `none`. |
| `upwork_profile_clicked` | Visitor activated the Upwork profile link (card or brief handoff), with the same `last_case` attribution. Count separately from inquiries: the portfolio cannot tell whether an invitation or a hire followed. |

Use opens with `source=selected_work` per Selected Work viewer, and successful inquiries with `last_case` other than `none` from case-study visitors. Attribution uses session storage with an in-memory fallback. Names, email addresses and messages are sent **only to the contact provider**, never as analytics event properties.
