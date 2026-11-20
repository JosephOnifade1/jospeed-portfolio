---
title: When is a massage slot actually booked?
description: In the Revive Touch sample, choosing a time is a local decision. A confirmed booking is something both the player and the therapist can see.
date: "2026-11-18"
author: Joseph Onifade
category: Product engineering
tags: ["Mobile UX", "Booking flows", "React"]
readingTime: 2 min read
coverImage: /projects/journal/table-ticket.jpg
featured: false
draft: false
---

A player at a poker tournament wants an on-site massage. They can glance at their phone and pick 14:30. But if the interface says **Booked** the moment they touch the time, what does the therapist actually see?

In the [Revive Touch portfolio sample](/case-study/revive-touch#demo), you can answer that question by looking at the same session from both sides. The times are fictional; you are not making an appointment.

## Available, selected, confirmed

- **Available:** The therapist has an open time. The player can choose it.
- **Selected:** The player has picked a time but has not confirmed. On the therapist’s schedule the slot is still open.
- **Confirmed:** The player sees the booked time. That same time is marked **Booked** in the therapist’s view and can no longer be offered as an open slot.

Selection belongs to the player. Availability belongs to the schedule. Keeping those two ideas separate lets the interface change its mind honestly when the schedule changes.

## Try changing availability before confirmation

Select 14:30 as the player. Before confirming, close 14:30 in the therapist view. The player should no longer be able to book that time. Reopen it, select it again and confirm. Compare the time on the player’s confirmation with the one marked **Booked** on the schedule.

That comparison is more useful than a generic success message: it tells the player which session they have and the therapist which time is taken. Reset the sample to start again.

## What the sample does not prove

Both panels in this portfolio read from one in-memory schedule. The real mobile app uses React Native with Expo, TypeScript and a Convex backend. The sample explains the interaction; it is not a test of two phones booking at once, a live therapist calendar, or evidence that a session took place.
