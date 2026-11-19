---
title: A table request in three states
description: A player needs to know someone saw the request. Staff need to know where to go. One Table 14 ticket can answer both questions without promising the job is done.
date: "2026-11-18"
author: Joseph Onifade
category: Product engineering
tags: ["Mobile UX", "State machines", "React"]
readingTime: 2 min read
coverImage: /projects/journal/table-ticket.jpg
featured: false
draft: false
---

Imagine asking for a massage at a poker table. You tap once, the button says **Success**, and nothing else changes. Did your phone send the request? Did a member of staff see it? Should you tap again? The word is technically reassuring and practically useless.

The Revive Touch portfolio demo lets you play both sides of that exchange. The interesting part isn't the tap. It's deciding what the interface is entitled to say *after* the tap.

## Give each state a witness

- **Ready:** The player can request service. The staff queue is empty. There is nothing to acknowledge yet.
- **Queued:** The player sees **Request queued**. Staff see a new ticket for a table-side massage at Table 14. The existence of that ticket is the evidence for the message on the player's side.
- **Seen:** Staff choose **Acknowledge request**. The badge on the ticket changes from **New** to **Seen**; the player sees **Seen by staff**. Nobody has claimed that a massage has started.

These aren't three independent switches. They are three positions along one path. If the player panel and the staff panel derive their labels from the same state, you can't accidentally show an empty queue alongside a message that says staff have seen the request.

## Keep the destination on the ticket

Read the staff side without looking at the player side. After acknowledgment, could you still walk to the right table? If a green check replaces the *entire* ticket, the interface has discarded the information that makes the next step possible. Keep the table and service in place; change the badge.

## Try the awkward second tap

[Open the Table 14 demo](/case-study/revive-touch#demo). Request service twice before you acknowledge it. There should be one ticket, not two. Now acknowledge it twice. The second tap shouldn't imply a second visit. Reset the demo and check that the queue is empty again.

This is an in-memory example, not a test of a live network. For a connected app, I'd give each request a stable ID and have the server recognize a retry of that ID. Disabling a button helps on one phone; it doesn't tell a server what to do when the same request arrives twice.
