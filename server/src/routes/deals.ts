import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db/database'

const router = express.Router()

// Get all deals
router.get('/', (req, res) => {
  try {
    const deals = db.prepare('SELECT * FROM deals ORDER BY created_at DESC').all()
    res.json(deals)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get deal by ID
router.get('/:id', (req, res) => {
  try {
    const deal = db.prepare('SELECT * FROM deals WHERE id = ?').get(req.params.id)
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' })
    }
    res.json(deal)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create new deal
router.post('/', (req, res) => {
  try {
    const {
      name,
      borrower,
      amount,
      currency,
      type,
      sector,
      purpose,
    } = req.body

    if (!name || !borrower || !amount) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const id = uuidv4()
    const insert = db.prepare(`
      INSERT INTO deals (
        id, name, borrower, amount, currency, type, sector, purpose, status, stage, progress
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'in-progress', 'Initiation', 0)
    `)

    insert.run(
      id,
      name,
      borrower,
      amount,
      currency || 'USD',
      type || 'Term Loan',
      sector || '',
      purpose || ''
    )

    const deal = db.prepare('SELECT * FROM deals WHERE id = ?').get(id)
    res.status(201).json(deal)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Update deal
router.put('/:id', (req, res) => {
  try {
    const {
      status,
      stage,
      progress,
      spread,
      term,
      participants,
    } = req.body

    const update = db.prepare(`
      UPDATE deals
      SET status = COALESCE(?, status),
          stage = COALESCE(?, stage),
          progress = COALESCE(?, progress),
          spread = COALESCE(?, spread),
          term = COALESCE(?, term),
          participants = COALESCE(?, participants),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)

    update.run(status, stage, progress, spread, term, participants, req.params.id)

    const deal = db.prepare('SELECT * FROM deals WHERE id = ?').get(req.params.id)
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' })
    }

    res.json(deal)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Delete deal
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM deals WHERE id = ?').run(req.params.id)
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Deal not found' })
    }
    res.json({ message: 'Deal deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get deal statistics
router.get('/stats/summary', (req, res) => {
  try {
    const stats = db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'attention' THEN 1 ELSE 0 END) as attention,
        SUM(amount) as total_value,
        AVG(progress) as avg_progress
      FROM deals
    `).get()

    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

