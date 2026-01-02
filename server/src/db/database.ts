import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const dbPath = path.join(__dirname, '../../data/database.json')
const dbDir = path.dirname(dbPath)

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

interface Database {
  applications: any[]
  deals: any[]
  documents: any[]
  templates: any[]
  loan_listings: any[]
  trading_activity: any[]
  green_loans: any[]
  esg_targets: any[]
}

let db: Database = {
  applications: [],
  deals: [],
  documents: [],
  templates: [],
  loan_listings: [],
  trading_activity: [],
  green_loans: [],
  esg_targets: [],
}

// Load database from file
function loadDatabase(): Database {
  if (fs.existsSync(dbPath)) {
    try {
      const data = fs.readFileSync(dbPath, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Error loading database:', error)
      return db
    }
  }
  return db
}

// Save database to file
function saveDatabase() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
  } catch (error) {
    console.error('Error saving database:', error)
  }
}

// Database operations
export const database = {
  // Applications
  getApplications: () => db.applications,
  getApplication: (id: string) => db.applications.find(app => app.id === id),
  createApplication: (data: any) => {
    const application = { id: uuidv4(), ...data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    db.applications.push(application)
    saveDatabase()
    return application
  },
  updateApplication: (id: string, data: any) => {
    const index = db.applications.findIndex(app => app.id === id)
    if (index === -1) return null
    db.applications[index] = { ...db.applications[index], ...data, updated_at: new Date().toISOString() }
    saveDatabase()
    return db.applications[index]
  },
  deleteApplication: (id: string) => {
    const index = db.applications.findIndex(app => app.id === id)
    if (index === -1) return false
    db.applications.splice(index, 1)
    saveDatabase()
    return true
  },

  // Deals
  getDeals: () => db.deals,
  getDeal: (id: string) => db.deals.find(deal => deal.id === id),
  createDeal: (data: any) => {
    const deal = { id: uuidv4(), ...data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    db.deals.push(deal)
    saveDatabase()
    return deal
  },
  updateDeal: (id: string, data: any) => {
    const index = db.deals.findIndex(deal => deal.id === id)
    if (index === -1) return null
    db.deals[index] = { ...db.deals[index], ...data, updated_at: new Date().toISOString() }
    saveDatabase()
    return db.deals[index]
  },
  deleteDeal: (id: string) => {
    const index = db.deals.findIndex(deal => deal.id === id)
    if (index === -1) return false
    db.deals.splice(index, 1)
    saveDatabase()
    return true
  },

  // Documents
  getDocuments: () => db.documents,
  getDocument: (id: string) => db.documents.find(doc => doc.id === id),
  createDocument: (data: any) => {
    const document = { id: uuidv4(), ...data, created_at: new Date().toISOString(), last_modified: new Date().toISOString() }
    db.documents.push(document)
    saveDatabase()
    return document
  },
  updateDocument: (id: string, data: any) => {
    const index = db.documents.findIndex(doc => doc.id === id)
    if (index === -1) return null
    db.documents[index] = { ...db.documents[index], ...data, last_modified: new Date().toISOString() }
    saveDatabase()
    return db.documents[index]
  },
  deleteDocument: (id: string) => {
    const index = db.documents.findIndex(doc => doc.id === id)
    if (index === -1) return false
    db.documents.splice(index, 1)
    saveDatabase()
    return true
  },

  // Templates
  getTemplates: () => db.templates,
  getTemplate: (id: string) => db.templates.find(tpl => tpl.id === id),
  updateTemplate: (id: string, data: any) => {
    const index = db.templates.findIndex(tpl => tpl.id === id)
    if (index === -1) return null
    db.templates[index] = { ...db.templates[index], ...data }
    saveDatabase()
    return db.templates[index]
  },

  // Loan Listings
  getListings: (filters?: any) => {
    let listings = db.loan_listings
    if (filters?.sector) listings = listings.filter(l => l.sector === filters.sector)
    if (filters?.status) listings = listings.filter(l => l.status === filters.status)
    if (filters?.minAmount) listings = listings.filter(l => l.amount >= filters.minAmount)
    if (filters?.maxAmount) listings = listings.filter(l => l.amount <= filters.maxAmount)
    return listings
  },
  getListing: (id: string) => db.loan_listings.find(listing => listing.id === id),
  createListing: (data: any) => {
    const listing = { id: uuidv4(), ...data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    db.loan_listings.push(listing)
    saveDatabase()
    return listing
  },
  updateListing: (id: string, data: any) => {
    const index = db.loan_listings.findIndex(listing => listing.id === id)
    if (index === -1) return null
    db.loan_listings[index] = { ...db.loan_listings[index], ...data, updated_at: new Date().toISOString() }
    saveDatabase()
    return db.loan_listings[index]
  },

  // Trading Activity
  getActivity: (limit?: number) => {
    const activity = db.trading_activity.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    return limit ? activity.slice(0, limit) : activity
  },
  createActivity: (data: any) => {
    const activity = { id: uuidv4(), ...data, created_at: new Date().toISOString() }
    db.trading_activity.push(activity)
    saveDatabase()
    return activity
  },

  // Green Loans
  getGreenLoans: () => db.green_loans,
  getGreenLoan: (id: string) => db.green_loans.find(loan => loan.id === id),

  // ESG Targets
  getESGTargets: () => db.esg_targets[0] || null,
  updateESGTargets: (data: any) => {
    if (db.esg_targets.length === 0) {
      db.esg_targets.push({ id: 'targets-1', ...data, updated_at: new Date().toISOString() })
    } else {
      db.esg_targets[0] = { ...db.esg_targets[0], ...data, updated_at: new Date().toISOString() }
    }
    saveDatabase()
    return db.esg_targets[0]
  },
}

export function initDatabase() {
  // Load existing database
  db = loadDatabase()

  // Initialize with sample data if empty
  if (db.templates.length === 0) {
    db.templates = [
      { id: 'tpl-1', name: 'LMA Term Loan Agreement', category: 'Standard', version: '2024.1', compliant: 1, usage_count: 156 },
      { id: 'tpl-2', name: 'Revolving Credit Facility', category: 'Standard', version: '2024.1', compliant: 1, usage_count: 89 },
      { id: 'tpl-3', name: 'Syndicated Loan Agreement', category: 'Standard', version: '2024.1', compliant: 1, usage_count: 124 },
      { id: 'tpl-4', name: 'Green Loan Agreement', category: 'Specialized', version: '2024.2', compliant: 1, usage_count: 45 },
    ]
  }

  if (db.deals.length === 0) {
    db.deals = [
      { id: 'deal-1', name: 'Renewable Energy Facility', borrower: 'GreenPower Corp', amount: 500, currency: 'EUR', type: 'Term Loan', sector: 'Energy', status: 'in-progress', stage: 'Documentation', progress: 65, spread: 175, term: '5 years', start_date: '2024-01-15', expected_close: '2024-03-15', participants: 8, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 'deal-2', name: 'Infrastructure Loan', borrower: 'InfraBuild Ltd', amount: 250, currency: 'GBP', type: 'Term Loan', sector: 'Infrastructure', status: 'pending', stage: 'Due Diligence', progress: 40, spread: 185, term: '7 years', start_date: '2024-01-10', expected_close: '2024-04-10', participants: 5, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 'deal-3', name: 'Corporate Refinancing', borrower: 'TechGlobal Inc', amount: 300, currency: 'USD', type: 'Revolving Credit', sector: 'Technology', status: 'attention', stage: 'Pricing Review', progress: 80, spread: 165, term: '3 years', start_date: '2024-01-05', expected_close: '2024-02-20', participants: 12, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    ]
  }

  if (db.loan_listings.length === 0) {
    db.loan_listings = [
      { id: 'listing-1', borrower: 'TechCorp Industries', loan_id: 'LN-2024-001', amount: 50, remaining: 42, price: 98.5, spread: 175, sector: 'Technology', status: 'active', views: 24, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 'listing-2', borrower: 'GreenEnergy Solutions', loan_id: 'LN-2024-015', amount: 75, remaining: 68, price: 99.2, spread: 165, sector: 'Energy', status: 'active', views: 18, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 'listing-3', borrower: 'InfraBuild Ltd', loan_id: 'LN-2024-028', amount: 120, remaining: 95, price: 97.8, spread: 185, sector: 'Infrastructure', status: 'active', views: 31, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    ]
  }

  if (db.green_loans.length === 0) {
    db.green_loans = [
      { id: 'green-1', name: 'Solar Farm Development', borrower: 'SunPower Energy', amount: 150, category: 'Renewable Energy', esg_score: 92, carbon_reduction: '25kt CO₂/year', status: 'active', created_at: new Date().toISOString() },
      { id: 'green-2', name: 'Green Building Retrofit', borrower: 'EcoBuild Corp', amount: 85, category: 'Green Buildings', esg_score: 88, carbon_reduction: '12kt CO₂/year', status: 'active', created_at: new Date().toISOString() },
      { id: 'green-3', name: 'Electric Vehicle Fleet', borrower: 'CleanTransport Ltd', amount: 45, category: 'Clean Transport', esg_score: 85, carbon_reduction: '8kt CO₂/year', status: 'pending', created_at: new Date().toISOString() },
    ]
  }

  if (db.esg_targets.length === 0) {
    db.esg_targets = [
      { id: 'targets-1', green_loans_target: 1500, esg_compliance_target: 95, carbon_reduction_target: 50, sdg_goals_target: 15, updated_at: new Date().toISOString() },
    ]
  }

  saveDatabase()
  console.log('✅ Database initialized successfully')
}
