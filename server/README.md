# CreditEdge Backend API

Backend server for CreditEdge loan market platform.

## Setup

### Prerequisites

- Node.js 18+ and npm
- **Python 3.x** (required for building `better-sqlite3` native module)
  - On Windows: Install from [python.org](https://www.python.org/downloads/)
  - Make sure Python is in your PATH

### Installation

```bash
# Install dependencies
npm install

# If better-sqlite3 fails to build, you may need to install build tools:
# Windows: npm install --global windows-build-tools
# Or use: npm install --python=python3
```

### Running

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

**Note**: If you encounter Python/build errors, the frontend will gracefully handle API failures and can work with mock data.

## API Endpoints

### Applications
- `GET /api/applications` - Get all applications
- `GET /api/applications/:id` - Get application by ID
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application
- `GET /api/applications/stats/summary` - Get application statistics

### Deals
- `GET /api/deals` - Get all deals
- `GET /api/deals/:id` - Get deal by ID
- `POST /api/deals` - Create new deal
- `PUT /api/deals/:id` - Update deal
- `DELETE /api/deals/:id` - Delete deal
- `GET /api/deals/stats/summary` - Get deal statistics

### Documents
- `GET /api/documents` - Get all documents
- `GET /api/documents/:id` - Get document by ID
- `GET /api/documents/templates/all` - Get all templates
- `GET /api/documents/templates/:id` - Get template by ID
- `POST /api/documents/generate` - Generate document from template
- `POST /api/documents/upload` - Upload document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document
- `GET /api/documents/stats/summary` - Get document statistics

### Trading
- `GET /api/trading/listings` - Get loan listings (with filters)
- `GET /api/trading/listings/:id` - Get listing by ID
- `POST /api/trading/listings` - Create new listing
- `GET /api/trading/activity` - Get trading activity
- `POST /api/trading/activity` - Record trading activity
- `GET /api/trading/stats/summary` - Get trading statistics

### Analytics
- `GET /api/analytics/performance` - Get performance metrics
- `GET /api/analytics/portfolio` - Get portfolio analysis
- `GET /api/analytics/risk` - Get risk metrics

### Sustainability
- `GET /api/sustainability/green-loans` - Get all green loans
- `GET /api/sustainability/green-loans/:id` - Get green loan by ID
- `GET /api/sustainability/targets` - Get ESG targets
- `PUT /api/sustainability/targets` - Update ESG targets
- `GET /api/sustainability/stats` - Get sustainability statistics

### Market Intelligence
- `GET /api/loans/market-intelligence` - Get market data
- `GET /api/loans/dashboard/stats` - Get dashboard statistics

## Database

Uses SQLite with better-sqlite3. Database file is stored in `data/creditedge.db`.

