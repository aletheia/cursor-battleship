# V0 Prompt Generator Command

Generate a Vercel v0-ready prompt by reading the local `docs/` knowledge base and distilling it into a high-signal brief with clear functionality, design preferences, libraries, and context.

## Why this works (v0 best practices)

- Be explicit about functionality and UX
- Specify libraries/frameworks (Next.js App Router, Tailwind, Radix UI, lucide-react)
- Provide domain context (summarized from `docs/`)
- Ask for code-only output

## What it outputs

- A structured prompt that includes:
  - Project stack and conventions
  - Your specific goal (from `--feature` or inline text)
  - Design/UX preferences aligned to Tailwind + Radix primitives
  - "Code only" constraint
  - A compact appendix of high-signal excerpts from `docs/`

## Notes

- The generator searches `@docs/` then falls back to `docs/`.
- It recursively reads `.md/.mdx/.mdc`, heuristically extracts headings, bullets, and first paragraphs, then truncates to keep prompts tight.
- Stack hints are inferred from `src/components/ui/*` so v0 aligns with our UI primitives.
