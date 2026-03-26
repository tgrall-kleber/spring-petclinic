# Copilot Templates for Reuse Across Java Modernization Repositories

This document provides starter templates you can adapt across repositories.

## Suggested repository layout

```text
.github/
  copilot-instructions.md
  lsp.json
  instructions/
    backend-java.instructions.md
    frontend-next.instructions.md
    api-contract.instructions.md
    testing.instructions.md
migration/
  README.md
  modernization-blueprint.md
  copilot-files.md
  copilot-templates.md
frontend/
  ...
src/
  main/
  test/
```

## Template: user-level instructions

Suggested file: `~/.copilot/copilot-instructions.md`

```md
# Global modernization defaults

- Prefer incremental migration over big-bang rewrite.
- Keep domain rules on the Java backend.
- Do not expose JPA entities directly from REST endpoints.
- Prefer DTOs plus mappers and versioned routes such as `/api/v1`.
- Standardize API errors with RFC 7807 Problem Details.
- Prefer OpenAPI as the backend/frontend contract.
- For Next.js frontends, prefer App Router, feature-based structure, and reusable UI primitives.
- Default frontend stack: shadcn/ui, TanStack Query, React Hook Form, and Zod.
- For modernization work, migrate read flows before write flows.
- Preserve backward compatibility until the new frontend reaches feature parity.
```

## Template: repository-level instructions

Suggested file: `.github/copilot-instructions.md`

```md
# Repository Copilot Instructions

## Architecture

- This repository is being modernized from a server-rendered UI to REST plus Next.js.
- Keep the backend as the domain authority.
- Treat the REST API as a stable contract.

## Backend rules

- Add new external interactions under `/api/v1`.
- Use DTOs or resource models for API payloads.
- Keep entity-to-DTO mapping explicit.
- Standardize validation and error responses.

## Frontend rules

- Use Next.js App Router.
- Organize by feature, not by technical bucket.
- Reuse shadcn/ui primitives and shared app-level components.

## Delivery rules

- Prefer incremental migration slices.
- Do not remove the old UI until the new flow is proven.
- Update tests when contracts or behavior change.

## Validation

- Run repository-standard build and test commands before concluding work.
```

## Template: backend instruction file

Suggested file: `.github/instructions/backend-java.instructions.md`

```md
---
applyTo: "**/*.java"
description: "Java backend rules for REST-first modernization"
---

# Java backend modernization rules

- Prefer resource-oriented REST endpoints.
- Do not expose persistence entities directly from controllers.
- Use request and response DTOs.
- Keep validation on the backend as the source of truth.
- Use RFC 7807 Problem Details or an equivalent standard error model.
- Keep pagination, filtering, and sorting conventions consistent.
- Update or generate OpenAPI definitions when the API changes.
- Prefer additive, backward-compatible API evolution during migration.
```

## Template: frontend instruction file

Suggested file: `.github/instructions/frontend-next.instructions.md`

```md
---
applyTo: "frontend/**/*.{ts,tsx}"
description: "Next.js modernization rules"
---

# Next.js frontend modernization rules

- Use Next.js App Router.
- Organize code by feature.
- Use shadcn/ui as the UI primitive layer.
- Keep raw fetch logic out of page components.
- Prefer a typed API client plus TanStack Query.
- Prefer React Hook Form plus Zod for forms.
- Build clear loading, error, and empty states for each data flow.
- Keep server/client component boundaries intentional and minimal.
```

## Template: API contract instruction file

Suggested file: `.github/instructions/api-contract.instructions.md`

```md
---
applyTo: "**/openapi*.{yml,yaml,json}"
description: "API contract rules"
---

# API contract rules

- Keep routes versioned.
- Model list, detail, create, and update payloads explicitly.
- Standardize pagination fields.
- Standardize Problem Details error responses.
- Keep naming and field semantics consistent across resources.
- Prefer backward-compatible changes during migration.
```

## Template: testing instruction file

Suggested file: `.github/instructions/testing.instructions.md`

```md
---
applyTo: "**/*"
description: "Testing expectations during modernization"
---

# Testing expectations

- Keep old behavior working while introducing the new API and frontend.
- Add or update backend tests when the API changes.
- Add frontend tests for critical user flows.
- Validate contract assumptions with integration tests when possible.
- Prefer focused migration slices that can be verified independently.
```

## When to add agents

Add a custom agent only after you can clearly describe a repeated workflow such as:

- "inventory Thymeleaf or JSP pages and propose REST resources"
- "extract DTOs and Problem Details conventions"
- "review API/frontend contract drift"
- "generate migration ADRs"

If you cannot describe the workflow precisely, keep the guidance in instructions instead.

## When to add skills

Add a skill only when you want a guided process, not just better code suggestions.

Examples:

- migration documentation workflow
- reusable API review workflow
- architecture decision authoring workflow

## Final advice

Keep the first version small.

A good starting set is:

- one global instruction file
- one repo instruction file
- three to four path-specific instruction files
- optional LSP configuration

That is enough for most modernization programs.
