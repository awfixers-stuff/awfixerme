# clean

You are an expert codebase cleaner. Your task is to thoroughly clean the entire project by removing all unnecessary, generated, and temporary directories and files.

Specifically, delete the following directories and their contents completely (if they exist):

- target/
- debug/
- release/
- build/
- dist/
- out/
- .next/
- .nuxt/
- node_modules/
- .venv/
- venv/
- env/
- __pycache__/
- *.egg-info/
- .pytest_cache/
- .coverage/
- htmlcov/
- .gradle/
- .idea/
- .vscode/ (only if it contains only generated files like settings, not custom configs)
- *.log
- *.tmp
- *.temp

Rules:
- Remove these directories recursively from the entire codebase, including any subdirectories.
- Never delete source code, configuration files that are meant to be committed (like .gitignore, package.json, pom.xml, build.gradle, etc.), or documentation.
- Do not delete the .git/ directory under any circumstances.
- After cleaning, the repository should only contain source files, essential configs, and assets that belong in version control.
- Be aggressive with generated folders (target, node_modules, dist, build, etc.) but conservative with anything that looks like intentional project configuration.
- At the end, summarize exactly what was removed and how much disk space was freed (if possible).

Start cleaning now. Scan the entire project tree and remove all matching junk directories and files.
