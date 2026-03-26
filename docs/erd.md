# Spring PetClinic — Entity Relationship Diagram

This document describes the full domain model of the Spring PetClinic application,
derived from the JPA entity classes and the SQL schema files.

## Inheritance Hierarchy (JPA `@MappedSuperclass`)

| Abstract Base    | Fields                    | Concrete Entities that extend it |
|------------------|---------------------------|-----------------------------------|
| `BaseEntity`     | `id` (Integer, PK)        | All entities (transitively)       |
| `NamedEntity`    | `id`, `name`              | `PetType`, `Specialty`, `Pet`     |
| `Person`         | `id`, `firstName`, `lastName` | `Owner`, `Vet`               |

> `@MappedSuperclass` classes are **not** mapped to their own table — their columns are
> inlined into each concrete entity's table.

---

## Full ERD

```mermaid
erDiagram

    %% ── owners ─────────────────────────────────────────────────
    owners {
        INTEGER id PK "AUTO_INCREMENT"
        VARCHAR_30 first_name
        VARCHAR_30 last_name
        VARCHAR_255 address
        VARCHAR_80  city
        VARCHAR_20  telephone
    }

    %% ── pets ────────────────────────────────────────────────────
    pets {
        INTEGER  id         PK "AUTO_INCREMENT"
        VARCHAR_30 name
        DATE     birth_date
        INTEGER  type_id    FK "→ types.id"
        INTEGER  owner_id   FK "→ owners.id"
    }

    %% ── types (pet types) ───────────────────────────────────────
    types {
        INTEGER    id   PK "AUTO_INCREMENT"
        VARCHAR_80 name
    }

    %% ── visits ──────────────────────────────────────────────────
    visits {
        INTEGER    id          PK "AUTO_INCREMENT"
        INTEGER    pet_id      FK "→ pets.id"
        DATE       visit_date
        VARCHAR_255 description
    }

    %% ── vets ────────────────────────────────────────────────────
    vets {
        INTEGER    id         PK "AUTO_INCREMENT"
        VARCHAR_30 first_name
        VARCHAR_30 last_name
    }

    %% ── specialties ─────────────────────────────────────────────
    specialties {
        INTEGER    id   PK "AUTO_INCREMENT"
        VARCHAR_80 name
    }

    %% ── vet_specialties (join table) ────────────────────────────
    vet_specialties {
        INTEGER vet_id       FK "→ vets.id"
        INTEGER specialty_id FK "→ specialties.id"
    }

    %% ── Relationships ───────────────────────────────────────────

    %% One Owner has zero-or-many Pets
    owners        ||--o{ pets           : "owns"

    %% Many Pets have exactly one PetType
    types         ||--o{ pets           : "classifies"

    %% One Pet has zero-or-many Visits
    pets          ||--o{ visits         : "has"

    %% Many-to-many Vets ↔ Specialties (resolved via join table)
    vets          ||--o{ vet_specialties : "has"
    specialties   ||--o{ vet_specialties : "assigned to"
```

---

## Relationship Summary

| Relationship | Cardinality | Notes |
|---|---|---|
| Owner → Pet | One-to-Many | `pets.owner_id` FK; cascade ALL, fetch EAGER |
| Pet → PetType | Many-to-One | `pets.type_id` FK; lookup/reference data |
| Pet → Visit | One-to-Many | `visits.pet_id` FK; cascade ALL, fetch EAGER, ordered by `date ASC` |
| Vet ↔ Specialty | Many-to-Many | Join table `vet_specialties`; fetch EAGER |

---

## Java Class → Database Table Mapping

| Java Class | DB Table | Extends |
|---|---|---|
| `Owner` | `owners` | `Person` → `BaseEntity` |
| `Pet` | `pets` | `NamedEntity` → `BaseEntity` |
| `PetType` | `types` | `NamedEntity` → `BaseEntity` |
| `Visit` | `visits` | `BaseEntity` |
| `Vet` | `vets` | `Person` → `BaseEntity` |
| `Specialty` | `specialties` | `NamedEntity` → `BaseEntity` |
| *(join table)* | `vet_specialties` | — |

---

## Notes

- **`BaseEntity`** (`@MappedSuperclass`) contributes the `id` (auto-generated primary key) to every entity.
- **`NamedEntity`** (`@MappedSuperclass`) adds a `name` field on top of `BaseEntity`.
- **`Person`** (`@MappedSuperclass`) adds `firstName` / `lastName` on top of `BaseEntity`.
- `Owner` and `Vet` both extend `Person`; they are **separate, unrelated** tables (no table-per-hierarchy).
- The `vet_specialties` join table has no corresponding Java entity class — it is managed transparently by JPA via `@JoinTable` on `Vet.specialties`.
- Pet names in the `owners` pets list are ordered alphabetically (`@OrderBy("name")`); visits are ordered by date ascending.
