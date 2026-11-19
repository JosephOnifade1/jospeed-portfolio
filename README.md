# JOspeed portfolio

Joseph Onifade’s React + Vite portfolio. The homepage leads from the original hero into three selected projects and the full work archive, a short bio and capabilities, two field notes, and a project inquiry form.

## Run and verify

Use Node 22.12+ and npm. `npm ci` installs the correct platform binaries (the historical checkout contains Windows dependencies).

```sh
npm ci
npm run dev
npm run build
```

`npm run build` also generates the blog entry points, sitemap and robots file. `npm run preview` serves the production output. When sharing a Vite preview through Arena, run `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS=.e2b.app npm run preview -- --host 0.0.0.0`.

```sh
npx playwright install chromium
npm run test:e2e
```

The journey tests run at 1440×900 and 390×844. Set `PORTFOLIO_TEST_URL` to test an already-running build instead of starting Vite. They cover keyboard and fragment navigation, archive filters and 3D cover links, the local table-request demo, real project routes, images, and the contact form's error/retry/success paths **without sending a real message**.

## Update the work

Edit `src/data/projects.js`. `selection` determines the order on the homepage; `1` is the feature. The same record supplies the summary, delivery, role, media, case study and capability link. Leave `github` or `live` null unless the link actually opens that project's repository or product.

**Work archive:** `/work` opens the full project grid. The Mobile, Web and AI & automation filters use the project’s `category`; `selection` moves a project to the front without duplicating it. `/gallery` and the older `/coverflow` URL open the same index in 3D. Category and active cover are linkable: for example, `/gallery?category=web&project=homeplate`. Each cover opens its case study. Use the previous/next buttons, or focus the covers and use the arrow keys.

- **Revive Touch:** the table scene is generated editorial artwork. The overlaid request slip is an explicitly labeled illustration with fictional table data, not a client screenshot. The case study also has a playable sample at `/case-study/revive-touch#demo`: request service at Table 14, acknowledge the ticket as staff, then reset. The demo uses component state only; it never contacts a service, and refreshing clears it. When the client approves a capture, add it under `public/projects/work/` and change `visual` to `{ kind: 'screenshot', theme: 'paper', label, src, alt, caption }`.
- **Quivellox:** local capture of the [public inquiry desk UI](https://github.com/JosephOnifade1/quivellox), including its answer renderer and evidence inspector. The sample conversation uses the example escalation policy from the project's public preview; it is not a live model response. The case study includes a readable transcript.
- **Borynx:** local capture of the [public community app](https://github.com/JosephOnifade1/freelancer-s-hub)'s New Posts feed using its built-in demo mode. No production accounts, credentials or private posts were used.

`Hero.jsx` and its artwork are unchanged. Hash destinations such as `/#projects`, `/#skills` and `/#contact` remain stable; the contact form posts to the existing Formspree endpoint.

## Measure the journey

With Vercel Web Analytics custom events enabled on the deployment, compare these before/after metrics over the same time window. Establish a baseline first if these events have not been collected previously.

| Event | Meaning |
| --- | --- |
| `selected_work_viewed` | Selected Work appeared in view; counted once per tab session. |
| `case_study_opened` | A case study rendered. Properties: project slug and source (`selected_work`, `capabilities`, `work_archive`, `work_gallery`, `next_case`, or `direct`). Deduplicated per project/source per tab session. |
| `inquiry_sent` | Formspree accepted a submission. `last_case` is the last case-study slug viewed in this tab, or `none`. |

Use opens with `source=selected_work` per Selected Work viewer, and successful inquiries with `last_case` other than `none` from case-study visitors. Attribution uses session storage with an in-memory fallback. Names, email addresses and messages are sent **only to the contact provider**, never as analytics event properties.
