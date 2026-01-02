import express from 'express'
import { db } from '../db/database'

const router = express.Router()

// Get performance metrics
router.get('/performance', (req, res) => {
  try {
    const metrics = db.prepare(`
      SELECT 
        strftime('%Y-%m', created_at) as month,
        AVG(progress) as avg_progress,
        COUNT(*) as deals_completed
      FROM deals
      WHERE created_at >= datetime('now', '-6 months')
      GROUP BY strftime('%Y-%m', created_at)
      ORDER BY month
    `).all()

    res.json(metrics)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get portfolio analysis
router.get('/portfolio', (req, res) => {
  try {
    const portfolio = db.prepare(`
      SELECT 
        sector,
        COUNT(*) as count,
        SUM(amount) as total_amount
      FROM deals
      WHERE sector IS NOT NULL AND sector != ''
      GROUP BY sector
    `).all()

    res.json(portfolio)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get risk metrics
router.get('/risk', (req, res) => {
  try {
    const riskMetrics = db.prepare(`
      SELECT 
        risk_level,
        COUNT(*) as count,
        AVG(credit_score) as avg_credit_score
      FROM applications
      WHERE risk_level IS NOT NULL
      GROUP BY risk_level
    `).all()

    res.json(riskMetrics)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

