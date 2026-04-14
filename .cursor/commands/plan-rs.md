# Plan Rust Migration (TypeScript → Rust)

Contextually document the mentioned file or directory by adding inline documentation directly within the source files themselves.

For every dependency detected in the file(s):
- Identify and list all dependencies.
- Use webfetch (or an equivalent tool) to retrieve official, up-to-date documentation, changelogs, and relevant reference material for each dependency.
- Incorporate concise, contextual inline documentation into the source code explaining the dependency’s purpose, usage in this specific context, and any critical notes or version-specific behaviors.

In addition to the inline updates, for every source file processed, generate (or update) the following companion files in the same directory:

1. A Markdown documentation file named `<source-filename>.md` containing:
   - List of all dependencies with version pins where available.
   - “Why” section explaining the rationale for choosing and using each dependency in this project.
   - Full extracted documentation from the dependency (key sections only, with links preserved).
   - Complete source code of the original file (syntax-highlighted code block).
   - Other relevant links (official docs, GitHub repo, issue trackers, security advisories, etc.).
   - All inline documentation that was added to the source file, cleanly formatted as Markdown.

2. A Rust migration plan file named `<source>.ts2rs.md` that thoroughly documents:
   - The exact strategy for mutating and refactoring the current TypeScript code into idiomatic Rust.
   - How every external dependency will be migrated (prefer std library implementations or minimal, battle-tested open-source crates).
   - Specific implementation details for replacing Zod (schema definition and validation) and header utilities (for request/response handling) with equivalent Rust patterns and crates.
   - Step-by-step transformation plan, including before/after code structure, dependency removal, local replacements or crate choices, and any required changes to types, logic, ownership, error handling, or interfaces.
   - Potential challenges, breaking changes, testing steps, and rationale grounded directly in the retrieved documentation and changelogs.

If the processed files are located inside a subdirectory, also generate (or update) a summary file named `SUBDIR_SUMMARY.md` in that subdirectory. This file must provide a concise overview of all documented files in the subdirectory, list the generated `.ts2rs.md` files, and link to them for quick navigation.

Finally, create or update an AGENT.md file in the root of the directory. This file must:
- Clearly state the overall purpose of the documented file(s) or directory.
- Summarize the documented dependencies.
- Outline the Rust migration plans from all `.ts2rs.md` files.
- Maintain an up-to-date Table of Contents at the top that grows as the documentation expands, with clear links to individual files, subdirectories, and their summary files.
- Serve as the single source of truth for the agent’s understanding of this section of the codebase.
