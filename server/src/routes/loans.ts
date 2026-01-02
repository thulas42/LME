import express from 'express'
import { database } from '../db/database'

const router = express.Router()

router.get('/market-intelligence', (req, res) => {
  try {
    const deals = database.getDeals()
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const recentDeals = deals.filter(d => new Date(d.created_at) >= sixMonthsAgo)
    const trends = recentDeals.reduce((acc: any, deal) => {
      const month = new Date(deal.created_at).toISOString().slice(0, 7)
      if (!acc[month]) {
        acc[month] = { month, deals: 0, volume: 0 }
      }
      acc[month].deals++
      acc[month].volume += deal.amount || 0
      return acc
    }, {})

    const pricing = deals.reduce((acc: any, deal) => {
      if (!deal.sector) return acc
      if (!acc[deal.sector]) {
        acc[deal.sector] = { sector: deal.sector, spreads: [], deals: 0, volume: 0 }
      }
      if (deal.spread) acc[deal.sector].spreads.push(deal.spread)
      acc[deal.sector].deals++
      acc[deal.sector].volume += deal.amount || 0
      return acc
    }, {})

    const pricingBySector = Object.values(pricing).map((p: any) => ({
      sector: p.sector,
      avg_spread: p.spreads.length > 0
        ? p.spreads.reduce((sum: number, s: number) => sum + s, 0) / p.spreads.length
        : 0,
      deals: p.deals,
      volume: p.volume,
    }))

    res.json({
      trends: Object.values(trends),
      pricing: pricingBySector,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/dashboard/stats', (req, res) => {
  try {
    const deals = database.getDeals()
    const activeDeals = deals.filter(d => d.status !== 'completed')
    
    res.json({
      totalDealVolume: activeDeals.reduce((sum, d) => sum + (d.amount || 0), 0),
      activeDeals: deals.filter(d => d.status === 'in-progress').length,
      participants: deals.reduce((sum, d) => sum + (d.participants || 0), 0),
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
