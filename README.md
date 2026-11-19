# JOspeed portfolio

Joseph Onifade’s React + Vite portfolio. The homepage leads from the original hero into three selected projects and the full work archive, a short bio and capabilities, four recent field notes, and a project inquiry form.

## Run and verify

Use Node 22.12+ and npm. `npm ci` installs the correct platform binaries (the historical checkout contains Windows dependencies).

```sh
npm ci
npm run dev
npm run build
```

`npm run build` generates static HTML entry points for every case study and article, the archive, gallery and blog index, plus the sitemap and robots file. `npm run preview` serves the production output. When sharing a Vite preview through Arena, run `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS=.e2b.app npm run preview -- --host 0.0.0.0`.

```sh
npx playwright install chromium
npm run test:e2e
```

The journey tests run at 1440×900 and 390×844. By default they build the site and start a production preview. Set `PORTFOLIO_TEST_URL` to use an already-running server instead. They cover keyboard and fragment navigation, archive filters and 3D cover links, the local table-request demo, real project routes, images, and the contact form's error/retry/success paths **without sending a real message**. The sharing tests also fetch every case with JavaScript disabled, check the actual image files and exercise article ↔ case navigation.

## Update the work

Edit `src/data/projects.js`. `selection` determines the order on the homepage; `1` is the feature. The same record supplies the summary, delivery, role, media, case study and capability link. Leave `github` or `live` null unless the link actually opens that project's repository or product.

**Work archive:** `/work` opens the full project grid. The Mobile, Web and AI & automation filters use the project’s `category`; `selection` moves a project to the front without duplicating it. `/gallery` and the older `/coverflow` URL open the same index in 3D. Category and active cover are linkable: for example, `/gallery?category=web&project=homeplate`. Each cover opens its case study. Use the previous/next buttons, or focus the covers and use the arrow keys.

- **Revive Touch:** the table scene is generated editorial artwork. The overlaid request slip is an explicitly labeled illustration with fictional table data, not a client screenshot. The case study also has a playable sample at `/case-study/revive-touch#demo`: request service at Table 14, acknowledge the ticket as staff, then reset. The demo uses component state only; it never contacts a service, and refreshing clears it. When the client approves a capture, add it under `public/projects/work/` and change `visual` to `{ kind: 'screenshot', theme: 'paper', label, src, alt, caption }`.
- **Quivellox:** local capture of the [public inquiry desk UI](https://github.com/JosephOnifade1/quivellox), including its answer renderer and evidence inspector. The sample conversation uses the example escalation policy from the project's public preview; it is not a live model response. At `/case-study/quivellox#sample-answer`, follow **[1] View source** to focus and highlight the cited excerpt on page 12, then **Back to answer** to return to the citation. The document name, page and exact passage live in `visual.exchange.citation`; no PDF download or live inference is involved.
- **Borynx:** local capture of the [public community app](https://github.com/JosephOnifade1/freelancer-s-hub)'s New Posts feed using its built-in demo mode. No production accounts, credentials or private posts were used.

`Hero.jsx` and its artwork are unchanged. Hash destinations such as `/#projects`, `/#skills` and `/#contact` remain stable; the contact form posts to the existing Formspree endpoint. Contact also has a separate **Hire me on Upwork** card. Its destination is `UPWORK_PROFILE` in `src/components/UpworkProfileLink.jsx`; it is a plain external profile link, not a widget, and does not transmit the inquiry draft.

**Client feedback:** Under “What shipped,” Revive Touch shows a factual project note (`#project-note`) alongside the sample workflow. To replace it with a testimonial, set `caseStudy.approvedTestimonial` in `src/data/projects.js` to `{ quote, credit }` using the exact wording and public credit the client has approved. Leave it `null` otherwise. These records are bundled into the site, so keep private drafts and permission correspondence out of them.

**Upwork brief:** `/#upwork-brief` opens an optional local editor beneath the profile link. “Start a similar project” seeds the brief with that case’s public URL; opening Contact directly does not guess a project from analytics. Visitors can edit the deliverable, timeline and budget, and explicitly add the project note from the form without importing the name or email fields. **Copy brief** copies only the displayed text. If the clipboard is unavailable, the editor selects the text for manual copying. Neither action submits a message, opens Upwork, or stores the draft in browser storage. The separate **Open Upwork** link lets visitors choose when to leave, without adding the brief to the profile URL.

**Blog:** “Field notes.” previews the four newest published articles. `/blog` shows every article once, with search, category filters and a featured story. The RAG guide and Quivellox case study remain linked in both directions.

**Share previews:** Each `/case-study/:id` has its own title (`name` + `shareSubtitle`), description (`summary`) and 1200×630 JPEG in `public/share/cases/`. The three selected cards label the illustration or sample UI; the others diagram the components in the project record. After changing the work or its artwork, run `npm run share:images` and review the resulting images. These small static assets are served directly, not generated on a social crawler’s request. `src/seo/pageHead.js` owns the canonical origin and route metadata for both direct HTTP responses and client navigation. Vercel serves the built `.html` files with clean URLs; a catch-all rewrite to the homepage would hide them.

## Manage the blog

The source of truth is `content/blog/*.md`. The filename is the `/blog/:slug` URL; editing a title need not break an existing link. Each build reads the same published collection for the homepage, index, article pages, share metadata and sitemap. Posts are ordered by date, then slug when dates match. If several posts are featured, the newest featured post leads the index.

**Optional editor dashboard:** `.pages.yml` configures [Pages CMS](https://app.pagescms.org) for this repository. No database migration, public `/admin` route, or client-side write credentials are required.

1. Once the branch containing `.pages.yml` is on GitHub, sign in to Pages CMS with your GitHub account. Review the app's requested permissions and grant access to **only** `JosephOnifade1/jospeed-portfolio`.
2. Select the repository **and the branch you intend to edit**. In **Blog posts**, create or edit the Markdown body, summary, date, category, search tags, cover and featured status. `relatedProject` is optional; reserve it for a project's companion build guide. Blog image uploads default to `public/projects/journal/`. Each post’s `coverImage` supplies its thumbnail and share image.
3. New entries start with **Draft — exclude from the site** on. Turn it off to include an article on the next build, or back on to unpublish without deleting the file. Use a preview branch to review a change before merging it into your production branch. Saving in the editor is a Git commit, not a production deployment. Copies can persist in Git history, old deployments and preview caches.
4. Delete an article through the collection only if you want its URL removed on the next build. Don't delete an image another article or case study still uses. Published filenames are not renamed by the editor.

A draft is excluded from generated HTML, navigation, sitemap and the production JS bundle. **It is not confidential:** anyone who can read the repository can read the Markdown, and files under `public/` are served regardless of draft status. Keep private material out of both. You can still edit posts by hand; use a plain YAML header, a `YYYY-MM-DD` date, and a boolean `draft` flag. Run `npm run test:blog` and `npm run build` to verify.

The Field Notes illustrations are numbered 1200×630 JPEGs. To regenerate the series, run `node scripts/render-journal-covers.js`. The script renders only its named plates, not other covers uploaded through the editor.

## Measure the journey

With Vercel Web Analytics custom events enabled on the deployment, compare these before/after metrics over the same time window. Establish a baseline first if these events have not been collected previously.

| Event | Meaning |
| --- | --- |
| `selected_work_viewed` | Selected Work appeared in view; counted once per tab session. |
| `case_study_opened` | A case study rendered. Properties: project slug and source (`selected_work`, `capabilities`, `work_archive`, `work_gallery`, `next_case`, `blog_post`, or `direct`). Deduplicated per project/source per tab session. |
| `inquiry_sent` | Formspree accepted a submission. `last_case` is the last case-study slug viewed in this tab, or `none`. |
| `upwork_profile_clicked` | Visitor activated the Upwork profile link (card or brief handoff), with the same `last_case` attribution. Count separately from inquiries: the portfolio cannot tell whether an invitation or a hire followed. |

Use opens with `source=selected_work` per Selected Work viewer, and successful inquiries with `last_case` other than `none` from case-study visitors. Attribution uses session storage with an in-memory fallback. Names, email addresses and messages are sent **only to the contact provider**, never as analytics event properties.
