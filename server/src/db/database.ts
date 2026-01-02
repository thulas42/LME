import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dbPath = path.join(__dirname, '../../data/creditedge.db')
const dbDir = path.dirname(dbPath)

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

export const db = new Database(dbPath)

export function initDatabase() {
  // Enable foreign keys
  db.pragma('foreign_keys = ON')

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      borrower_name TEXT NOT NULL,
      borrower_type TEXT NOT NULL,
      loan_amount REAL NOT NULL,
      currency TEXT NOT NULL,
      loan_type TEXT NOT NULL,
      sector TEXT NOT NULL,
      loan_purpose TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      current_step INTEGER DEFAULT 1,
      credit_score INTEGER,
      debt_to_income REAL,
      risk_level TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS deals (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      borrower TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT NOT NULL,
      type TEXT NOT NULL,
      sector TEXT,
      purpose TEXT,
      status TEXT NOT NULL DEFAULT 'in-progress',
      stage TEXT,
      progress INTEGER DEFAULT 0,
      spread INTEGER,
      term TEXT,
      start_date TEXT,
      expected_close TEXT,
      participants INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      deal_id TEXT,
      category TEXT NOT NULL,
      template_id TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      version TEXT,
      file_path TEXT,
      created_by TEXT,
      last_modified DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (deal_id) REFERENCES deals(id)
    );

    CREATE TABLE IF NOT EXISTS templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      version TEXT NOT NULL,
      compliant INTEGER DEFAULT 1,
      usage_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS loan_listings (
      id TEXT PRIMARY KEY,
      borrower TEXT NOT NULL,
      loan_id TEXT NOT NULL UNIQUE,
      amount REAL NOT NULL,
      remaining REAL NOT NULL,
      price REAL NOT NULL,
      spread INTEGER NOT NULL,
      sector TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS trading_activity (
      id TEXT PRIMARY KEY,
      loan_id TEXT NOT NULL,
      borrower TEXT NOT NULL,
      amount REAL NOT NULL,
      price REAL NOT NULL,
      buyer TEXT NOT NULL,
      seller TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (loan_id) REFERENCES loan_listings(loan_id)
    );

    CREATE TABLE IF NOT EXISTS green_loans (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      borrower TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      esg_score INTEGER NOT NULL,
      carbon_reduction TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS esg_targets (
      id TEXT PRIMARY KEY,
      green_loans_target REAL,
      esg_compliance_target REAL,
      carbon_reduction_target REAL,
      sdg_goals_target INTEGER,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
    CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);
    CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
    CREATE INDEX IF NOT EXISTS idx_loan_listings_status ON loan_listings(status);
  `)

  // Insert initial data
  insertInitialData()
  
  console.log('✅ Database initialized successfully')
}

function insertInitialData() {
  // Check if data already exists
  const existingTemplates = db.prepare('SELECT COUNT(*) as count FROM templates').get() as { count: number }
  if (existingTemplates.count > 0) return

  // Insert templates
  const insertTemplate = db.prepare(`
    INSERT INTO templates (id, name, category, version, compliant, usage_count)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  const templates = [
    ['tpl-1', 'LMA Term Loan Agreement', 'Standard', '2024.1', 1, 156],
    ['tpl-2', 'Revolving Credit Facility', 'Standard', '2024.1', 1, 89],
    ['tpl-3', 'Syndicated Loan Agreement', 'Standard', '2024.1', 1, 124],
    ['tpl-4', 'Green Loan Agreement', 'Specialized', '2024.2', 1, 45],
  ]

  const insertMany = db.transaction((templates) => {
    for (const template of templates) {
      insertTemplate.run(...template)
    }
  })

  insertMany(templates)

  // Insert sample deals
  const insertDeal = db.prepare(`
    INSERT INTO deals (id, name, borrower, amount, currency, type, sector, status, stage, progress, spread, term, start_date, expected_close, participants)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const deals = [
    ['deal-1', 'Renewable Energy Facility', 'GreenPower Corp', 500, 'EUR', 'Term Loan', 'Energy', 'in-progress', 'Documentation', 65, 175, '5 years', '2024-01-15', '2024-03-15', 8],
    ['deal-2', 'Infrastructure Loan', 'InfraBuild Ltd', 250, 'GBP', 'Term Loan', 'Infrastructure', 'pending', 'Due Diligence', 40, 185, '7 years', '2024-01-10', '2024-04-10', 5],
    ['deal-3', 'Corporate Refinancing', 'TechGlobal Inc', 300, 'USD', 'Revolving Credit', 'Technology', 'attention', 'Pricing Review', 80, 165, '3 years', '2024-01-05', '2024-02-20', 12],
  ]

  const insertDeals = db.transaction((deals) => {
    for (const deal of deals) {
      insertDeal.run(...deal)
    }
  })

  insertDeals(deals)

  // Insert sample loan listings
  const insertListing = db.prepare(`
    INSERT INTO loan_listings (id, borrower, loan_id, amount, remaining, price, spread, sector, status, views)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const listings = [
    ['listing-1', 'TechCorp Industries', 'LN-2024-001', 50, 42, 98.5, 175, 'Technology', 'active', 24],
    ['listing-2', 'GreenEnergy Solutions', 'LN-2024-015', 75, 68, 99.2, 165, 'Energy', 'active', 18],
    ['listing-3', 'InfraBuild Ltd', 'LN-2024-028', 120, 95, 97.8, 185, 'Infrastructure', 'active', 31],
  ]

  const insertListings = db.transaction((listings) => {
    for (const listing of listings) {
      insertListing.run(...listing)
    }
  })

  insertListings(listings)

  // Insert sample green loans
  const insertGreenLoan = db.prepare(`
    INSERT INTO green_loans (id, name, borrower, amount, category, esg_score, carbon_reduction, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const greenLoans = [
    ['green-1', 'Solar Farm Development', 'SunPower Energy', 150, 'Renewable Energy', 92, '25kt CO₂/year', 'active'],
    ['green-2', 'Green Building Retrofit', 'EcoBuild Corp', 85, 'Green Buildings', 88, '12kt CO₂/year', 'active'],
    ['green-3', 'Electric Vehicle Fleet', 'CleanTransport Ltd', 45, 'Clean Transport', 85, '8kt CO₂/year', 'pending'],
  ]

  const insertGreenLoans = db.transaction((loans) => {
    for (const loan of loans) {
      insertGreenLoan.run(...loan)
    }
  })

  insertGreenLoans(greenLoans)

  // Insert default ESG targets
  db.prepare(`
    INSERT INTO esg_targets (id, green_loans_target, esg_compliance_target, carbon_reduction_target, sdg_goals_target)
    VALUES ('targets-1', 1500, 95, 50, 15)
  `).run()

  console.log('✅ Initial data inserted')
}

