/**
 * Spring PetClinic — Startup Event Denmark
 * Generates a PPTX presentation using PptxGenJS
 */
const pptxgen = require("/Users/tgrall/.nvm/versions/node/v20.19.0/lib/node_modules/pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Spring PetClinic";
pres.title = "Spring PetClinic — Startup Event Denmark";

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  navy:     "1B2E4B",
  teal:     "028090",
  tealLight:"02C39A",
  white:    "FFFFFF",
  offWhite: "F0F7F9",
  darkText: "1E293B",
  mutedText:"64748B",
  accent:   "F96167",   // coral accent for highlights
  cardBg:   "FFFFFF",
  slate:    "334155",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const makeShadow = () => ({
  type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.10
});

function addHeader(slide, title) {
  // Top teal bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.55,
    fill: { color: C.navy }, line: { color: C.navy }
  });
  // Teal accent left strip
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.22, h: 0.55,
    fill: { color: C.teal }, line: { color: C.teal }
  });
  slide.addText(title, {
    x: 0.38, y: 0, w: 9.4, h: 0.55,
    fontSize: 18, bold: true, color: C.white, valign: "middle", margin: 0
  });
}

function addCard(slide, x, y, w, h, title, body, titleColor) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.cardBg },
    line: { color: "E2E8F0", width: 1 },
    shadow: makeShadow()
  });
  // Left accent
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.07, h,
    fill: { color: titleColor || C.teal }, line: { color: titleColor || C.teal }
  });
  slide.addText(title, {
    x: x + 0.15, y: y + 0.08, w: w - 0.2, h: 0.32,
    fontSize: 12, bold: true, color: titleColor || C.teal, margin: 0
  });
  slide.addText(body, {
    x: x + 0.15, y: y + 0.42, w: w - 0.2, h: h - 0.52,
    fontSize: 10.5, color: C.darkText, margin: 0, wrap: true
  });
}

function addScreenMock(slide, x, y, w, h, label, rows) {
  // Browser chrome
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.cardBg }, line: { color: "CBD5E1", width: 1 },
    shadow: makeShadow()
  });
  // Address bar strip
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.28,
    fill: { color: "F1F5F9" }, line: { color: "E2E8F0", width: 1 }
  });
  slide.addShape(pres.shapes.OVAL, { x: x + 0.08, y: y + 0.07, w: 0.10, h: 0.10, fill: { color: "F96167" }, line: { color: "F96167" } });
  slide.addShape(pres.shapes.OVAL, { x: x + 0.22, y: y + 0.07, w: 0.10, h: 0.10, fill: { color: "FEBC2E" }, line: { color: "FEBC2E" } });
  slide.addShape(pres.shapes.OVAL, { x: x + 0.36, y: y + 0.07, w: 0.10, h: 0.10, fill: { color: "28C840" }, line: { color: "28C840" } });
  slide.addText("localhost:8080/" + label, {
    x: x + 0.55, y: y + 0.05, w: w - 0.65, h: 0.17,
    fontSize: 8, color: C.mutedText, margin: 0
  });
  // Navbar
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y: y + 0.28, w, h: 0.32,
    fill: { color: C.navy }, line: { color: C.navy }
  });
  slide.addText("🐾  PetClinic", {
    x: x + 0.12, y: y + 0.28, w: 2.5, h: 0.32,
    fontSize: 9, bold: true, color: C.white, valign: "middle", margin: 0
  });
  // Content rows
  let ry = y + 0.65;
  (rows || []).forEach((row, i) => {
    if (i % 2 === 0) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.06, y: ry, w: w - 0.12, h: 0.28,
        fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 0.5 }
      });
    }
    slide.addText(row, {
      x: x + 0.14, y: ry + 0.04, w: w - 0.25, h: 0.20,
      fontSize: 8.5, color: C.darkText, margin: 0
    });
    ry += 0.29;
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 1 — TITLE
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Decorative teal block left
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.45, h: 5.625,
    fill: { color: C.teal }, line: { color: C.teal }
  });

  // Decorative shape bottom-right
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.5, y: 3.8, w: 2.5, h: 1.825,
    fill: { color: C.tealLight }, line: { color: C.tealLight }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.2, y: 2.8, w: 1.8, h: 2.825,
    fill: { color: C.teal }, line: { color: C.teal }
  });

  // Event badge
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 0.55, w: 2.8, h: 0.38,
    fill: { color: C.accent }, line: { color: C.accent }
  });
  s.addText("🇩🇰  STARTUP EVENT — DENMARK", {
    x: 0.8, y: 0.55, w: 2.8, h: 0.38,
    fontSize: 9.5, bold: true, color: C.white, align: "center", valign: "middle", margin: 0
  });

  s.addText("Spring PetClinic", {
    x: 0.8, y: 1.15, w: 7.5, h: 1.2,
    fontSize: 52, bold: true, color: C.white, margin: 0
  });
  s.addText("Building Modern Java Applications\nwith Spring Boot 4", {
    x: 0.8, y: 2.45, w: 6.8, h: 1.0,
    fontSize: 22, color: C.tealLight, margin: 0
  });
  s.addText("A reference implementation showcasing\nSpring Boot · Spring MVC · Spring Data JPA · Thymeleaf", {
    x: 0.8, y: 3.55, w: 6.8, h: 0.8,
    fontSize: 13, color: "94A3B8", margin: 0
  });

  s.addText("spring-petclinic.github.io", {
    x: 0.8, y: 4.7, w: 4, h: 0.35,
    fontSize: 11, color: C.teal, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 2 — WHAT IS PETCLINIC?
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addHeader(s, "What is Spring PetClinic?");

  s.addText("The gold standard for learning Spring Boot", {
    x: 0.5, y: 0.75, w: 9, h: 0.55,
    fontSize: 22, bold: true, color: C.navy, margin: 0
  });
  s.addText("A fully functional veterinary clinic management application used worldwide to demonstrate\nSpring Boot best practices, modern Java architecture, and cloud-native deployment.", {
    x: 0.5, y: 1.35, w: 8.8, h: 0.7,
    fontSize: 13, color: C.darkText, margin: 0
  });

  const highlights = [
    { icon: "🏆", title: "Reference Implementation", body: "Maintained by the Spring team as the canonical Spring Boot demo application." },
    { icon: "📚", title: "Learning Resource", body: "Thousands of developers learn Spring Boot patterns by studying this codebase." },
    { icon: "🌐", title: "Open Source Community", body: "Multiple forks: Angular, Vue, React, reactive, Kotlin — all using PetClinic as base." },
    { icon: "☁️", title: "Cloud-Native Ready", body: "Ships with Kubernetes manifests, Docker Compose, and container image building support." },
  ];

  const cols = [0.35, 5.15];
  highlights.forEach((h, i) => {
    const col = cols[i % 2];
    const row = i < 2 ? 2.2 : 3.5;
    const cardW = 4.5;
    const cardH = 1.05;
    s.addShape(pres.shapes.RECTANGLE, {
      x: col, y: row, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: "E2E8F0", width: 1 },
      shadow: makeShadow()
    });
    s.addText(h.icon, { x: col + 0.15, y: row + 0.18, w: 0.55, h: 0.55, fontSize: 22, margin: 0 });
    s.addText(h.title, { x: col + 0.78, y: row + 0.12, w: cardW - 0.9, h: 0.28, fontSize: 12, bold: true, color: C.navy, margin: 0 });
    s.addText(h.body, { x: col + 0.78, y: row + 0.42, w: cardW - 0.9, h: 0.52, fontSize: 10.5, color: C.darkText, margin: 0, wrap: true });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 3 — TECH STACK
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addHeader(s, "Technology Stack");

  const items = [
    { icon: "🍃", label: "Spring Boot 4.0.3",  desc: "Latest major release — faster startup, modular" },
    { icon: "☕", label: "Java 17+",            desc: "LTS release with records, sealed classes" },
    { icon: "🗄️", label: "Spring Data JPA",    desc: "Repository pattern over JPA / Hibernate" },
    { icon: "🌐", label: "Spring MVC + Thymeleaf", desc: "Server-side rendering, natural HTML templates" },
    { icon: "💾", label: "H2 · MySQL · PostgreSQL", desc: "Profile-based database switching" },
    { icon: "⚡", label: "Caffeine Cache",       desc: "In-memory JCache for vet data" },
    { icon: "🐳", label: "Docker + Kubernetes", desc: "docker-compose.yml + k8s/ manifests" },
    { icon: "🧪", label: "Spring Boot Test",    desc: "@WebMvcTest · @DataJpaTest · Testcontainers" },
    { icon: "🎨", label: "Bootstrap 5.3",       desc: "Responsive UI, Font Awesome icons" },
  ];

  const cols3 = [0.35, 3.7, 7.05];
  items.forEach((item, i) => {
    const col = cols3[i % 3];
    const row = 0.75 + Math.floor(i / 3) * 1.48;
    const cw = 2.95, ch = 1.28;
    s.addShape(pres.shapes.RECTANGLE, {
      x: col, y: row, w: cw, h: ch,
      fill: { color: C.white }, line: { color: "E2E8F0", width: 1 }, shadow: makeShadow()
    });
    // Top color band
    s.addShape(pres.shapes.RECTANGLE, {
      x: col, y: row, w: cw, h: 0.08,
      fill: { color: C.teal }, line: { color: C.teal }
    });
    s.addText(item.icon, { x: col + 0.15, y: row + 0.15, w: 0.45, h: 0.45, fontSize: 18, margin: 0 });
    s.addText(item.label, { x: col + 0.65, y: row + 0.15, w: cw - 0.75, h: 0.35, fontSize: 10.5, bold: true, color: C.navy, margin: 0, wrap: true });
    s.addText(item.desc, { x: col + 0.18, y: row + 0.65, w: cw - 0.3, h: 0.52, fontSize: 9.5, color: C.mutedText, margin: 0, wrap: true });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 4 — FEATURE: OWNER MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addHeader(s, "Feature: Owner Management");

  s.addText("Register and manage pet owners with full CRUD operations", {
    x: 0.4, y: 0.65, w: 9, h: 0.4,
    fontSize: 14, color: C.mutedText, margin: 0
  });

  // Mock screen
  addScreenMock(s, 0.35, 1.1, 5.2, 4.2, "owners", [
    "🔍  Find Owners by Last Name",
    "────────────────────────────────",
    "👤  George Franklin  |  110 W. Liberty St  |  Madison",
    "👤  Betty Davis      |  638 Cardinal Ave   |  Sun Prairie",
    "👤  Eduardo Rodriquez |  2693 Commerce St  |  McFarland",
    "👤  Harold Davis     |  563 Friendly St    |  Windsor",
    "  [Add Owner]  [Next Page >]",
  ]);

  // Feature bullets right side
  const bullets = [
    { t: "Search by name", d: "Filter owners by last name with paginated results" },
    { t: "Full profile", d: "Address, city, telephone; linked pets & visits" },
    { t: "Add / Edit owners", d: "Form validation with JSR-380 constraints" },
    { t: "Pet overview", d: "See all pets and upcoming visits from owner page" },
  ];
  bullets.forEach((b, i) => {
    const by = 1.1 + i * 1.0;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.72, y: by, w: 3.95, h: 0.85,
      fill: { color: C.white }, line: { color: "E2E8F0" }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.72, y: by, w: 0.07, h: 0.85, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText(b.t, { x: 5.88, y: by + 0.08, w: 3.7, h: 0.25, fontSize: 11.5, bold: true, color: C.navy, margin: 0 });
    s.addText(b.d, { x: 5.88, y: by + 0.38, w: 3.7, h: 0.35, fontSize: 10, color: C.darkText, margin: 0 });
  });

  s.addText("Route: GET /owners  ·  GET /owners/{id}  ·  POST /owners/new", {
    x: 0.35, y: 5.3, w: 9.3, h: 0.22,
    fontSize: 9, color: C.mutedText, margin: 0, italic: true
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 5 — FEATURE: PET MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addHeader(s, "Feature: Pet Management");

  s.addText("Add and manage pets with type classification and birth dates", {
    x: 0.4, y: 0.65, w: 9, h: 0.4,
    fontSize: 14, color: C.mutedText, margin: 0
  });

  addScreenMock(s, 0.35, 1.1, 5.2, 4.2, "owners/1/pets/new", [
    "Add Pet for George Franklin",
    "──────────────────────────",
    "  Name       [ Leo            ]",
    "  Birth Date [ 2020-09-07     ]",
    "  Type       [ Cat         ▼ ]",
    "                               ",
    "     [Add Pet]   [Cancel]",
  ]);

  const bullets = [
    { t: "Multiple pet types", d: "Cat, dog, bird, hamster, lizard, snake — extensible reference data" },
    { t: "Birth date tracking", d: "LocalDate with automatic age calculation" },
    { t: "Owner association", d: "Each pet is linked to exactly one owner" },
    { t: "Visit history", d: "Full visit log accessible from pet profile" },
  ];
  bullets.forEach((b, i) => {
    const by = 1.1 + i * 1.0;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.72, y: by, w: 3.95, h: 0.85,
      fill: { color: C.white }, line: { color: "E2E8F0" }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.72, y: by, w: 0.07, h: 0.85, fill: { color: C.tealLight }, line: { color: C.tealLight } });
    s.addText(b.t, { x: 5.88, y: by + 0.08, w: 3.7, h: 0.25, fontSize: 11.5, bold: true, color: C.navy, margin: 0 });
    s.addText(b.d, { x: 5.88, y: by + 0.38, w: 3.7, h: 0.35, fontSize: 10, color: C.darkText, margin: 0 });
  });

  s.addText("Route: GET /owners/{id}/pets/new  ·  POST /owners/{id}/pets/new  ·  GET /owners/{id}/pets/{petId}/edit", {
    x: 0.35, y: 5.3, w: 9.3, h: 0.22,
    fontSize: 9, color: C.mutedText, margin: 0, italic: true
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 6 — FEATURE: VISIT SCHEDULING
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addHeader(s, "Feature: Visit Scheduling");

  s.addText("Record and track veterinary visits for every pet", {
    x: 0.4, y: 0.65, w: 9, h: 0.4,
    fontSize: 14, color: C.mutedText, margin: 0
  });

  addScreenMock(s, 0.35, 1.1, 5.2, 4.2, "owners/1/pets/1/visits/new", [
    "New Visit — Leo (Cat)",
    "─────────────────────────────",
    "  Date        [ 2025-03-26   ]",
    "  Description [ Annual check ]",
    "                              ",
    "  Previous Visits:",
    "  2024-01-15  Neutered        ",
    "  2023-06-01  Vaccination      ",
    "     [Add Visit]   [Cancel]",
  ]);

  const bullets = [
    { t: "Date defaults to today", d: "LocalDate auto-populated, fully editable" },
    { t: "Free-text description", d: "Open notes field for any clinical summary" },
    { t: "Visit history inline", d: "Previous visits shown on the same form page" },
    { t: "Linked to owner view", d: "All visits visible from the owner detail page" },
  ];
  bullets.forEach((b, i) => {
    const by = 1.1 + i * 1.0;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.72, y: by, w: 3.95, h: 0.85,
      fill: { color: C.white }, line: { color: "E2E8F0" }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.72, y: by, w: 0.07, h: 0.85, fill: { color: C.accent }, line: { color: C.accent } });
    s.addText(b.t, { x: 5.88, y: by + 0.08, w: 3.7, h: 0.25, fontSize: 11.5, bold: true, color: C.navy, margin: 0 });
    s.addText(b.d, { x: 5.88, y: by + 0.38, w: 3.7, h: 0.35, fontSize: 10, color: C.darkText, margin: 0 });
  });

  s.addText("Route: GET /owners/{id}/pets/{petId}/visits/new  ·  POST /owners/{id}/pets/{petId}/visits/new", {
    x: 0.35, y: 5.3, w: 9.3, h: 0.22,
    fontSize: 9, color: C.mutedText, margin: 0, italic: true
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 7 — FEATURE: VETERINARIAN DIRECTORY
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addHeader(s, "Feature: Veterinarian Directory");

  s.addText("Browse vets and their specialties — available as HTML and REST JSON", {
    x: 0.4, y: 0.65, w: 9, h: 0.4,
    fontSize: 14, color: C.mutedText, margin: 0
  });

  // Left: HTML view mock
  addScreenMock(s, 0.35, 1.1, 4.6, 4.2, "vets.html", [
    "  Our Veterinarians",
    "──────────────────────────────",
    "  Dr. James Carter        None",
    "  Dr. Helen Leary     Radiology",
    "  Dr. Linda Douglas    Dentistry",
    "  Dr. Rafael Ortega     Surgery",
    "  Dr. Henry Stevens       None",
    "  Dr. Sharon Jenkins   Radiology",
    "  [< Prev]  Page 1 of 2  [Next >]",
  ]);

  // Right: JSON endpoint mock
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.1, w: 4.5, h: 4.2,
    fill: { color: "1E293B" }, line: { color: "334155" }, shadow: makeShadow()
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.1, w: 4.5, h: 0.28, fill: { color: "334155" }, line: { color: "334155" } });
  s.addText("GET /vets  →  application/json", { x: 5.22, y: 1.12, w: 4.35, h: 0.22, fontSize: 8.5, color: "94A3B8", margin: 0 });
  const jsonLines = [
    '{ "vetList": [',
    '  { "id": 1,',
    '    "firstName": "James",',
    '    "lastName": "Carter",',
    '    "specialties": [] },',
    '  { "id": 2,',
    '    "firstName": "Helen",',
    '    "specialties": [',
    '      { "name": "radiology" }',
    '    ] }',
    '] }',
  ];
  jsonLines.forEach((line, i) => {
    s.addText(line, {
      x: 5.22, y: 1.46 + i * 0.28, w: 4.3, h: 0.24,
      fontSize: 8.5, color: "7DD3FC", fontFace: "Consolas", margin: 0
    });
  });

  s.addText("Dual endpoint — same data served as HTML page or REST API  ·  Vet data cached with Caffeine", {
    x: 0.35, y: 5.3, w: 9.3, h: 0.22,
    fontSize: 9, color: C.mutedText, margin: 0, italic: true
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 8 — DOMAIN MODEL
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addHeader(s, "Domain Model");

  s.addText("Clean domain-driven design with 6 entities and base class hierarchy", {
    x: 0.4, y: 0.65, w: 9, h: 0.38, fontSize: 13, color: C.mutedText, margin: 0
  });

  const entities = [
    { name: "Owner",     fields: ["id", "firstName", "lastName", "address", "city", "telephone"],    color: C.navy,     x: 0.3, y: 1.1 },
    { name: "Pet",       fields: ["id", "name", "birthDate", "type: PetType"],                       color: C.teal,     x: 3.5, y: 1.1 },
    { name: "Visit",     fields: ["id", "date", "description"],                                      color: C.accent,   x: 6.7, y: 1.1 },
    { name: "Vet",       fields: ["id", "firstName", "lastName", "specialties[]"],                   color: "7C3AED",   x: 0.3, y: 3.35 },
    { name: "PetType",   fields: ["id", "name"],                                                     color: C.tealLight,x: 3.5, y: 3.35 },
    { name: "Specialty", fields: ["id", "name"],                                                     color: "0EA5E9",   x: 6.7, y: 3.35 },
  ];

  entities.forEach(e => {
    const cw = 2.9, ch = 1.95;
    s.addShape(pres.shapes.RECTANGLE, {
      x: e.x, y: e.y, w: cw, h: ch,
      fill: { color: C.white }, line: { color: "E2E8F0", width: 1 }, shadow: makeShadow()
    });
    // Header band
    s.addShape(pres.shapes.RECTANGLE, { x: e.x, y: e.y, w: cw, h: 0.36, fill: { color: e.color }, line: { color: e.color } });
    s.addText(e.name, { x: e.x + 0.12, y: e.y + 0.04, w: cw - 0.2, h: 0.28, fontSize: 12, bold: true, color: C.white, margin: 0 });
    e.fields.forEach((f, fi) => {
      s.addText("· " + f, { x: e.x + 0.14, y: e.y + 0.44 + fi * 0.27, w: cw - 0.2, h: 0.24, fontSize: 9.5, color: C.darkText, margin: 0, fontFace: "Consolas" });
    });
  });

  // Relationship annotations
  s.addText("Owner 1──* Pet  ·  Pet 1──* Visit  ·  Vet *──* Specialty  ·  Pet *──1 PetType", {
    x: 0.35, y: 5.27, w: 9.3, h: 0.25,
    fontSize: 10, color: C.teal, bold: true, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 9 — ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addHeader(s, "Architecture Overview");

  const layers = [
    { label: "Browser / REST Client",  color: "0EA5E9", y: 0.68, icon: "🌐" },
    { label: "Spring MVC Controllers", color: C.teal,   y: 1.52, icon: "🎮" },
    { label: "Domain Model + Formatters / Validators", color: C.navy, y: 2.36, icon: "🏗️" },
    { label: "Spring Data JPA Repositories", color: "7C3AED", y: 3.20, icon: "📦" },
    { label: "Database: H2 · MySQL · PostgreSQL", color: "334155", y: 4.04, icon: "💾" },
  ];

  layers.forEach((l, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.5, y: l.y, w: 5.5, h: 0.66,
      fill: { color: l.color }, line: { color: l.color }, shadow: makeShadow()
    });
    s.addText(l.icon + "  " + l.label, {
      x: 1.5, y: l.y, w: 5.5, h: 0.66,
      fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle", margin: 0
    });
    if (i < layers.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 3.9, y: l.y + 0.66, w: 0.7, h: 0.22,
        fill: { color: "E2E8F0" }, line: { color: "CBD5E1" }
      });
      s.addText("▼", { x: 3.9, y: l.y + 0.66, w: 0.7, h: 0.22, fontSize: 11, color: C.mutedText, align: "center", valign: "middle", margin: 0 });
    }
  });

  // Sidebar notes — 5 entries aligned to each of the 5 layers
  const notes = [
    "Thymeleaf templates\nfor server-side HTML",
    "Spring Boot Actuator\n/actuator/health",
    "JSR-380 validation\n+ PetFormatter",
    "Caffeine Cache\non Vet queries",
    "Profile-based DB\nswitching via ENV"
  ];
  const noteY = [0.68, 1.52, 2.36, 3.20, 4.04];
  notes.forEach((n, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 7.3, y: noteY[i], w: 2.35, h: 0.62,
      fill: { color: "FFF7ED" }, line: { color: "FED7AA", width: 1 }
    });
    s.addText(n, { x: 7.38, y: noteY[i] + 0.06, w: 2.2, h: 0.5, fontSize: 9, color: "92400E", margin: 0, align: "center" });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 10 — DEPLOYMENT
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addHeader(s, "Cloud-Native Deployment");

  s.addText("Run anywhere — from laptop to production Kubernetes cluster", {
    x: 0.4, y: 0.65, w: 9, h: 0.38, fontSize: 14, color: C.mutedText, margin: 0
  });

  const options = [
    {
      title: "🐳  Local Development",
      color: "0EA5E9",
      lines: ["./mvnw spring-boot:run", "H2 in-memory database", "DevTools hot-reload", "Access at localhost:8080"],
    },
    {
      title: "🐘  Docker Compose",
      color: C.teal,
      lines: ["docker compose up", "MySQL 9.6 + PetClinic", "Persistent volumes", "Ports: 8080 · 3306"],
    },
    {
      title: "☸️  Kubernetes",
      color: C.navy,
      lines: ["kubectl apply -f k8s/", "PostgreSQL 18 StatefulSet", "Service bindings secret", "Liveness + Readiness probes"],
    },
  ];

  options.forEach((opt, i) => {
    const cx = 0.35 + i * 3.22;
    const cw = 3.05, ch = 3.9;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.15, w: cw, h: ch,
      fill: { color: C.white }, line: { color: "E2E8F0" }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.15, w: cw, h: 0.52, fill: { color: opt.color }, line: { color: opt.color } });
    s.addText(opt.title, { x: cx + 0.12, y: 1.15, w: cw - 0.2, h: 0.52, fontSize: 12.5, bold: true, color: C.white, valign: "middle", margin: 0 });
    opt.lines.forEach((line, li) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx + 0.15, y: 1.82 + li * 0.7, w: cw - 0.3, h: 0.52,
        fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 0.5 }
      });
      s.addText(line, { x: cx + 0.25, y: 1.82 + li * 0.7, w: cw - 0.4, h: 0.52, fontSize: 10.5, color: C.darkText, fontFace: "Consolas", valign: "middle", margin: 0 });
    });
  });

  s.addText("Container image built with: ./mvnw spring-boot:build-image  ·  No Dockerfile needed!", {
    x: 0.35, y: 5.3, w: 9.3, h: 0.22, fontSize: 9, color: C.mutedText, margin: 0, italic: true
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 11 — TESTING
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addHeader(s, "Testing Strategy");

  s.addText("Comprehensive test pyramid — from unit slices to full integration", {
    x: 0.4, y: 0.65, w: 9, h: 0.38, fontSize: 14, color: C.mutedText, margin: 0
  });

  const tests = [
    { type: "@WebMvcTest",         color: "0EA5E9", desc: "Controller slice tests with MockMvc — verifies HTTP routes, form validation, model attributes. Example: OwnerControllerTests, VetControllerTests." },
    { type: "@DataJpaTest",        color: C.teal,   desc: "Repository persistence tests with in-memory H2 — verifies queries, pagination, and entity mappings. Example: ClinicServiceTests." },
    { type: "@SpringBootTest",     color: C.navy,   desc: "Full context integration tests at RANDOM_PORT. MySQL profile uses Testcontainers @ServiceConnection for real DB testing." },
    { type: "I18nPropertiesSyncTest", color: C.accent, desc: "Enforces i18n: all Thymeleaf templates must use message keys, all locale bundles must stay in sync (de, es, it, ko, pt, ru, sv, tr)." },
  ];

  tests.forEach((t, i) => {
    const ty = 1.12 + i * 1.05;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: ty, w: 9.3, h: 0.88, fill: { color: C.white }, line: { color: "E2E8F0" }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: ty, w: 0.08, h: 0.88, fill: { color: t.color }, line: { color: t.color } });
    s.addText(t.type, { x: 0.53, y: ty + 0.08, w: 2.2, h: 0.28, fontSize: 11.5, bold: true, color: t.color, fontFace: "Consolas", margin: 0 });
    s.addText(t.desc, { x: 0.53, y: ty + 0.42, w: 9.0, h: 0.36, fontSize: 10, color: C.darkText, margin: 0, wrap: true });
  });

  s.addText("Run all tests: ./mvnw test  ·  Run one class: ./mvnw test -Dtest=OwnerControllerTests", {
    x: 0.35, y: 5.3, w: 9.3, h: 0.22, fontSize: 9, color: C.mutedText, margin: 0, italic: true
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 12 — CLOSING
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.45, h: 5.625, fill: { color: C.teal }, line: { color: C.teal } });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 3.8, w: 2.5, h: 1.825, fill: { color: C.tealLight }, line: { color: C.tealLight } });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.2, y: 2.8, w: 1.8, h: 2.825, fill: { color: C.teal }, line: { color: C.teal } });

  s.addText("Get Started", { x: 0.8, y: 0.9, w: 7, h: 1.1, fontSize: 52, bold: true, color: C.white, margin: 0 });
  s.addText("Clone & run in 30 seconds", { x: 0.8, y: 2.1, w: 7, h: 0.5, fontSize: 20, color: C.tealLight, margin: 0 });

  const cmds = [
    "git clone https://github.com/spring-projects/spring-petclinic.git",
    "cd spring-petclinic",
    "./mvnw spring-boot:run",
    "open http://localhost:8080",
  ];
  cmds.forEach((cmd, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.75 + i * 0.42, w: 6.4, h: 0.36, fill: { color: "0F172A" }, line: { color: "334155" } });
    s.addText("$ " + cmd, { x: 0.95, y: 2.75 + i * 0.42, w: 6.2, h: 0.36, fontSize: 10, color: "7DD3FC", fontFace: "Consolas", valign: "middle", margin: 0 });
  });

  s.addText("🌐  spring-petclinic.github.io  ·  ⭐  github.com/spring-projects/spring-petclinic", {
    x: 0.8, y: 5.1, w: 7, h: 0.3, fontSize: 10.5, color: "94A3B8", margin: 0
  });
}

// ─── Write file ──────────────────────────────────────────────────────────────
const outPath = "/Users/tgrall/Demonstrations/tgrall-kleber/spring-petclinic/docs/spring-petclinic-denmark-startup.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("✅  Created:", outPath);
}).catch(err => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
