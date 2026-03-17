---
description: 'Guidelines for building Spring Boot applications, tailored in this repository to preserve the existing Petclinic architecture and configuration style'
applyTo: '**/*.java'
---

# Spring Boot Development

## General Instructions

- Make only high confidence suggestions when reviewing code changes.
- Write code with good maintainability practices, including comments on why certain design decisions were made.
- Handle edge cases and write clear exception handling.
- For libraries or external dependencies, mention their usage and purpose in comments.

## Spring Boot Instructions

### Dependency Injection

- Use constructor injection for all required dependencies.
- Declare dependency fields as `private final`.

### Configuration

- In this repository, keep externalized configuration in `.properties` files (`application.properties`, `application-mysql.properties`, `application-postgres.properties`) unless there is a deliberate migration plan.
- Environment Profiles: Use Spring profiles for different environments (dev, test, prod)
- Configuration Properties: Use @ConfigurationProperties for type-safe configuration binding
- Secrets Management: Externalize secrets using environment variables or secret management systems

### Code Organization

- Package Structure: Organize by feature/domain rather than by layer
- Separation of Concerns: Keep controllers thin and repositories focused. In this repository there is no default service layer in `src/main/java`; preserve direct controller-to-repository flows unless a broader refactor explicitly introduces a new abstraction.
- Utility Classes: Make utility classes final with private constructors

### Service Layer

- This repository does not currently use a separate service layer in `src/main/java`.
- Do not introduce `@Service` classes by default when extending existing owner, vet, or system flows.
- If a change genuinely warrants a service layer, keep it narrow, constructor-injected, and consistent with the domain-package organization.

### Logging

- Use SLF4J for all logging (`private static final Logger logger = LoggerFactory.getLogger(MyClass.class);`).
- Do not use concrete implementations (Logback, Log4j2) or `System.out.println()` directly.
- Use parameterized logging: `logger.info("User {} logged in", userId);`.

### Security & Input Handling

- Use parameterized queries | Always use Spring Data JPA or `NamedParameterJdbcTemplate` to prevent SQL injection.
- Validate request bodies and parameters using JSR-380 (`@NotNull`, `@Size`, etc.) annotations and `BindingResult`

## Build and Verification

- After adding or modifying code, verify the project continues to build successfully.
- If the project uses Maven, prefer the wrapper and run `./mvnw verify` (or a narrower wrapper command for targeted work).
- If the project uses Gradle, run `./gradlew build` (or `gradlew.bat build` on Windows).
- Ensure all tests pass as part of the build.

## Useful Commands

| Gradle Command            | Maven Command                     | Description                                   |
|:--------------------------|:----------------------------------|:----------------------------------------------|
| `./gradlew bootRun`       |`./mvnw spring-boot:run`           | Run the application.                          |
| `./gradlew build`         |`./mvnw package`                   | Build the application.                        |
| `./gradlew test`          |`./mvnw test`                      | Run tests.                                    |
| `./gradlew bootJar`       |`./mvnw spring-boot:repackage`     | Package the application as a JAR.             |
| `./gradlew bootBuildImage`|`./mvnw spring-boot:build-image`   | Package the application as a container image. |
