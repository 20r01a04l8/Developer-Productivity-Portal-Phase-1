# Developer Productivity Portal - Architecture

## Overview
Phase 1 is a static, multi-page web prototype built with HTML5, CSS3, and ES modules. It demonstrates a production-oriented front-end architecture with a shared application shell, prototype authentication, and modular page-level behavior while remaining approachable for junior developers to extend.

## Layered Design
1. UI Layer
   Individual page modules in `js/ui/` bind DOM events, render views, and manage page-level state such as filters, modal mode, and dashboard summaries.
2. Business Logic Layer
   `projectService.js` and `taskService.js` own validation orchestration, sanitization, identifier generation, and record lifecycle logic. `authService.js` provides prototype-only session handling and access checks.
3. Data Layer
   `storage.js` provides a narrow LocalStorage abstraction so a future REST or IndexedDB adapter can replace persistence without rewriting the UI.

## Shared Application Shell
1. `router.js` renders the shared navigation and footer components used across the authenticated pages.
2. The sidebar navigation and footer are treated as reusable shell elements rather than page-specific markup.
3. Responsive shell behavior is handled with shared CSS and lightweight JavaScript so future screens can inherit the same structure.

## Component Interaction
1. `app.js` initializes LocalStorage seed data, renders shared shell elements, highlights the active route, and dispatches control to the current page module.
2. `authService.js` protects the dashboard, projects, and tasks pages while leaving `login.html` public.
3. Each UI module reads and writes through services rather than touching LocalStorage directly.
4. Services depend on validators and helpers for consistency and reuse.
5. Storage is initialized from `js/seedData.js`, with `data/seedData.json` included as a documentation-friendly mirror of the starting dataset.

## Scalability Considerations
- The data models already align with future REST resources through stable ids and ISO timestamps.
- UI modules are organized by page, which maps cleanly to future React route components.
- Shared shell rendering in `router.js` reduces duplicated layout code and supports future route growth.
- The prototype login flow provides a clean seam for replacement with real backend authentication later.
- The thin storage API allows migration from LocalStorage to fetch-based repositories.
- Rendering is kept focused and predictable, making later extraction into reusable components straightforward.

## Accessibility and UX
- Semantic landmarks and headings are used across all pages.
- Skip links, `aria-live` regions, visible focus states, and keyboard-friendly dialogs support accessible interaction.
- Shared navigation includes active route indication and responsive toggle behavior on smaller screens.
- Empty, loading, validation, and feedback states are explicitly rendered.

## Security and Data Quality
- User-entered text is sanitized before persistence.
- Validation rejects invalid statuses, priorities, and underspecified text input.
- Prototype login avoids storing hardcoded passwords in source control and documents its demo-only behavior clearly.
- Tasks are cascade-deleted when a project is removed to keep the dataset consistent.

## Migration Path
- Phase 2 can replace page modules with React components while preserving the service contracts and shell structure.
- Phase 3 can replace `storage.js` with API clients and add auth-aware request handling.
- Later AI phases can layer analytics and assistant workflows on top of the same domain models.
