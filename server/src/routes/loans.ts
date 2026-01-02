import express from 'express'
import { db } from '../db/database'

const router = express.Router()

// Get market intelligence data
router.get('/market-intelligence', (req, res) => {
  try {
    // Get market trends (last 6 months)
    const trends = db.prepare(`
      SELECT 
        strftime('%Y-%m', created_at) as month,
        COUNT(*) as deals,
        SUM(amount) as volume
      FROM deals
      WHERE created_at >= datetime('now', '-6 months')
      GROUP BY strftime('%Y-%m', created_at)
      ORDER BY month
    `).all()

    // Get pricing by sector
    const pricing = db.prepare(`
      SELECT 
        sector,
        AVG(spread) as avg_spread,
        COUNT(*) as deals,
        SUM(amount) as volume
      FROM deals
      WHERE sector IS NOT NULL AND sector != ''
      GROUP BY sector
    `).all()

    res.json({
      trends,
      pricing,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get dashboard statistics
router.get('/dashboard/stats', (req, res) => {
  try {
    const dealVolume = db.prepare(`
      SELECT SUM(amount) as total_volume
      FROM deals
      WHERE status != 'completed'
    `).get() as { total_volume: number }

    const activeDeals = db.prepare(`
      SELECT COUNT(*) as count
      FROM deals
      WHERE status = 'in-progress'
    `).get() as { count: number }

    const participants = db.prepare(`
      SELECT SUM(participants) as total
      FROM deals
    `).get() as { total: number }

    res.json({
      totalDealVolume: dealVolume.total_volume || 0,
      activeDeals: activeDeals.count || 0,
      participants: participants.total || 0,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

