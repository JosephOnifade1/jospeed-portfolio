---
title: Can a reader check that RAG answer?
description: A numbered source looks convincing. Follow one answer back to page 12 and check whether the passage supports its timing, its wording and its limits.
date: "2026-11-18"
author: Joseph Onifade
category: AI & Data
tags: ["RAG", "Citations", "Evaluation"]
readingTime: 2 min read
coverImage: /projects/journal/source-margin.jpg
featured: true
draft: false
---

In the Quivellox sample, a reader asks for the incident escalation timeline. The answer gives two numbers: **15 minutes** for initial triage and **one hour** for escalation. Both numbers could appear in the right PDF and still be attached to the wrong actions. Counting citations wouldn't catch that mistake.

Here's a small review you can run on a document Q&A interface without training a model or buying an evaluation service.

## Check the verbs, not just the numbers

[Open the sample answer](/case-study/quivellox#sample-answer) and follow **[1] View source**. On page 12 of *Security incident response.pdf*, the passage says initial detection and triage must be **completed** within 15 minutes of alert identification. It separately requires escalation **to the security team** within an hour.

Change one word in the answer as a thought experiment: “**Start** triage within 15 minutes.” The number hasn't moved, but the deadline now allows work to *begin* when the policy says it must be *finished*. This is why I would ask a reviewer to underline the words that support the claim, rather than tick a box marked “PDF found.”

## Try a question the passage cannot answer

Suppose the next question is “Which individual is on call tonight?” The passage names a team, not a person or a rota. A useful response would say what is missing and direct the reader to the on-call schedule. It shouldn't guess a name or reuse the same citation as if it settled the question.

Keep both examples in an evaluation set: one where the source answers the question, and one where it doesn't. A system that always produces a confident answer will look fine on the first example alone.

## Make the trip reversible

Follow the source using only the keyboard. Can you tell which passage is selected without searching the whole document? Use **Back to answer**. Do you return to the citation you activated or to the top of a long conversation?

The portfolio example uses a fixed exchange and a sample excerpt, not live inference. That's useful here: the words stay still while you test whether a reader can actually verify them. For the retrieval side of the problem, see the [RAG architecture guide](/blog/getting-started-with-rag-2025).
