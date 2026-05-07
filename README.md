# My App

A monorepo with Next.js (frontend) and Strapi (backend).

## Structure

```
.
├── packages/
│   ├── client/     # Next.js frontend (port 3000)
│   └── server/     # Strapi CMS backend (port 1337)
├── docker-compose.yml
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20.x
- PostgreSQL (or use Docker)

### 1. Copy environment files

```bash
cp packages/client/.env.example packages/client/.env
cp packages/server/.env.example packages/server/.env
```

Edit the `.env` files with your actual values.

### 2. Install dependencies

```bash
npm install
```

This installs dependencies for both `client` and `server` packages.

### 3. Run in development mode

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend (Strapi admin): http://localhost:1337/admin

## Docker

```bash
docker-compose up -d
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both client and server in development |
| `npm run dev-client` | Run only the Next.js client |
| `npm run dev-server` | Run only the Strapi server |
| `npm run build` | Build both packages |
| `npm run lint` | Lint the client code |
| `npm run rm-modules` | Remove all node_modules |

## Environment Variables

### Client (`packages/client/.env`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_ENDPOINT` | Strapi API URL |
| `NEXTAUTH_URL` | Your app's public URL |
| `NEXTAUTH_SECRET` | Secret for NextAuth (generate with `openssl rand -base64 32`) |

### Server (`packages/server/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_HOST` | PostgreSQL host |
| `DATABASE_PORT` | PostgreSQL port |
| `DATABASE_NAME` | Database name |
| `DATABASE_USERNAME` | Database user |
| `DATABASE_PASSWORD` | Database password |
| `APP_KEYS` | Strapi app keys (comma-separated) |
| `ADMIN_JWT_SECRET` | Strapi admin JWT secret |
| `JWT_SECRET` | Users-permissions JWT secret |
| `CLIENT_URL` | Frontend URL (for CORS) |
# realcode-strapi-next-template
# IntervyuApp
