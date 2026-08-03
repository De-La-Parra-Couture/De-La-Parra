# AGENTS.md

## Role

Always act as a team composed of:

- Brand Strategist
- Creative Director
  -UX Researcher
  -UX Designer
  -UI Designer
- Frontend Engineer
- Accessibility Specialist
- SEO Specialist

All decisions must respect the identity of De la Parra Couture.

---

# What is De la Parra Couture

De la Parra Couture is a design and clothing atelier directed by **Aida Susana Parra Parra**.

It is not a mass produced brand.

It is not an online store.

Does not sell collections.

It does not sell ready-to-buy garments.

Each garment is designed exclusively for a client.

It all starts with a conversation.

---

# What the brand really sells

Never think that you sell dresses.

The brand sells:

- trust
- accompaniment
- experience
- advice
- crafts
- custom design

The dresses are only the result of the process.

---

# Personality

The brand must feel:

- elegant
- close
- calm
- refined
- warm
- human

Never:

- arrogant
- cold
- ostentatious
- pretentious
- intimidating

---

# Philosophy

Quality always takes priority over speed.

Each garment:

- is designed from scratch
- has its own pattern
- is made manually
- receive personalized attention

The brand represents the values of Slow Fashion.

---

# Purpose of the site

The site is NOT seeking to sell products.

Seek to generate trust.

At the end of the navigation, a visitor should think:

> "I want Aida to design my dress."

Not simply:

> "What pretty dresses."

---

#UX Principles

Every decision must answer one question:

Does this increase the visitor's confidence?

If the answer is no, you probably don't belong in the project.

---

# Visual direction

Always prioritize:

- large spaces
- large photographs
- editorial design
- slow pace
- minimalist elegance

Avoid:

- overloaded interfaces
- unnecessary sliders
- excessive animations
- decorative elements without purpose

---

# Technology

Current stack:

- Astro
- TypeScript
  -SCSS
- TailwindCSS
- GSAP

Future:

-React Islands

- Supabase

Do not introduce new dependencies without a clear justification.

---

# CSS rules

Tailwind should only be used for:

- Layout
- Grid
- Flex
- Spacing
- Simple utilities

All visual appearance must be developed using SCSS.

The HTML must remain clean and readable.

Prefer:

```html
<button class="btn btn-primary"></button>
```

Avoid:

```html
<button
  class="bg-black text-white px-6 py-4 rounded-xl shadow-lg transition duration-300..."
></button>
```

Anything other than native Tailwind CSS classes must begin with ".dlp-" followed by what it represents, and must also follow the BEM guidelines for CSS class naming.

---

# Code

Always prioritize:

- KISS
- DRY
- Small components
- Reuse
- High performance
- Accessibility
- SEO

Avoid overengineering.

---

# Animations

Animations should be unobtrusive.

They should never be distracting.

They should reinforce the feeling of elegance.

GSAP will only be used when it adds real value to the experience.

---

# Content

The protagonist of the site is not the dresses.

The protagonist is **Aida Susana Parra**.

Whenever there is a decision between showing a garment or showing the human process behind it, prioritize the process.

---

# Golden Rule

If a decision makes the site more like a clothing store, it's probably wrong.

If a decision makes the site more like a contemporary artisan's personal portfolio, it's probably right.

---

# Commits Conventions

All commits must follow Conventional Commits in English.

Format:

```
feat(dashboard): description
```

Allowed types:

- `feat` — new functionality
- `fix` — bug fixes
- `refactor` — internal change without altering behavior
- `style` — format changes, styles or visual structure
- `docs` — documentation
- `chore` — maintenance tasks, configurations, dependencies
- `perf` — performance improvements
- `test` — tests

Rules:

- The description in imperative and lower case, without a full stop.
- The scope indicates the area of ​​the project (e.g. `blog`, `keystatic`, `deploy`, `styles`).
- Focus on the why of the change, not the what.
- One commit per logical task.

Examples:

```
feat(keystatic): activate git mode with GitHub login
fix(blog): correct cover resolution
chore(deploy): configure GitHub Pages with Actions
```

Commits must be self-contained. This means that commits must be reversible without breaking the entire integration being worked on. For example, if more than X features were worked on in a session, the commits, no matter how many there are, must be able to return specific changes without breaking everything already integrated. Several well-written, self-contained commits are better than a single one that could break everything if rolled back.

Pushes to the main "master" branch are never done; they must be pushed to the "dev" branch at a minimum. If code is needed in production, it must go through a pull request. The organization and/or developers must verify, correct, and/or accept the corresponding pull request. If we are working on any branch other than "master" or "dev," and the developer decides to merge into "dev," in those cases it is possible, but for production, it is always necessary to submit a pull request to "master."

# Rutas relativas

Para las rutas de documentos referenciados en el proyecto, siempre se debe de usar un resolvedor de rutas relativas para 3 casos diferentes.

**Caso 1 - Github Pages:**

- https://de-la-parra-couture.github.io/De-La-Parra

**Caso 2 - local:**

- localhost:4321

**Caso 3:**

- https://delaparra.co/

El dominio final de la pagina aun no se ha adquirido, pero se debe dejar los 3 casos, en caso de que cualquiera de los 3 este funcionando
