---
title: Test the link preview, not the browser tab
description: A case study can look right in a browser and still share as the homepage. Inspect the first HTML response and the image it points to before changing the design.
date: "2026-11-18"
author: Joseph Onifade
category: Web development
tags: ["Open Graph", "Vite", "Static HTML"]
readingTime: 2 min read
coverImage: /projects/journal/link-proof.jpg
featured: false
draft: false
---

You send someone a link to a case study. The preview shows your name and a portrait, so they assume you've sent the homepage. When they open the link, the case study is right there. How can both things be true?

A React router can select the right project and update the document title *after* the page loads. A service making a link preview may read only the HTML the server sent. Inspecting the title in a running browser tests the first experience, not the second.

## Read what arrived before React

Open a case study directly, then use **View Page Source**, not the Elements panel. Find `og:title`, `og:description`, `og:image` and the canonical link. On this portfolio, the Revive Touch title describes massage bookings at poker tournaments. The image URL points to that project's JPEG, not the general portfolio artwork.

Repeat the check on a second case. Two pages that each have “all the tags” can still have the *same* tags. Comparing the two responses catches a fallback serving the homepage for every URL.

## Follow the image as if it were a page

Copy the `og:image` URL into a new tab. Does an image open without a sign-in? Check its response in the Network panel. A successful status alone isn't enough: a catch-all router can return `200` and an HTML page when the image path doesn't exist. Look for an image content type and a picture that actually decodes.

A case card also needs to tell the truth at thumbnail size. The table scene on the Revive Touch card is labeled as a workflow illustration; a reader shouldn't have to open the article to discover that it isn't a client screenshot.

## Keep the build and the browser in agreement

The portfolio build writes a separate HTML entry for each case and article. The build and the router use the same metadata function: opening a URL directly and arriving through a project link should describe the same page. A tracking query can stay in the address bar without becoming part of the canonical URL.

Test both journeys before blaming a platform's preview cache. Once the raw HTML and image are correct, an old cached card is a different problem from a server still sending the wrong page.
