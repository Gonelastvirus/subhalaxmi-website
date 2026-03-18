# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── sl-property/        # Subhalaxmi Property & Construction website (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Artifacts

### `artifacts/sl-property` — Subhalaxmi Property & Construction Website

Display-only real estate showcase website for Nepal. Primary goal is to drive users to download the mobile APK.

- **Preview path**: `/` (root)
- **Design**: Light soft luxury feel — off-white, warm browns, soft gold accents
- **Sections**: Hero, Property Listings, Construction Services, About, APK Download CTA, Footer
- **Key behavior**: Clicking any property shows a "Download App" modal (no detail pages)
- **APK URL**: Set `APK_URL` constant in `src/lib/constants.ts`
- **Frontend packages**: framer-motion, react-helmet-async, clsx, tailwind-merge

### `artifacts/api-server` — Express API Server

Express 5 API server with mock data for properties, services, and about.

- **Routes**: `/api/properties`, `/api/services`, `/api/about`, `/api/healthz`
- **Data**: Mock seed data (no database required for this app)
- **Phone masking**: Service phone numbers are masked (first 2 + **** + last 3 digits)

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- Routes: `/api/healthz`, `/api/properties`, `/api/services`, `/api/about`
- All data is mock/in-memory (no DB needed)
- `pnpm --filter @workspace/api-server run dev` — run the dev server

### `artifacts/sl-property` (`@workspace/sl-property`)

React + Vite website for Subhalaxmi Property & Construction.

- Single-page app with smooth scroll to sections
- APK URL can be updated in `src/lib/constants.ts`
- Fetches from `/api/properties`, `/api/services`, `/api/about`

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`).

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec.
