# Java UI Modernization Playbook

This folder documents a reusable approach for modernizing Java applications that currently render HTML on the server and need to move toward:

- a REST-first backend
- a modern frontend built with Next.js
- a reusable design system, such as `shadcn/ui`
- a durable Copilot setup that can be repeated across many repositories

The content in this folder is intentionally generic. It is meant to be reused across multiple Java services and applications, not only this repository.

## Documents

- [`modernization-blueprint.md`](./modernization-blueprint.md)  
  Target architecture, migration principles, backend and frontend primitives, and staged rollout guidance.

- [`copilot-files.md`](./copilot-files.md)  
  Which Copilot files are worth adding, which ones are optional, and how to think about instructions, agents, skills, and LSP.

- [`copilot-templates.md`](./copilot-templates.md)  
  Copy/paste starter templates for the most useful instruction files and a sample repository layout.

## Recommended order

If you want to apply this playbook to a repository, use this order:

1. Read the modernization blueprint and agree on the target architecture.
2. Add the Copilot files that make the approach repeatable.
3. Start the migration incrementally, usually feature by feature.

## Guiding idea

Do not treat this as a big-bang rewrite.

Use a strangler pattern:

- keep the existing UI working
- introduce stable API contracts
- build the new frontend in parallel
- switch traffic gradually once the new experience reaches parity
