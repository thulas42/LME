import express from 'express'
import { database } from '../db/database'

const router = express.Router()

router.get('/performance', (req, res) => {
  try {
    const deals = database.getDeals()
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const recentDeals = deals.filter(d => new Date(d.created_at) >= sixMonthsAgo)
    const metrics = recentDeals.reduce((acc: any, deal) => {
      const month = new Date(deal.created_at).toISOString().slice(0, 7)
      if (!acc[month]) {
        acc[month] = { month, progresses: [], deals_completed: 0 }
      }
      if (deal.progress) acc[month].progresses.push(deal.progress)
      if (deal.status === 'completed') acc[month].deals_completed++
      return acc
    }, {})

    const result = Object.values(metrics).map((m: any) => ({
      month: m.month,
      avg_progress: m.progresses.length > 0
        ? m.progresses.reduce((sum: number, p: number) => sum + p, 0) / m.progresses.length
        : 0,
      deals_completed: m.deals_completed,
    }))

    res.json(result)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/portfolio', (req, res) => {
  try {
    const deals = database.getDeals()
    const portfolio = deals.reduce((acc: any, deal) => {
      if (!deal.sector) return acc
      if (!acc[deal.sector]) {
        acc[deal.sector] = { sector: deal.sector, count: 0, total_amount: 0 }
      }
      acc[deal.sector].count++
      acc[deal.sector].total_amount += deal.amount || 0
      return acc
    }, {})

    res.json(Object.values(portfolio))
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/risk', (req, res) => {
  try {
    const applications = database.getApplications()
    const riskMetrics = applications
      .filter(app => app.risk_level)
      .reduce((acc: any, app) => {
        if (!acc[app.risk_level]) {
          acc[app.risk_level] = { risk_level: app.risk_level, count: 0, scores: [] }
        }
        acc[app.risk_level].count++
        if (app.credit_score) acc[app.risk_level].scores.push(app.credit_score)
        return acc
      }, {})

    const result = Object.values(riskMetrics).map((m: any) => ({
      risk_level: m.risk_level,
      count: m.count,
      avg_credit_score: m.scores.length > 0
        ? m.scores.reduce((sum: number, s: number) => sum + s, 0) / m.scores.length
        : 0,
    }))

    res.json(result)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
