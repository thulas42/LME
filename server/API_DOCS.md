# CreditEdge API Documentation

## Swagger UI

Once the server is running, access the interactive API documentation at:

**http://localhost:3001/api-docs**

## Quick Start

1. Start the server:
   ```bash
   cd server
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3001/api-docs
   ```

3. In Swagger UI, you can:
   - View all available endpoints
   - See request/response schemas
   - Try out endpoints directly in the browser
   - Test with different parameters

## API Endpoints Overview

### Applications
- `GET /api/applications` - Get all applications
- `GET /api/applications/:id` - Get application by ID
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `GET /api/applications/stats/summary` - Get statistics

### Deals
- `GET /api/deals` - Get all deals
- `GET /api/deals/:id` - Get deal by ID
- `POST /api/deals` - Create new deal
- `PUT /api/deals/:id` - Update deal
- `GET /api/deals/stats/summary` - Get statistics

### Documents
- `GET /api/documents` - Get all documents
- `GET /api/documents/templates/all` - Get all templates
- `POST /api/documents/generate` - Generate document from template
- `POST /api/documents/upload` - Upload document

### Trading
- `GET /api/trading/listings` - Get loan listings (with filters)
- `GET /api/trading/listings/:id` - Get listing by ID
- `GET /api/trading/activity` - Get trading activity
- `GET /api/trading/stats/summary` - Get statistics

### Sustainability
- `GET /api/sustainability/green-loans` - Get green loans
- `GET /api/sustainability/targets` - Get ESG targets
- `PUT /api/sustainability/targets` - Update ESG targets

### Health Check
- `GET /api/health` - Check API status

## Testing Endpoints in Swagger

1. Click on any endpoint to expand it
2. Click "Try it out"
3. Fill in any required parameters
4. Click "Execute"
5. View the response below

## Example Requests

### Create Application
```json
POST /api/applications
{
  "borrowerName": "TechCorp Industries",
  "borrowerType": "Corporate",
  "loanAmount": 50000000,
  "currency": "USD",
  "loanType": "Term Loan",
  "sector": "Technology",
  "loanPurpose": "Working capital"
}
```

### Create Deal
```json
POST /api/deals
{
  "name": "Renewable Energy Facility",
  "borrower": "GreenPower Corp",
  "amount": 500000000,
  "currency": "EUR",
  "type": "Term Loan",
  "sector": "Energy"
}
```

## Notes

- The database is automatically initialized on first run
- Sample data is seeded automatically
- All endpoints return JSON
- Error responses follow the format: `{ "error": "error message" }`

