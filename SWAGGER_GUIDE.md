# Swagger API Documentation Guide

## 🚀 Quick Start

The backend server is now running with Swagger documentation!

### Access Swagger UI

Open your browser and navigate to:
```
http://localhost:3001/api-docs
```

## 📖 How to Use Swagger UI

### 1. View All Endpoints
- Swagger UI displays all available API endpoints organized by tags
- Each endpoint shows:
  - HTTP method (GET, POST, PUT, DELETE)
  - Endpoint path
  - Description
  - Parameters
  - Request body schema
  - Response schemas

### 2. Try Out Endpoints

1. **Expand an endpoint** by clicking on it
2. Click **"Try it out"** button
3. Fill in any required parameters:
   - Path parameters (e.g., `:id`)
   - Query parameters (e.g., `?sector=Technology`)
   - Request body (for POST/PUT requests)
4. Click **"Execute"**
5. View the response:
   - Response code (200, 201, 404, etc.)
   - Response body (JSON)
   - Response headers

### 3. Example: Create a New Application

1. Go to **Applications** section
2. Click on `POST /api/applications`
3. Click **"Try it out"**
4. Fill in the request body:
   ```json
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
5. Click **"Execute"**
6. See the created application in the response!

### 4. Example: Get All Deals

1. Go to **Deals** section
2. Click on `GET /api/deals`
3. Click **"Try it out"**
4. Click **"Execute"**
5. View all deals in the response!

## 📋 Available Endpoint Categories

### Applications
- Get all applications
- Get application by ID
- Create new application
- Update application
- Get application statistics

### Deals
- Get all deals
- Get deal by ID
- Create new deal
- Update deal
- Get deal statistics

### Documents
- Get all documents
- Get document templates
- Generate document from template
- Upload document

### Trading
- Get loan listings (with filters)
- Get listing by ID
- Get trading activity
- Get trading statistics

### Sustainability
- Get green loans
- Get ESG targets
- Update ESG targets
- Get sustainability statistics

### Market Intelligence
- Get market intelligence data
- Get dashboard statistics

### Analytics
- Get performance metrics
- Get portfolio analysis
- Get risk metrics

## 💡 Tips

1. **Use the search box** at the top to quickly find endpoints
2. **Check the schemas** to understand the data structure
3. **Try different parameters** to see how filtering works
4. **View examples** in the request/response schemas
5. **Copy curl commands** - Swagger generates curl commands you can use in terminal

## 🔧 Troubleshooting

If the server isn't running:
```bash
cd server
npm run dev
```

If you see errors:
- Make sure the database is initialized (happens automatically)
- Check the server console for error messages
- Verify Python is installed if you see better-sqlite3 errors (database will still work)

## 📝 Notes

- All endpoints return JSON
- Error responses follow: `{ "error": "error message" }`
- The database is automatically initialized with sample data
- Changes persist in the SQLite database

Enjoy exploring the API! 🎉

