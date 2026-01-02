import express from 'express'
import { db } from '../db/database'

const router = express.Router()

// Get all green loans
router.get('/green-loans', (req, res) => {
  try {
    const loans = db.prepare('SELECT * FROM green_loans ORDER BY created_at DESC').all()
    res.json(loans)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get green loan by ID
router.get('/green-loans/:id', (req, res) => {
  try {
    const loan = db.prepare('SELECT * FROM green_loans WHERE id = ?').get(req.params.id)
    if (!loan) {
      return res.status(404).json({ error: 'Green loan not found' })
    }
    res.json(loan)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get ESG targets
router.get('/targets', (req, res) => {
  try {
    const targets = db.prepare('SELECT * FROM esg_targets ORDER BY updated_at DESC LIMIT 1').get()
    if (!targets) {
      // Return default targets if none exist
      return res.json({
        id: 'default',
        green_loans_target: 1500,
        esg_compliance_target: 95,
        carbon_reduction_target: 50,
        sdg_goals_target: 15,
      })
    }
    res.json(targets)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Update ESG targets
router.put('/targets', (req, res) => {
  try {
    const {
      greenLoans,
      esgCompliance,
      carbonReduction,
      sdgGoals,
    } = req.body

    // Check if targets exist
    const existing = db.prepare('SELECT * FROM esg_targets ORDER BY updated_at DESC LIMIT 1').get()

    if (existing) {
      const update = db.prepare(`
        UPDATE esg_targets
        SET green_loans_target = COALESCE(?, green_loans_target),
            esg_compliance_target = COALESCE(?, esg_compliance_target),
            carbon_reduction_target = COALESCE(?, carbon_reduction_target),
            sdg_goals_target = COALESCE(?, sdg_goals_target),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
      update.run(greenLoans, esgCompliance, carbonReduction, sdgGoals, existing.id)
    } else {
      const insert = db.prepare(`
        INSERT INTO esg_targets (id, green_loans_target, esg_compliance_target, carbon_reduction_target, sdg_goals_target)
        VALUES (?, ?, ?, ?, ?)
      `)
      insert.run('targets-1', greenLoans, esgCompliance, carbonReduction, sdgGoals)
    }

    const targets = db.prepare('SELECT * FROM esg_targets ORDER BY updated_at DESC LIMIT 1').get()
    res.json(targets)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get sustainability statistics
router.get('/stats', (req, res) => {
  try {
    const stats = db.prepare(`
      SELECT
        COUNT(*) as total_green_loans,
        SUM(amount) as total_green_volume,
        AVG(esg_score) as avg_esg_score
      FROM green_loans
      WHERE status = 'active'
    `).get()

    const targets = db.prepare('SELECT * FROM esg_targets ORDER BY updated_at DESC LIMIT 1').get()

    res.json({
      current: stats,
      targets: targets || {
        green_loans_target: 1500,
        esg_compliance_target: 95,
        carbon_reduction_target: 50,
        sdg_goals_target: 15,
      },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

