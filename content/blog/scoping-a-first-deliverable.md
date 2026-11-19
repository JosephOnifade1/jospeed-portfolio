---
title: A project brief small enough to build
description: Turn “build me an app” into one observable handoff, a test for the first delivery, and a short list of things that can wait.
date: "2026-11-18"
author: Joseph Onifade
category: Freelancing
tags: ["Project briefs", "Scoping", "Acceptance criteria"]
readingTime: 2 min read
coverImage: /projects/journal/first-delivery.jpg
featured: false
draft: false
---

“We need a marketplace for home cooks” is a good reason to start a conversation. It isn't enough information to price a first delivery. One person might picture a directory of cooks; another might expect card payments, delivery tracking and refunds. Neither interpretation is unreasonable.

Before writing a feature list, try writing the message you'd want to send when the first piece is ready to test.

## Describe a handoff between two people

For an example marketplace brief, that message might be: “A buyer can choose a meal and request a pickup time. The cook can see which meal was requested and confirm the slot.” Now we know who acts, who responds, and what information has to survive the handoff. We haven't chosen a database or a payment provider. Those decisions aren't the brief's job yet.

## Write the acceptance test in ordinary language

Give the reviewer one example they can repeat. For instance:

> List a portion of jollof rice for Friday pickup. Request it as a buyer. Confirm the time as the cook. Go back to the buyer's view and check that Friday and the confirmed time are both visible.

Notice what's absent: “easy to use,” “seamless,” and “like a delivery app.” Those phrases don't tell either party whether the handoff works. A second test such as “what if the cook declines?” is a much more useful follow-up than a longer list of adjectives.

## Put the boundary in the same message

- **First delivery:** the request and confirmation, using sample listings.
- **Not in this version:** taking payments or tracking a rider. The buyer pays at pickup in this example.
- **Decision needed:** can two buyers request the last portion, or does the first request hold it?
- **Timing and budget:** give a date or range if you have one. “Flexible; estimate the pickup flow first” is a legitimate answer, too.

This is an illustrative brief, not a client order. To write your own, [open the portfolio's brief builder](/#upwork-brief) and replace the prompts with your handoff. Copying it doesn't send it to me or to Upwork. Read the copy once as the person accepting the work: could you decide whether the first delivery is finished?
