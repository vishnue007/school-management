# School Management Project

Full-stack monorepo for a school management platform. The workspace currently hosts:

- `front-end/`: Angular 17+ app with Tailwind CSS for styling and standalone component architecture.
- `backend/`: Express + TypeScript API scaffold featuring an example registration endpoint.

## Prerequisites

- Node.js 20+
- npm 10+ (or compatible package manager)
- PowerShell/Terminal with permission to install global binaries

> **Windows note:** earlier npm installs failed due to permission errors (`EPERM`). If that recurs, launch PowerShell as Administrator and retry the commands below. Run `npm cache clean --force` when clearing the npm cache.

## Getting Started

### Backend

```powershell
cd backend
npm install
npm run dev
```

- Development server runs on `http://localhost:3000`.
- Primary endpoint: `POST /api/auth/register`—validates registration form data and stores it in-memory (for production, swap in a database + password hashing).
- To build & run the compiled bundle:

```powershell
npm run build
npm start
```

Create a `.env` file (refer to `src/config/env.ts` for defaults):

```
PORT=3000
NODE_ENV=development
```

### Frontend

```powershell
cd front-end
npm install          # installs Angular CLI, Tailwind, PostCSS, etc.
npm start            # runs ng serve
```

- Angular dev server is available at `http://localhost:4200`.
- Routing already maps `/login` and `/register` to the respective forms.
- Tailwind directives are loaded in `src/styles.scss`; utilities compile once dependencies install.

### Updating Tailwind (optional)

If you tweak Tailwind settings, edit `front-end/tailwind.config.js`. The `content` array already targets Angular templates and styles.

## Scripts Overview

| Location   | Script              | Description                             |
|------------|---------------------|-----------------------------------------|
| backend    | `npm run dev`       | Start Express in watch mode (`tsx`).    |
| backend    | `npm run build`     | Compile TypeScript to `dist/`.          |
| backend    | `npm start`         | Run compiled server.                    |
| frontend   | `npm start`         | Run Angular dev server.                 |
| frontend   | `npm run build`     | Production build of the Angular app.    |

## Roadmap Ideas

- Persist registration data to a database (PostgreSQL, MongoDB, etc.).
- Add authentication workflows (login, JWT sessions).
- Expand Angular app with dashboards and role-based views.
- Integrate tests (Jest for backend, Angular Testing Library for frontend).

## Contributing

1. Create a new branch.
2. Commit changes with clear messages.
3. Push and open a pull request.

Feel free to tailor the ignore rules or scripts to suit your local tooling. Happy building!

