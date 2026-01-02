import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { database } from '../db/database'

const router = express.Router()

/**
 * @swagger
 * /api/deals:
 *   get:
 *     summary: Get all deals
 *     tags: [Deals]
 *     responses:
 *       200:
 *         description: List of all deals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deal'
 */
router.get('/', (req, res) => {
  try {
    const deals = database.getDeals().sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    res.json(deals)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', (req, res) => {
  try {
    const deal = database.getDeal(req.params.id)
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' })
    }
    res.json(deal)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * @swagger
 * /api/deals:
 *   post:
 *     summary: Create a new deal
 *     tags: [Deals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - borrower
 *               - amount
 *             properties:
 *               name:
 *                 type: string
 *                 example: Renewable Energy Facility
 *               borrower:
 *                 type: string
 *                 example: GreenPower Corp
 *               amount:
 *                 type: number
 *                 example: 500000000
 *               currency:
 *                 type: string
 *                 example: EUR
 *               type:
 *                 type: string
 *                 example: Term Loan
 *               sector:
 *                 type: string
 *                 example: Energy
 *               purpose:
 *                 type: string
 *                 example: Project financing
 *     responses:
 *       201:
 *         description: Deal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deal'
 *       400:
 *         description: Missing required fields
 */
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

    const deal = database.createDeal({
      name,
      borrower,
      amount,
      currency: currency || 'USD',
      type: type || 'Term Loan',
      sector: sector || '',
      purpose: purpose || '',
      status: 'in-progress',
      stage: 'Initiation',
      progress: 0,
    })
    res.status(201).json(deal)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

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

    const updateData: any = {}
    if (status !== undefined) updateData.status = status
    if (stage !== undefined) updateData.stage = stage
    if (progress !== undefined) updateData.progress = progress
    if (spread !== undefined) updateData.spread = spread
    if (term !== undefined) updateData.term = term
    if (participants !== undefined) updateData.participants = participants

    const deal = database.updateDeal(req.params.id, updateData)
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' })
    }

    res.json(deal)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', (req, res) => {
  try {
    const deleted = database.deleteDeal(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Deal not found' })
    }
    res.json({ message: 'Deal deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/stats/summary', (req, res) => {
  try {
    const deals = database.getDeals()
    const stats = {
      total: deals.length,
      in_progress: deals.filter(d => d.status === 'in-progress').length,
      completed: deals.filter(d => d.status === 'completed').length,
      attention: deals.filter(d => d.status === 'attention').length,
      total_value: deals.reduce((sum, d) => sum + (d.amount || 0), 0),
      avg_progress: deals.length > 0
        ? deals.reduce((sum, d) => sum + (d.progress || 0), 0) / deals.length
        : 0,
    }

    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
