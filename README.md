# Developer Productivity Portal - Phase 1

Developer Productivity Portal is a production-style static web prototype for managing engineering projects and tasks. Phase 1 focuses on a reusable front-end shell, accessible workflows, and browser-based persistence using LocalStorage.

## Features
- Secure prototype login with demo usernames and client-side session handling
- Dashboard with KPI summary cards, delivery health insights, and extension-point sections
- Project management with create, edit, delete, and seed reset flows
- Task management with create, edit, delete, search, and multi-filter support
- Reusable responsive navigation shell shared across dashboard, projects, and tasks
- Reusable footer with contact information and supporting product metadata
- LocalStorage initialization from bundled seed data
- Accessible modals, semantic structure, keyboard support, and visible feedback states
- Modular ES6 architecture designed for migration to React and backend APIs

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (ES6 modules)
- Browser LocalStorage

## Run Locally
1. Open `login.html` or `index.html` in a modern browser.
2. If you open `login.html`, sign in with one of the supported demo usernames.
3. Navigate between Dashboard, Projects, and Tasks using the shared application navigation.
4. Use the reset action on the Projects page if you want to restore the starter dataset.

No build step or package installation is required.

## Demo Login
- Open `login.html` to access the prototype login screen.
- Use one of these demo usernames: `admin`, `developer`, or `manager`.
- For this static prototype, any password with at least 6 characters is accepted.
- This login flow is for front-end demonstration only and is not backed by a real authentication service.

## Project Structure
```text
Phase1/
|-- index.html
|-- login.html
|-- projects.html
|-- tasks.html
|-- css/
|   |-- styles.css
|   `-- responsive.css
|-- js/
|   |-- app.js
|   |-- authService.js
|   |-- router.js
|   |-- seedData.js
|   |-- storage.js
|   |-- projectService.js
|   |-- taskService.js
|   |-- ui/
|   |   |-- dashboard.js
|   |   |-- loginUI.js
|   |   |-- projectUI.js
|   |   `-- taskUI.js
|   `-- utils/
|       |-- helpers.js
|       `-- validators.js
|-- assets/
|   `-- icons/
|-- data/
|   `-- seedData.json
|-- docs/
|   `-- architecture.md
`-- .gitignore
```

## Architectural Highlights
- `app.js` performs startup initialization, shared shell rendering, and page dispatching.
- `router.js` centralizes reusable navigation and footer rendering for the application shell.
- `authService.js` handles prototype-only authentication state and access gating.
- `storage.js` isolates persistence behind a narrow interface.
- Services enforce business rules and sanitize inputs before saving.
- UI modules own rendering and event wiring for each page.

Additional detail is documented in `docs/architecture.md`.

## Accessibility and Quality
- Semantic HTML landmarks and tables
- Skip link and keyboard-operable dialogs
- Color-coded badges with text labels
- Form validation messages and ARIA live regions
- Responsive layout using CSS Grid and Flexbox

## Future Roadmap
- Phase 2: React + TypeScript + REST API integration
- Phase 3: Authentication, backend services, and database persistence
- Phase 4: Dockerization and CI/CD automation
- Phase 5-7: AI-driven insights, assistants, and RAG workflows

## Git Workflow
- `main`: production-ready branch
- `develop`: shared integration branch
- `feature/<feature-name>`: feature delivery branches

Current repository workstreams:
- PR 1 `Project Documentation` - repository onboarding and workflow notes
- PR 2 `Login UI` - prototype authentication entry flow
- PR 3 `Dashboard Page` - dashboard landing page foundation
- PR 4 `Navigation Bar` - reusable application navigation shell
- PR 5 `Footer Component` - reusable footer with contact metadata

Current branch:
- `feature/footer-component`

Implementation notes and branch guidance are documented in `docs/git-workflow.md`.

## Notes
- `data/seedData.json` is included for reference and portability.
- `js/seedData.js` is used at runtime so the app works when opened directly from the filesystem without a local server.
