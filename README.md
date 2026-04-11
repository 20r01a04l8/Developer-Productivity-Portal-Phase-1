# Developer Productivity Portal - Phase 1

Developer Productivity Portal is a production-style static web prototype for managing engineering projects and tasks. Phase 1 focuses on strong front-end architecture, accessibility, and browser-based persistence using LocalStorage.

## Features
- Dashboard with KPI summary cards for projects and tasks
- Project management with create, edit, delete, and seed reset flows
- Task management with create, edit, delete, search, and multi-filter support
- LocalStorage initialization from bundled seed data
- Accessible modals, semantic structure, keyboard support, and visible feedback states
- Modular ES6 architecture designed for migration to React and backend APIs

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (ES6 modules)
- Browser LocalStorage

## Run Locally
1. Open `index.html` in a modern browser.
2. Navigate between Dashboard, Projects, and Tasks using the sidebar.
3. Use the reset action on the Projects page if you want to restore the starter dataset.

No build step or package installation is required.

## Project Structure
```text
Phase1/
|-- index.html
|-- projects.html
|-- tasks.html
|-- css/
|   |-- styles.css
|   `-- responsive.css
|-- js/
|   |-- app.js
|   |-- router.js
|   |-- seedData.js
|   |-- storage.js
|   |-- projectService.js
|   |-- taskService.js
|   |-- ui/
|   |   |-- dashboard.js
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
- `app.js` performs startup initialization and page dispatching.
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

Suggested conventional commits:
- `feat: add project management modal workflow`
- `feat: implement task filtering and search`
- `docs: document portal architecture and roadmap`
- `style: refine responsive dashboard layout`
- `refactor: isolate LocalStorage persistence behind storage module`

Suggested showcase branches and pull requests are documented in `docs/git-workflow.md`.

## Notes
- `data/seedData.json` is included for reference and portability.
- `js/seedData.js` is used at runtime so the app works when opened directly from the filesystem without a local server.
