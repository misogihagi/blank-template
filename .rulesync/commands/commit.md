---
description: 'Prepare a commit following project governance'
targets: ["*"]
---

Prepare a commit for the changes in the current workspace.

1.  **Quality Check**: Run `devbox run check` to ensure code quality (CSpell, typos, secretlint). If any checks fail, report them to the user and resolve them if possible before proceeding.
2.  **Inspection**: Gather details about the changes to be committed:
    -   `git status`
    -   `git diff HEAD`
    -   `git log -n 5` to understand recent commit patterns.
3.  **Commit Message Generation**: Propose a commit message that follows the project's strict format:
    -   Format: `:emoji: (<scope>): <subject>`
    -   Start with a relevant **gitmoji**.
    -   **Scope**: Must be one of the following from `commitlint.config.js`: `adr`, `gitignore`, `devbox`, `lefthook`, `jstools`... If the change doesn't fit these, propose a reasonable scope or omit if applicable.
    -   **Subject**: Concise and descriptive (max 50-70 characters).
    -   **Body(Optional)**: Detail and ADR for reference.
4.  **Confirmation**: Run `echo <commit message> | devbox run commitlint` to ensure commit message convention.
5. **Output**: Write the commit message to .git/COMMIT_EDITMSG.
