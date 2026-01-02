import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { database } from '../db/database'

const router = express.Router()

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: List of all applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 */
router.get('/', (req, res) => {
  try {
    const applications = database.getApplications().sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    res.json(applications)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Get application by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     responses:
 *       200:
 *         description: Application details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       404:
 *         description: Application not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', (req, res) => {
  try {
    const application = database.getApplication(req.params.id)
    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }
    res.json(application)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Create a new application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - borrowerName
 *               - loanAmount
 *               - sector
 *             properties:
 *               borrowerName:
 *                 type: string
 *                 example: TechCorp Industries
 *               borrowerType:
 *                 type: string
 *                 example: Corporate
 *               loanAmount:
 *                 type: number
 *                 example: 50000000
 *               currency:
 *                 type: string
 *                 example: USD
 *               loanType:
 *                 type: string
 *                 example: Term Loan
 *               sector:
 *                 type: string
 *                 example: Technology
 *               loanPurpose:
 *                 type: string
 *                 example: Working capital
 *     responses:
 *       201:
 *         description: Application created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

    const application = database.createApplication({
      borrower_name: borrowerName,
      borrower_type: borrowerType || 'Corporate',
      loan_amount: loanAmount,
      currency: currency || 'USD',
      loan_type: loanType || 'Term Loan',
      sector,
      loan_purpose: loanPurpose || '',
      status: 'pending',
      current_step: 1,
    })
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

    const updateData: any = {}
    if (status !== undefined) updateData.status = status
    if (currentStep !== undefined) updateData.current_step = currentStep
    if (creditScore !== undefined) updateData.credit_score = creditScore
    if (debtToIncome !== undefined) updateData.debt_to_income = debtToIncome
    if (riskLevel !== undefined) updateData.risk_level = riskLevel

    const application = database.updateApplication(req.params.id, updateData)
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
    const deleted = database.deleteApplication(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Application not found' })
    }
    res.json({ message: 'Application deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * @swagger
 * /api/applications/stats/summary:
 *   get:
 *     summary: Get application statistics
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: Application statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 pending:
 *                   type: number
 *                 approved:
 *                   type: number
 *                 rejected:
 *                   type: number
 *                 avg_credit_score:
 *                   type: number
 */
router.get('/stats/summary', (req, res) => {
  try {
    const applications = database.getApplications()
    const stats = {
      total: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      approved: applications.filter(app => app.status === 'approved').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      avg_credit_score: applications.length > 0
        ? applications.reduce((sum, app) => sum + (app.credit_score || 0), 0) / applications.length
        : 0,
    }

    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

