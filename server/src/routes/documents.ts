import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { database } from '../db/database'

const router = express.Router()

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Get all documents
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: List of all documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 */
router.get('/', (req, res) => {
  try {
    const documents = database.getDocuments().sort((a, b) => 
      new Date(b.last_modified).getTime() - new Date(a.last_modified).getTime()
    )
    res.json(documents)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', (req, res) => {
  try {
    const document = database.getDocument(req.params.id)
    if (!document) {
      return res.status(404).json({ error: 'Document not found' })
    }
    res.json(document)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * @swagger
 * /api/documents/templates/all:
 *   get:
 *     summary: Get all document templates
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: List of all templates
 */
router.get('/templates/all', (req, res) => {
  try {
    const templates = database.getTemplates().sort((a, b) => (b.usage_count || 0) - (a.usage_count || 0))
    res.json(templates)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/templates/:id', (req, res) => {
  try {
    const template = database.getTemplate(req.params.id)
    if (!template) {
      return res.status(404).json({ error: 'Template not found' })
    }
    res.json(template)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * @swagger
 * /api/documents/generate:
 *   post:
 *     summary: Generate document from template
 *     tags: [Documents]
 */
router.post('/generate', (req, res) => {
  try {
    const {
      templateId,
      dealId,
      borrowerName,
      loanAmount,
      currency,
      loanType,
    } = req.body

    if (!templateId || !dealId || !borrowerName || !loanAmount) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const template = database.getTemplate(templateId)
    if (!template) {
      return res.status(404).json({ error: 'Template not found' })
    }

    const documentName = `${template.name} - ${borrowerName}`
    const document = database.createDocument({
      name: documentName,
      deal_id: dealId,
      category: template.category,
      template_id: templateId,
      status: 'pending',
      version: 'v1.0',
      created_by: 'System',
    })

    database.updateTemplate(templateId, { usage_count: (template.usage_count || 0) + 1 })

    res.status(201).json(document)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/upload', (req, res) => {
  try {
    const {
      name,
      category,
      dealId,
    } = req.body

    if (!name || !category) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const document = database.createDocument({
      name,
      deal_id: dealId || null,
      category,
      status: 'pending',
      version: 'v1.0',
      created_by: 'User',
    })
    res.status(201).json(document)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id', (req, res) => {
  try {
    const { status, version } = req.body
    const updateData: any = {}
    if (status !== undefined) updateData.status = status
    if (version !== undefined) updateData.version = version

    const document = database.updateDocument(req.params.id, updateData)
    if (!document) {
      return res.status(404).json({ error: 'Document not found' })
    }

    res.json(document)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', (req, res) => {
  try {
    const deleted = database.deleteDocument(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Document not found' })
    }
    res.json({ message: 'Document deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/stats/summary', (req, res) => {
  try {
    const documents = database.getDocuments()
    const stats = {
      total: documents.length,
      approved: documents.filter(d => d.status === 'approved').length,
      pending: documents.filter(d => d.status === 'pending').length,
      review: documents.filter(d => d.status === 'review').length,
    }

    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
