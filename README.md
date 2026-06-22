
<p align="center">
  <img src="./backend/assets/image_fx_.png" alt="Cosmic Cargo Network" width="700" style="border-radius: 12px;" />
</p>

# Cosmic Cargo Network

An intergalactic freight quoting system. Select an origin and destination across 3 superclusters, 9 galaxies, and 50 planets, specify your cargo, and get an itemized shipping quote in credits — factoring in distance, planetary tax rates, political fees, and cargo type.

**Live demo:** _add your Vercel URL here_

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS 4 |
| Backend | Go 1.22, Echo v4, GORM |
| Database | PostgreSQL 16 |
| Deployment | Vercel (frontend), Docker Compose (full stack) |

---

## Architecture

The app runs in two modes depending on whether the Go backend is available:

**Standalone mode** (default on Vercel) — The frontend serves all data from embedded seed data and calculates quotes client-side. No backend required.

**Full-stack mode** (local with Docker Compose) — The Next.js frontend connects to the Go/Echo REST API, which serves planet/galaxy/supercluster data from PostgreSQL and handles server-side quote calculation. Set `NEXT_PUBLIC_API_URL` to point at the backend.

The fallback is transparent — the UI is identical in both modes.

```
┌─────────────────────────────────────────────────────┐
│                   Next.js Frontend                  │
│  ┌──────────┐  ┌────────────┐  ┌─────────────────┐  │
│  │ Sidebar  │  │  Wizard    │  │  QuoteDisplay   │  │
│  │ Progress │  │  (4 steps) │  │  (itemized)     │  │
│  └──────────┘  └────────────┘  └─────────────────┘  │
│         ↓ NEXT_PUBLIC_API_URL set?                  │
│    yes: Go API    no: seed data + client-side math  │
└─────────────────────────────────────────────────────┘
         ↓ (full-stack mode only)
┌──────────────────────────┐   ┌────────────────────┐
│   Go / Echo REST API     │   │   PostgreSQL 16     │
│  GET /superclusters      │──▶│  superclusters      │
│  GET /galaxies           │   │  galaxies           │
│  GET /planets            │   │  planets            │
│  POST /quote             │   │  shipping_quotes    │
└──────────────────────────┘   └────────────────────┘
```

---

## Quote Calculation

Quotes are computed using 3D Euclidean distance between planet coordinates:

```
distance = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)

total = baseCost
      + distance × distanceRate
      + baseCost × originTaxRate
      + originPoliticalFee
      + (baseCost + distanceCost) × destinationTaxRate
      + destinationPoliticalFee
      + cargoWeight × weightRate × cargoMultiplier
```

Cargo type multipliers: Standard ×1.0 · Fragile ×1.5 · Hazardous ×2.0 · Perishable ×1.3 · Valuable ×1.8 · Bulk ×0.9

The same formula runs in both the Go backend and the TypeScript fallback, so results are consistent regardless of mode.

---

## Running Locally

### Standalone (frontend only)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app works immediately — no backend or database needed.

### Full Stack (Go backend + PostgreSQL)

Requires Docker and Docker Compose.

```bash
# Start the Go API and PostgreSQL (schema + seed data applied automatically)
docker compose up

# In a separate terminal, run the frontend pointed at the backend
NEXT_PUBLIC_API_URL=http://localhost:1323 npm run dev
```

The database schema and all seed data are applied automatically on first container start via `backend/db/init/01_schema.sql`.

To run the Go backend without Docker:

```bash
# Start PostgreSQL separately, then:
cd backend
DB_HOST=localhost DB_USER=postgres DB_PASSWORD=root DB_NAME=cosmiccargonetwork go run main.go
```

---

## Backend API

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/superclusters` | List all superclusters |
| `GET` | `/galaxies?superclusterId=<id>` | Galaxies in a supercluster |
| `GET` | `/planets?galaxyId=<id>` | Planets in a galaxy |
| `POST` | `/quote` | Calculate a shipping quote |

**POST /quote request body:**
```json
{
  "originPlanetId": "uuid",
  "destinationPlanetId": "uuid",
  "cargo": {
    "type": "fragile",
    "weight": 500,
    "value": 10000
  }
}
```

---

## Project Structure

```
├── app/
│   ├── components/        # Sidebar, ProgressTracker, SelectionBox, CargoForm, QuoteDisplay, RouteDisplay
│   ├── lib/
│   │   ├── api.ts         # Fetch wrappers with seed-data fallback
│   │   ├── seed-data.ts   # 3 superclusters · 9 galaxies · 50 planets
│   │   └── types.ts       # Shared TypeScript interfaces
│   ├── select-origin/     # Main 4-step quote wizard
│   └── page.tsx           # Landing page
├── backend/
│   ├── internal/
│   │   ├── api/handlers.go   # Echo route handlers
│   │   ├── config/db.go      # GORM + PostgreSQL connection
│   │   ├── dto/              # DB mapping layer
│   │   └── utils/            # Shipping rate helpers
│   ├── models/               # GORM models (Planet, Galaxy, Supercluster, Cargo, Shipping)
│   ├── db/
│   │   ├── init/             # Combined SQL init script for Docker
│   │   └── migrations/       # Numbered up/down migration files
│   └── main.go               # Echo server setup + route registration
├── docker-compose.yml         # PostgreSQL + Go backend
└── backend/Dockerfile         # Multi-stage Go build
```
