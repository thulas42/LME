import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CreditEdge API',
      version: '1.0.0',
      description: 'RESTful API for CreditEdge loan market platform',
      contact: {
        name: 'CreditEdge Team',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    tags: [
      { name: 'Applications', description: 'Loan application management' },
      { name: 'Deals', description: 'Deal workflow management' },
      { name: 'Documents', description: 'Document and template management' },
      { name: 'Trading', description: 'Loan trading and marketplace' },
      { name: 'Market Intelligence', description: 'Market data and analytics' },
      { name: 'Analytics', description: 'Performance and risk analytics' },
      { name: 'Sustainability', description: 'ESG and green lending' },
    ],
    components: {
      schemas: {
        Application: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid-here' },
            borrower_name: { type: 'string', example: 'TechCorp Industries' },
            borrower_type: { type: 'string', example: 'Corporate' },
            loan_amount: { type: 'number', example: 50000000 },
            currency: { type: 'string', example: 'USD' },
            loan_type: { type: 'string', example: 'Term Loan' },
            sector: { type: 'string', example: 'Technology' },
            loan_purpose: { type: 'string', example: 'Working capital' },
            status: { type: 'string', example: 'pending' },
            current_step: { type: 'number', example: 1 },
            credit_score: { type: 'number', example: 720 },
            debt_to_income: { type: 'number', example: 32.5 },
            risk_level: { type: 'string', example: 'low' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Deal: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string', example: 'Renewable Energy Facility' },
            borrower: { type: 'string', example: 'GreenPower Corp' },
            amount: { type: 'number', example: 500000000 },
            currency: { type: 'string', example: 'EUR' },
            type: { type: 'string', example: 'Term Loan' },
            sector: { type: 'string', example: 'Energy' },
            status: { type: 'string', example: 'in-progress' },
            stage: { type: 'string', example: 'Documentation' },
            progress: { type: 'number', example: 65 },
          },
        },
        Document: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            deal_id: { type: 'string' },
            category: { type: 'string' },
            status: { type: 'string' },
            version: { type: 'string' },
          },
        },
        LoanListing: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            borrower: { type: 'string' },
            loan_id: { type: 'string' },
            amount: { type: 'number' },
            remaining: { type: 'number' },
            price: { type: 'number' },
            spread: { type: 'number' },
            sector: { type: 'string' },
            status: { type: 'string' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/index.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)

