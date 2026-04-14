# Document

Contextually document the mentioned file or directory by adding inline documentation directly within the source files themselves.

For every dependency detected in the file(s):
- Identify and list all dependencies.
- Use webfetch (or an equivalent tool) to retrieve official, up-to-date documentation, changelogs, and relevant reference material for each dependency.
- Incorporate concise, contextual inline documentation into the source code explaining the dependency’s purpose, usage in this specific context, and any critical notes or version-specific behaviors.

In addition to the inline updates, for every source file processed, generate (or update) a companion Markdown file named `<source-filename>.md` in the same directory. This companion file must contain:
- List of all dependencies with version pins where available.
- “Why” section explaining the rationale for choosing and using each dependency in this project.
- Full extracted documentation from the dependency (key sections only, with links preserved).
- Complete source code of the original file (syntax-highlighted code block).
- Other relevant links (official docs, GitHub repo, issue trackers, security advisories, etc.).
- All inline documentation that was added to the source file, cleanly formatted as Markdown for easy future reference and reuse.

Finally, create or update an AGENT.md file in the root of the directory. This file must clearly state the overall purpose of the documented file(s) or directory, summarize the documented dependencies, and serve as the single source of truth for the agent’s understanding of the codebase section. 
