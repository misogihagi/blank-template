---
root: true
targets: ["*"]
description: "Project overview and general development guidelines"
globs: ["**/*"]
---

# Project Overview

## General Guidelines

- Use meaningful comments for complex business logic

## Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use double quotes for strings
- Use trailing commas in multi-line objects and arrays
- Always use `devbox`. Execute commands via `devbox run <script>` or `echo <command> | devbox shell`, respecting project-specific environment variables.
- Before completing any changes, always run `devbox run check`
- Commit messages must follow the `commitlint` convention (`:emoji: <type>(<scope>): <subject>`).
  Example: `:sparkles: feat(auth): add login functionality`
- ADR (Architectural Decision Records):
  - When making significant technical decisions or rule changes, always record an ADR in `docs/decisions/`.
  - Adhere to the naming convention `<TAG>XXXX-name.md` and ensure consistency with existing ADRs (e.g., `G0001` onwards).
  - The tag is one of the following:
    - G (Governance, General)
    - F (Framework, Frontend)
    - P (Product)
