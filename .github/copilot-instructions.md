# Copilot Instructions

## Build, test, and run

- Use Java 17. CI runs `./mvnw -B verify` for Maven and `./gradlew build` for Gradle.
- Run the app with `./mvnw spring-boot:run` or `./gradlew bootRun`.
- Run the full test suite with `./mvnw test` or `./gradlew test`.
- Run one test class with `./mvnw test -Dtest=OwnerControllerTests` or `./gradlew test --tests org.springframework.samples.petclinic.owner.OwnerControllerTests`.
- Run one test method with `./mvnw test -Dtest=OwnerControllerTests#showOwner` or `./gradlew test --tests org.springframework.samples.petclinic.owner.OwnerControllerTests.showOwner`.
- Maven quality checks are part of `./mvnw validate` and `./mvnw verify`; they include Spring Java Format validation and the no-http Checkstyle rules from `src/checkstyle/`.
- Gradle quality checks are part of `./gradlew check`; formatting and style tasks come from `io.spring.javaformat`, `checkstyle`, and `io.spring.nohttp`.
- SCSS compilation is Maven-only in this repo: after editing `src/main/scss/*.scss`, regenerate `src/main/resources/static/resources/css/petclinic.css` with `./mvnw package -P css`.

## Architecture

- This is a Spring Boot MVC application with Thymeleaf server-rendered views, Spring Data JPA persistence, Actuator enabled, and Caffeine-backed JCache support.
- `org.springframework.samples.petclinic.PetClinicApplication` is the entry point and imports `PetClinicRuntimeHints` for native/AOT resource and serialization hints.
- The backend is organized by domain package instead of by technical layer:
  - `model`: shared JPA base types such as `BaseEntity`, `NamedEntity`, and `Person`.
  - `owner`: the main clinic workflow for owners, pets, pet types, and visits; this package contains entities, repositories, validators/formatters, and MVC controllers.
  - `vet`: vet and specialty entities plus the `/vets` JSON endpoint and `/vets.html` Thymeleaf page.
  - `system`: cross-cutting web configuration such as locale switching, cache setup, welcome/error controllers, and other app-level behavior.
- There is no separate service layer in `src/main/java`; controllers typically work directly with repositories and domain entities. Keep that existing pattern unless you are explicitly introducing a new abstraction for a broader change.
- Templates live under `src/main/resources/templates/` and are grouped by feature (`owners/`, `pets/`, `vets/`, `fragments/`). Static assets live under `src/main/resources/static/`.
- Database initialization is SQL-driven, not Hibernate-DDL-driven. `application.properties` sets `spring.jpa.hibernate.ddl-auto=none` and points Spring SQL init at `db/${database}/schema.sql` and `db/${database}/data.sql`.
- The default runtime uses the in-memory H2 profile. `application-mysql.properties` and `application-postgres.properties` switch the `database` placeholder and datasource settings for persistent databases.
- `VetRepository` is the only cached repository path out of the box: `findAll()` and paged `findAll(Pageable)` are both `@Cacheable("vets")`, and `CacheConfiguration` creates that cache.

## Key repository conventions

- Keep new backend code in the existing domain packages (`owner`, `vet`, `system`, `model`) instead of introducing parallel package structures.
- When changing entities or persistence behavior, update the SQL scripts under `src/main/resources/db/<profile>/` as needed. Do not rely on Hibernate to create or evolve the schema.
- For web-layer tests, follow the existing slice-test pattern: `@WebMvcTest(...)` with `@MockitoBean` for repositories or collaborators, plus `MockMvc` assertions.
- For repository/persistence coverage, use `@DataJpaTest` like `ClinicServiceTests`.
- For end-to-end integration coverage, use `@SpringBootTest(webEnvironment = RANDOM_PORT)`:
  - MySQL integration tests activate the `mysql` profile and use Testcontainers with `@ServiceConnection`.
  - Postgres integration tests activate the `postgres` profile and rely on Spring Boot Docker Compose support.
- The integration test classes are also used as developer entry points (`main()` methods) for fast manual runs against H2, MySQL, or Postgres from the IDE. Preserve that dual-purpose pattern when editing them.
- Internationalization is enforced. `WebConfiguration` switches locales via `?lang=<code>`, messages are loaded from `messages/messages*.properties`, and `I18nPropertiesSyncTest` fails if templates contain hard-coded text or if translation bundles drift out of sync. Put new user-facing text behind message keys.
- The base bundle is `messages.properties`; `messages_en.properties` is treated as a fallback case by the sync test, so keep the base bundle authoritative for English text.
- Edit SCSS sources in `src/main/scss/`, not just the generated CSS, and regenerate the compiled stylesheet before finishing styling changes.
- Follow the repository formatting rules from `.editorconfig`: Java and most XML files use tabs with width 4, but `pom.xml` and `wro.xml` are the exception and use 2-space indentation. Gradle, HTML, SQL, and similar files use spaces.
- This workspace already includes repo-local Copilot tooling: `.vscode/mcp.json` registers `gh aw mcp-server`, and `.github/workflows/copilot-setup-steps.yml` installs the `gh-aw` extension for Copilot Agent workflows.
