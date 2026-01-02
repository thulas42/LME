import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { database } from '../db/database'

const router = express.Router()

/**
 * @swagger
 * /api/trading/listings:
 *   get:
 *     summary: Get all loan listings
 *     tags: [Trading]
 */
router.get('/listings', (req, res) => {
  try {
    const listings = database.getListings(req.query)
    res.json(listings)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/listings/:id', (req, res) => {
  try {
    const listing = database.getListing(req.params.id)
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' })
    }
    
    database.updateListing(req.params.id, { views: (listing.views || 0) + 1 })
    const updated = database.getListing(req.params.id)
    res.json(updated)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

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

    const listing = database.createListing({
      borrower,
      loan_id: loanId,
      amount,
      remaining: remaining || amount,
      price,
      spread,
      sector,
      status: 'active',
      views: 0,
    })
    res.status(201).json(listing)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/activity', (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10
    const activities = database.getActivity(limit)
    res.json(activities)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

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

    const activity = database.createActivity({
      loan_id: loanId,
      borrower,
      amount,
      price,
      buyer,
      seller,
    })
    res.status(201).json(activity)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/stats/summary', (req, res) => {
  try {
    const listings = database.getListings({ status: 'active' })
    const activities = database.getActivity()
    const today = new Date().toISOString().split('T')[0]
    const todayActivities = activities.filter(a => a.created_at.startsWith(today))

    const stats = {
      listings: {
        total_listings: listings.length,
        total_volume: listings.reduce((sum, l) => sum + (l.amount || 0), 0),
        avg_price: listings.length > 0
          ? listings.reduce((sum, l) => sum + (l.price || 0), 0) / listings.length
          : 0,
        unique_borrowers: new Set(listings.map(l => l.borrower)).size,
      },
      activity: {
        total_trades: todayActivities.length,
        trading_volume: todayActivities.reduce((sum, a) => sum + (a.amount || 0), 0),
        avg_trade_price: todayActivities.length > 0
          ? todayActivities.reduce((sum, a) => sum + (a.price || 0), 0) / todayActivities.length
          : 0,
      },
    }

    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
