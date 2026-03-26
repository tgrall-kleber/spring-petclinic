# Copilot Files and Capabilities for Repeated Modernization Work

This document explains which Copilot files are worth creating if you plan to modernize many Java applications in a similar way.

## Short answer

Use **instructions first**.

For most teams, the most valuable reusable Copilot assets are:

- user-level instructions for cross-repository defaults
- repository-level instructions for architecture and conventions
- path-specific instructions for backend, frontend, API, and tests
- optional LSP configuration for stronger code intelligence

Agents and skills are useful, but usually only after the instruction layer is stable.

## Recommended order of investment

### 1. User-level instructions

Use `~/.copilot/copilot-instructions.md` for things you want Copilot to apply across many repositories.

This is where you encode durable defaults such as:

- API-first modernization
- no JPA entity exposure over REST
- OpenAPI-first contract thinking
- RFC 7807 errors
- Next.js App Router conventions
- `shadcn/ui` usage
- preferred testing expectations

Use this file when your modernization rules are mostly the same everywhere.

### 2. Repository-wide instructions

Use `.github/copilot-instructions.md` for repository-specific guidance.

Put things here such as:

- build and test commands
- package layout
- domain conventions
- deployment constraints
- what "done" means in this repository

Think of this file as the architectural briefing for any Copilot session in that repo.

### 3. Path-specific instructions

Use `.github/instructions/**/*.instructions.md` when different parts of the codebase need different rules.

Typical split for this modernization:

- `**/*.java` for backend API, DTO, validation, and error conventions
- `frontend/**/*.{ts,tsx}` for Next.js and React conventions
- `**/openapi*.{yml,yaml,json}` for API contract conventions
- `**/*Test*.java` or frontend test folders for testing patterns

These files usually give the best return because they keep backend and frontend guidance from colliding.

### 4. LSP configuration

Use `.github/lsp.json` if you want Copilot CLI to use repository-local language server configuration.

This is optional, but high leverage when you work across Java and TypeScript:

- better symbol navigation
- better diagnostics
- better refactoring awareness

If you modernize many repos, LSP is often a better investment than custom skills.

### 5. Agents

Use custom agents only when you have a repeatable workflow that is more than "good coding guidance".

Examples of agent-worthy tasks:

- inventory a server-rendered UI and propose REST resources
- scaffold a feature migration slice
- review a backend/frontend contract for drift
- generate an ADR for a migration decision

Agents become useful when you want repeatable execution behavior, not just better coding suggestions.

If your process is still changing, keep it in instructions first.

### 6. Skills

Use skills when you want a guided workflow or a specialized task pattern.

Examples:

- documentation co-authoring
- test generation
- deck or document generation

Skills are usually not the first thing to create for Java modernization programs. They help more once the delivery workflow is mature.

## What I would standardize across many Java repos

If you have many services and applications, I would create these durable Copilot assets:

### Global defaults

In `~/.copilot/copilot-instructions.md`:

- prefer incremental strangler migrations over rewrites
- REST contracts use DTOs, not entities
- standardize on RFC 7807 errors
- require OpenAPI for externally consumed APIs
- prefer feature-based Next.js frontend organization
- use `TanStack Query`, `React Hook Form`, and `Zod` by default

### Per-repo defaults

In `.github/copilot-instructions.md`:

- build and test commands
- deployment/runtime facts
- package and module structure
- repository-specific constraints

### Path-specific files

In `.github/instructions/`:

- backend instructions
- frontend instructions
- API contract instructions
- testing instructions

This gives you a portable baseline with low maintenance cost.

## What not to overinvest in first

Do not start with a large custom skill or agent library if:

- the migration approach is still evolving
- teams do not yet agree on API and frontend conventions
- repositories still differ a lot in architecture

In that phase, instructions are enough.

## Practical recommendation

If you want one reusable strategy for many Java applications, use this:

1. create a strong global `~/.copilot/copilot-instructions.md`
2. create a repo-level `.github/copilot-instructions.md`
3. add path-specific instruction files under `.github/instructions/`
4. add `.github/lsp.json` if the repo mixes Java and TypeScript
5. add agents only for mature repeated workflows
6. use skills only when you need guided specialist behavior

That is the simplest setup that scales well.
