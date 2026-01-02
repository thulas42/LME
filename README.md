# CreditEdge

**Competitive advantage in loan markets**

A desktop platform for intelligent loan market insights and streamlined deal execution, built for the LMA Edge Hackathon.

## Overview

CreditEdge is a comprehensive loan market platform that combines AI-powered features, sustainability tracking, and streamlined workflows to revolutionize how loans are originated, documented, traded, and managed.

## Quick Start

### Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install:all
```

### Running the Application

The application consists of three parts:
1. **Frontend (React + Vite)** - Runs on `http://localhost:5173`
2. **Backend API (Express)** - Runs on `http://localhost:3001`
3. **Electron Desktop App** - Desktop wrapper

To run everything together:
```bash
npm run dev
```

This will start:
- Backend API server on `http://localhost:3001`
- Vite dev server on `http://localhost:5173`
- Electron app window

### Running Components Separately

**Backend only:**
```bash
cd server
npm run dev
```

**Frontend only:**
```bash
npm run dev:react
```

**Electron only (after frontend is running):**
```bash
npm run dev:electron
```

## Project Structure

```
CreditEdge/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── services/            # API service layer
│   ├── hooks/               # Custom React hooks
│   └── styles/              # CSS styles
├── server/                  # Backend API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── db/             # Database setup and migrations
│   │   └── index.ts         # Server entry point
│   └── data/               # SQLite database (auto-created)
├── electron/                # Electron main process
└── dist/                    # Build output
```

## Features

### Core Features
- **Dashboard**: Overview of market activity, deal pipeline, and key metrics
- **Market Intelligence**: Real-time market data, trends, and analytics
- **Loan Origination**: Digital workflow for streamlined loan origination and processing
- **Document Management**: LMA-compliant document templates and management
- **Loan Trading**: Transparent marketplace for loan trading and secondary market transactions
- **Deal Workflow**: Manage loan origination, documentation, and execution
- **Sustainability**: ESG assessment, green finance tracking, and sustainable lending practices
- **Analytics**: Performance metrics, portfolio analysis, and risk assessment

### Backend API
- **RESTful API**: Full CRUD operations for all entities
- **Data Persistence**: SQLite database with automatic schema initialization
- **Real-time Stats**: Dynamic statistics and metrics
- **Document Generation**: Template-based document creation
- **Trading Activity**: Loan listing and trading activity tracking

## Technology Stack

### Frontend
- **Framework**: React 18, TypeScript
- **Build Tool**: Vite
- **UI Components**: Lucide React (icons)
- **Charts**: Recharts
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Desktop**: Electron

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Language**: TypeScript
- **API**: RESTful API

## API Endpoints

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `GET /api/applications/stats/summary` - Get statistics

### Deals
- `GET /api/deals` - Get all deals
- `POST /api/deals` - Create new deal
- `PUT /api/deals/:id` - Update deal
- `GET /api/deals/stats/summary` - Get statistics

### Documents
- `GET /api/documents` - Get all documents
- `GET /api/documents/templates/all` - Get all templates
- `POST /api/documents/generate` - Generate document from template
- `POST /api/documents/upload` - Upload document

### Trading
- `GET /api/trading/listings` - Get loan listings
- `GET /api/trading/activity` - Get trading activity
- `GET /api/trading/stats/summary` - Get statistics

### Sustainability
- `GET /api/sustainability/green-loans` - Get green loans
- `GET /api/sustainability/targets` - Get ESG targets
- `PUT /api/sustainability/targets` - Update ESG targets

See `server/README.md` for complete API documentation.

## Building for Production

```bash
# Build frontend
npm run build:react

# Build backend
npm run build:server

# Build Electron
npm run build:electron

# Package application
npm run package
```

## Development

The application uses:
- **Hot Module Replacement (HMR)** for fast development
- **TypeScript** for type safety
- **SQLite** for local data persistence
- **RESTful API** for backend communication

## Database

The SQLite database is automatically created in `server/data/creditedge.db` on first run. The schema includes:
- Applications
- Deals
- Documents & Templates
- Loan Listings
- Trading Activity
- Green Loans
- ESG Targets

## License

MIT

## Credits

Built for the LMA Edge Hackathon 2024
