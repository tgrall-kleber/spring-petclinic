# Modernization Blueprint

This document describes a generic approach for moving a Java application from a server-rendered UI to a modern frontend with Next.js and `shadcn/ui`.

## Goals

The modernization should produce:

- a Java backend focused on domain logic and REST APIs
- a frontend that owns rendering and interaction
- explicit API contracts instead of implicit server-side view models
- an incremental migration path that does not require a full rewrite on day one

## Core migration principles

### 1. Split by responsibilities, not by framework

The target state has three clear layers:

- **Domain layer**: business rules, persistence, transactions, validation, and integrations
- **API contract layer**: versioned REST endpoints, DTOs, pagination, error models, auth boundaries
- **Frontend application layer**: routes, data fetching, forms, layout, states, and UI components

Do not let persistence entities become the API contract, and do not let the frontend discover the backend shape by accident.

### 2. Prefer incremental replacement over big-bang rewrite

The safest path is:

1. add REST endpoints
2. migrate read flows first
3. migrate write flows next
4. replace old pages one feature at a time
5. retire the server-rendered UI only after parity

### 3. Make the API explicit and durable

The API is the seam between old and new. Treat it as a product:

- version it, for example `/api/v1`
- document it with OpenAPI
- standardize errors
- keep payloads stable
- introduce DTOs or resource models

### 4. Keep business rules in Java

The frontend should own presentation and interaction, but the source of truth for domain rules should remain on the backend.

The frontend may mirror some validation for UX, but the backend must still enforce it.

## Backend primitives to introduce

### Versioned API routes

Define resource-oriented routes such as:

- `GET /api/v1/customers`
- `GET /api/v1/customers/{id}`
- `POST /api/v1/customers`
- `PUT /api/v1/customers/{id}`
- `DELETE /api/v1/customers/{id}`

Add resource-specific actions only when CRUD is not expressive enough.

### DTOs or resource models

Expose DTOs, not JPA entities.

Why:

- avoids leaking persistence structure
- avoids lazy-loading and serialization surprises
- lets you shape list and detail responses differently
- gives you freedom to evolve the backend

At minimum, introduce:

- list DTOs
- detail DTOs
- create request DTOs
- update request DTOs

### Mapping layer

Introduce a mapper layer between domain and API.

This can be:

- handwritten mappers for small systems
- MapStruct for larger systems

The main point is separation, not tooling.

### Standard error model

Use a consistent error shape for all API failures.

A good default is **RFC 7807 Problem Details**. It gives you a stable structure for:

- validation errors
- not found errors
- conflict errors
- authorization failures
- unexpected errors

### Pagination, filtering, and sorting primitives

Define these once and reuse them consistently:

- `page`
- `size`
- `sort`
- filter parameters relevant to each resource

Also standardize the response metadata, for example:

- current page
- page size
- total items
- total pages

### Validation boundary

Validation should exist in two places:

- backend validation for correctness and safety
- frontend validation for fast user feedback

The backend remains the source of truth.

For writes, return field-level validation details in a structured format.

### OpenAPI as the contract

Generate or maintain an OpenAPI definition for your REST surface.

This becomes useful for:

- backend consistency
- frontend type generation
- integration testing
- documentation
- future clients beyond the web app

### Authentication and session strategy

Decide early whether the frontend will use:

- cookie-based session auth
- token-based auth
- a BFF pattern

Do not leave auth implicit if the target architecture will split frontend and backend across runtimes.

### Observability primitives

As the system splits, add clear observability boundaries:

- request correlation
- structured logs
- API metrics
- frontend error tracking

## Frontend primitives to introduce

### Next.js application shell

Use the current Next.js architecture:

- App Router
- route-based layouts
- server/client component boundaries used intentionally

Avoid building a generic SPA shell first and discovering the app structure later.

### Design system and UI primitives

Use `shadcn/ui` as the composable base layer, not as the full product design.

Create reusable primitives for:

- page layout
- section headers
- forms
- tables
- detail views
- dialogs
- toasts
- empty states
- loading states
- error states

Treat these as your application design system.

### Data access layer

Do not scatter raw `fetch()` calls everywhere.

Create a typed API client layer and a query/mutation layer on top of it.

Common stack:

- typed API client
- `TanStack Query` for server state
- cache keys by feature and resource

### Form primitives

A solid default is:

- `React Hook Form`
- `Zod`

This combination gives you:

- client-side validation
- strong field modeling
- a clean bridge to backend errors

### Feature modules

Organize the frontend by feature, not by technical bucket.

A good pattern is:

- `app/`
- `features/customers/`
- `features/orders/`
- `components/ui/`
- `lib/api/`

### Internationalization

If the old app already has i18n, decide which layer owns it in the future:

- frontend-owned translation bundles
- backend-served translation payloads
- hybrid model

For most Next.js applications, frontend-owned i18n is simpler long term.

## BFF versus direct REST

You do not always need a Backend for Frontend.

### Direct REST is enough when

- the frontend mostly mirrors domain resources
- auth is straightforward
- there is only one main frontend
- the API contract is already clean

### A BFF is useful when

- one screen needs heavy aggregation from many services
- the frontend needs a shape very different from the domain API
- auth or session orchestration becomes complex
- multiple clients need different compositions

Default recommendation:

- start with direct REST
- add a BFF later only when the need is real

## Migration waves

### Wave 1: inventory and contract extraction

- inventory server-rendered pages
- map each page to the domain capabilities it uses
- define the REST resources and DTOs
- define error and pagination models

### Wave 2: read APIs

- expose read endpoints first
- build the new frontend for list and detail pages
- verify the API contract is sufficient before tackling writes

### Wave 3: write APIs

- add create and update flows
- standardize validation errors
- connect forms in the new frontend

### Wave 4: cutover by feature

- route one feature area to the new frontend
- keep old pages for everything else
- repeat until the old UI becomes small enough to retire

### Wave 5: retirement and cleanup

- remove old view templates
- remove obsolete controllers
- simplify the backend to API-only concerns

## Recommended outputs of the modernization

By the time the migration is mature, the repository or platform should have:

- a documented target architecture
- REST API conventions
- OpenAPI definitions
- typed frontend API consumption
- a shared UI primitive layer
- a staged migration map by business capability

## Common mistakes to avoid

- exposing JPA entities directly
- rewriting everything before the API is stable
- mixing old view models with new API models
- skipping error model standardization
- leaving auth decisions until late
- letting every team invent different frontend or API patterns

## Default recommendation

If you need a generic default that works in many Java applications, use this:

- Java backend remains the domain authority
- REST API at `/api/v1`
- DTOs plus mapper layer
- RFC 7807 Problem Details
- OpenAPI contract
- Next.js App Router
- `shadcn/ui` for UI primitives
- `TanStack Query` for server state
- `React Hook Form` plus `Zod` for forms
- feature-by-feature strangler migration
