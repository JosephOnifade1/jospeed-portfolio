---
title: "Getting Started with RAG in 2025: From Architecture to Production"
description: "A comprehensive guide to building resilient Retrieval-Augmented Generation systems using Supabase pgvector, LangChain, and modern hybrid search strategies."
date: "2025-10-28"
author: "Joseph Onifade"
category: "AI & Data"
tags: ["AI", "RAG", "LangChain", "Vector Databases", "Supabase"]
readingTime: "6 min read"
coverImage: "/projects/journal/hybrid-index.jpg"
relatedProject: quivellox
draft: false
featured: true
---

# Getting Started with RAG in 2025

Retrieval-Augmented Generation (RAG) has matured from an experimental hack into the definitive standard for grounding Large Language Models in proprietary, dynamic knowledge bases.

In 2025, simply generating text embeddings and running a vanilla cosine similarity search is no longer enough to achieve production-grade precision. High hallucination rates, document fragmentation, and context-window pollution demand an engineered approach.

In this deep dive, I share the architectural blueprint behind **Quivellox**, my AI knowledge workspace.

---

## 1. The Real Challenges with Naive RAG

When most developers build their first RAG prototype, they follow a standard three-step pipeline:
1. Split documents into 500-token chunks with 50-token overlap.
2. Embed each chunk using an off-the-shelf embedding model.
3. Retrieve top-$k$ nearest neighbors and paste them into the system prompt.

While this works for simple FAQs, it fails dramatically on technical documentation and multi-page legal agreements:

- **Lost Context**: Chunking mid-sentence often divorces a critical fact from its qualifying clause.
- **Keyword Blindness**: Pure semantic embeddings struggle with exact SKU numbers, error codes, and legal citations.
- **Context Distraction**: Feeding 10+ loosely related chunks dilutes the model's attention, causing it to ignore the actual answer.

---

## 2. The Production Architecture

To solve these problems, we use a hybrid retrieval pipeline combining lexical search with dense vector indexing:

```
[Uploaded Document (PDF/Docx)]
            ↓
[Semantic Chunking Engine]
   ├── Dense Embeddings → pgvector (Cosine Distance)
   └── Sparse Inverted Index → PostgreSQL Full-Text Search (tsvector)
            ↓
   [Reciprocal Rank Fusion (RRF)]
            ↓
  [Cross-Encoder Reranker]
            ↓
   [Context Window Assembler] → [LLM Output with Citations]
```

### Implementing Hybrid Search in PostgreSQL

Instead of managing separate vector databases like Pinecone alongside relational tables, we use **Supabase pgvector** with native full-text search:

```sql
-- Create hybrid search query function
CREATE OR REPLACE FUNCTION hybrid_document_search(
  query_text text,
  query_embedding vector(1536),
  match_count int,
  rrf_k int DEFAULT 60
)
RETURNS TABLE (
  id uuid,
  content text,
  metadata jsonb,
  score float
)
LANGUAGE sql STABLE
AS $$
  WITH vector_matches AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> query_embedding) AS rank
    FROM document_chunks
    LIMIT match_count * 2
  ),
  text_matches AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank(fts_tokens, websearch_to_tsquery(query_text)) DESC) AS rank
    FROM document_chunks
    WHERE fts_tokens @@ websearch_to_tsquery(query_text)
    LIMIT match_count * 2
  )
  SELECT 
    c.id, 
    c.content, 
    c.metadata,
    COALESCE(1.0 / (rrf_k + vm.rank), 0.0) + COALESCE(1.0 / (rrf_k + tm.rank), 0.0) AS score
  FROM document_chunks c
  LEFT JOIN vector_matches vm ON c.id = vm.id
  LEFT JOIN text_matches tm ON c.id = tm.id
  WHERE vm.id IS NOT NULL OR tm.id IS NOT NULL
  ORDER BY score DESC
  LIMIT match_count;
$$;
```

---

## 3. Grounding Output with Strict Source Citations

The most critical UX requirement in Quivellox is that **every claim made by the model must cite an exact chunk ID**.

We instruct the model using a structured system prompt:

> You are a precise knowledge assistant. Answer the user's question using ONLY the provided context chunks. Every statement must cite its source in brackets (e.g. `[source: chunk_id]`). If the provided context does not contain the answer, explicitly state that the information is unavailable.

---

## 4. Key Takeaways for 2025 Builders

1. **Invest in Chunking**: Semantic boundaries (splitting on paragraphs, markdown headings, and tables) outperform mechanical character-length chunking every time.
2. **Combine Vector & Keyword**: Hybrid search via Reciprocal Rank Fusion catches exact terms that dense embeddings overlook.
3. **Keep Infrastructure Unified**: Using Postgres for both relational state and vector embeddings eliminates multi-database sync headaches.

Happy building!

