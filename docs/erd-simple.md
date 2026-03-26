# Spring PetClinic — Entity Relationship Diagram (Quick Reference)

A simplified view showing entity names and relationships only.
For full field details see [erd.md](./erd.md).

```mermaid
erDiagram

    owners        ||--o{ pets            : "owns"
    types         ||--o{ pets            : "classifies"
    pets          ||--o{ visits          : "has"
    vets          ||--o{ vet_specialties : "has"
    specialties   ||--o{ vet_specialties : "assigned to"
```

## Entities

| Entity | Description |
|---|---|
| `owners` | Pet owners — name, address, city, telephone |
| `pets` | Pets belonging to an owner — name, birth date, type |
| `types` | Pet type lookup (e.g. Cat, Dog, Hamster) |
| `visits` | Vet visit records for a pet — date, description |
| `vets` | Veterinarians — name |
| `specialties` | Vet specialty lookup (e.g. Dentistry, Surgery) |
| `vet_specialties` | Many-to-many join table between vets and specialties |
