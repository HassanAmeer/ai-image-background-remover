# chroma-cleanse

[cloudflarebutton]

A production-ready React starter template deployed on Cloudflare Workers. Features a modern UI with Tailwind CSS, shadcn/ui components, and a full-stack setup with Hono API routes.

## Features

- Responsive React frontend with TypeScript and Vite
- Tailwind CSS with custom theme, dark mode, and animations
- Pre-configured shadcn/ui component library
- Cloudflare Workers backend with Hono framework and CORS support
- Built-in error reporting and boundary handling
- Hot-reload development server
- One-click Cloudflare deployment support

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, React Router, TanStack Query
- **Styling**: Tailwind CSS, shadcn/ui (Radix primitives)
- **Backend**: Cloudflare Workers, Hono, TypeScript
- **Tooling**: Bun, Wrangler, ESLint, PostCSS
- **Additional**: Immer, Zod, Sonner (toasts), Framer Motion, Lucide icons

## Getting Started

### Prerequisites

- Bun (recommended) or Node.js 18+
- A Cloudflare account (for deployment)

### Installation

Clone the repository and install dependencies with Bun:

```bash
bun install
```

### Development

Start the local development server:

```bash
bun dev
```

The app will be available at `http://localhost:3000` (or the port specified by the `PORT` environment variable).

To run the linter:

```bash
bun lint
```

## Usage

The template includes a placeholder home page demonstrating the UI system, theme toggle, and example interactive elements. Replace the contents of `src/pages/HomePage.tsx` with your application UI.

API routes are defined in `worker/userRoutes.ts`. Add new endpoints using the Hono app instance:

```ts
app.get('/api/hello', (c) => c.json({ message: 'Hello from Workers!' }));
```

## Deployment

Deploy directly to Cloudflare Workers using Wrangler:

```bash
bun run deploy
```

[cloudflarebutton]

The deployment uses the configuration in `wrangler.jsonc` and automatically handles static assets and Worker routes.

## Project Structure

- `src/` — React application source (pages, components, hooks, styles)
- `worker/` — Cloudflare Worker code (API routes and core utilities)
- Configuration files (`vite.config.ts`, `tsconfig*.json`, `tailwind.config.js`) are pre-tuned for the Workers + Vite hybrid setup.

## License

This project is provided as an open-source template under the MIT License.