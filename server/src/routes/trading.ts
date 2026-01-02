import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db/database'

const router = express.Router()

// Get all loan listings
router.get('/listings', (req, res) => {
  try {
    const { sector, status, minAmount, maxAmount } = req.query
    
    let query = 'SELECT * FROM loan_listings WHERE 1=1'
    const params: any[] = []

    if (sector) {
      query += ' AND sector = ?'
      params.push(sector)
    }
    if (status) {
      query += ' AND status = ?'
      params.push(status)
    }
    if (minAmount) {
      query += ' AND amount >= ?'
      params.push(minAmount)
    }
    if (maxAmount) {
      query += ' AND amount <= ?'
      params.push(maxAmount)
    }

    query += ' ORDER BY created_at DESC'

    const listings = db.prepare(query).all(...params)
    res.json(listings)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get listing by ID
router.get('/listings/:id', (req, res) => {
  try {
    const listing = db.prepare('SELECT * FROM loan_listings WHERE id = ?').get(req.params.id)
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' })
    }
    
    // Increment views
    db.prepare('UPDATE loan_listings SET views = views + 1 WHERE id = ?').run(req.params.id)
    
    const updated = db.prepare('SELECT * FROM loan_listings WHERE id = ?').get(req.params.id)
    res.json(updated)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create new listing
router.post('/listings', (req, res) => {
  try {
    const {
      borrower,
      loanId,
      amount,
      remaining,
      price,
      spread,
      sector,
    } = req.body

    if (!borrower || !loanId || !amount || !price || !spread || !sector) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const id = uuidv4()
    const insert = db.prepare(`
      INSERT INTO loan_listings (
        id, borrower, loan_id, amount, remaining, price, spread, sector, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
    `)

    insert.run(
      id,
      borrower,
      loanId,
      amount,
      remaining || amount,
      price,
      spread,
      sector
    )

    const listing = db.prepare('SELECT * FROM loan_listings WHERE id = ?').get(id)
    res.status(201).json(listing)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get trading activity
router.get('/activity', (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10
    const activities = db.prepare(`
      SELECT * FROM trading_activity
      ORDER BY created_at DESC
      LIMIT ?
    `).all(limit)
    res.json(activities)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Record trading activity
router.post('/activity', (req, res) => {
  try {
    const {
      loanId,
      borrower,
      amount,
      price,
      buyer,
      seller,
    } = req.body

    if (!loanId || !borrower || !amount || !price || !buyer || !seller) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const id = uuidv4()
    const insert = db.prepare(`
      INSERT INTO trading_activity (
        id, loan_id, borrower, amount, price, buyer, seller
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    insert.run(id, loanId, borrower, amount, price, buyer, seller)

    const activity = db.prepare('SELECT * FROM trading_activity WHERE id = ?').get(id)
    res.status(201).json(activity)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get trading statistics
router.get('/stats/summary', (req, res) => {
  try {
    const stats = db.prepare(`
      SELECT
        COUNT(*) as total_listings,
        SUM(amount) as total_volume,
        AVG(price) as avg_price,
        COUNT(DISTINCT borrower) as unique_borrowers
      FROM loan_listings
      WHERE status = 'active'
    `).get()

    const activityStats = db.prepare(`
      SELECT
        COUNT(*) as total_trades,
        SUM(amount) as trading_volume,
        AVG(price) as avg_trade_price
      FROM trading_activity
      WHERE DATE(created_at) = DATE('now')
    `).get()

    res.json({
      listings: stats,
      activity: activityStats,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

