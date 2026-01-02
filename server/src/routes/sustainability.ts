import express from 'express'
import { database } from '../db/database'

const router = express.Router()

/**
 * @swagger
 * /api/sustainability/green-loans:
 *   get:
 *     summary: Get all green loans
 *     tags: [Sustainability]
 */
router.get('/green-loans', (req, res) => {
  try {
    const loans = database.getGreenLoans().sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    res.json(loans)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/green-loans/:id', (req, res) => {
  try {
    const loan = database.getGreenLoan(req.params.id)
    if (!loan) {
      return res.status(404).json({ error: 'Green loan not found' })
    }
    res.json(loan)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * @swagger
 * /api/sustainability/targets:
 *   get:
 *     summary: Get ESG targets
 *     tags: [Sustainability]
 */
router.get('/targets', (req, res) => {
  try {
    const targets = database.getESGTargets()
    if (!targets) {
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

/**
 * @swagger
 * /api/sustainability/targets:
 *   put:
 *     summary: Update ESG targets
 *     tags: [Sustainability]
 */
router.put('/targets', (req, res) => {
  try {
    const {
      greenLoans,
      esgCompliance,
      carbonReduction,
      sdgGoals,
    } = req.body

    const targets = database.updateESGTargets({
      green_loans_target: greenLoans,
      esg_compliance_target: esgCompliance,
      carbon_reduction_target: carbonReduction,
      sdg_goals_target: sdgGoals,
    })
    res.json(targets)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/stats', (req, res) => {
  try {
    const loans = database.getGreenLoans().filter(l => l.status === 'active')
    const targets = database.getESGTargets()

    const stats = {
      current: {
        total_green_loans: loans.length,
        total_green_volume: loans.reduce((sum, l) => sum + (l.amount || 0), 0),
        avg_esg_score: loans.length > 0
          ? loans.reduce((sum, l) => sum + (l.esg_score || 0), 0) / loans.length
          : 0,
      },
      targets: targets || {
        green_loans_target: 1500,
        esg_compliance_target: 95,
        carbon_reduction_target: 50,
        sdg_goals_target: 15,
      },
    }

    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
