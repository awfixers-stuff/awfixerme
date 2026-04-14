---
title: "Welcome to the blog"
description: "A lightweight writing surface built into the site — Markdown files, static pages, no CMS lock-in."
date: 2026-04-14
---

This blog reads Markdown from the repository at build time. Each file in `content/posts` becomes a URL under `/blog/[slug]`.

## Editing flow

1. Add `your-post.md` with frontmatter (`title`, `description`, `date`).
2. Write the body in Markdown — **bold**, _italic_, lists, and [links](https://nextjs.org) work via GitHub-flavored Markdown.
3. Deploy; pages are generated statically.

```text
content/posts/example.md  →  /blog/example
```

Ship words often; the plumbing stays out of your way.
