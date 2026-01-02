import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db/database'

const router = express.Router()

// Get all applications
router.get('/', (req, res) => {
  try {
    const applications = db.prepare('SELECT * FROM applications ORDER BY created_at DESC').all()
    res.json(applications)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get application by ID
router.get('/:id', (req, res) => {
  try {
    const application = db.prepare('SELECT * FROM applications WHERE id = ?').get(req.params.id)
    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }
    res.json(application)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create new application
router.post('/', (req, res) => {
  try {
    const {
      borrowerName,
      borrowerType,
      loanAmount,
      currency,
      loanType,
      sector,
      loanPurpose,
    } = req.body

    if (!borrowerName || !loanAmount || !sector) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const id = uuidv4()
    const insert = db.prepare(`
      INSERT INTO applications (
        id, borrower_name, borrower_type, loan_amount, currency,
        loan_type, sector, loan_purpose, status, current_step
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 1)
    `)

    insert.run(
      id,
      borrowerName,
      borrowerType || 'Corporate',
      loanAmount,
      currency || 'USD',
      loanType || 'Term Loan',
      sector,
      loanPurpose || ''
    )

    const application = db.prepare('SELECT * FROM applications WHERE id = ?').get(id)
    res.status(201).json(application)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Update application
router.put('/:id', (req, res) => {
  try {
    const {
      status,
      currentStep,
      creditScore,
      debtToIncome,
      riskLevel,
    } = req.body

    const update = db.prepare(`
      UPDATE applications
      SET status = COALESCE(?, status),
          current_step = COALESCE(?, current_step),
          credit_score = COALESCE(?, credit_score),
          debt_to_income = COALESCE(?, debt_to_income),
          risk_level = COALESCE(?, risk_level),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)

    update.run(status, currentStep, creditScore, debtToIncome, riskLevel, req.params.id)

    const application = db.prepare('SELECT * FROM applications WHERE id = ?').get(req.params.id)
    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }

    res.json(application)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Delete application
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM applications WHERE id = ?').run(req.params.id)
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Application not found' })
    }
    res.json({ message: 'Application deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get application statistics
router.get('/stats/summary', (req, res) => {
  try {
    const stats = db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
        AVG(credit_score) as avg_credit_score
      FROM applications
    `).get()

    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

