import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db/database'

const router = express.Router()

// Get all documents
router.get('/', (req, res) => {
  try {
    const documents = db.prepare('SELECT * FROM documents ORDER BY last_modified DESC').all()
    res.json(documents)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get document by ID
router.get('/:id', (req, res) => {
  try {
    const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(req.params.id)
    if (!document) {
      return res.status(404).json({ error: 'Document not found' })
    }
    res.json(document)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get all templates
router.get('/templates/all', (req, res) => {
  try {
    const templates = db.prepare('SELECT * FROM templates ORDER BY usage_count DESC').all()
    res.json(templates)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get template by ID
router.get('/templates/:id', (req, res) => {
  try {
    const template = db.prepare('SELECT * FROM templates WHERE id = ?').get(req.params.id)
    if (!template) {
      return res.status(404).json({ error: 'Template not found' })
    }
    res.json(template)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create document from template
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

    const template = db.prepare('SELECT * FROM templates WHERE id = ?').get(templateId)
    if (!template) {
      return res.status(404).json({ error: 'Template not found' })
    }

    const id = uuidv4()
    const version = 'v1.0'
    const documentName = `${template.name} - ${borrowerName}`

    // Create document
    const insert = db.prepare(`
      INSERT INTO documents (
        id, name, deal_id, category, template_id, status, version, created_by
      ) VALUES (?, ?, ?, ?, ?, 'pending', ?, 'System')
    `)

    insert.run(
      id,
      documentName,
      dealId,
      template.category,
      templateId,
      version
    )

    // Update template usage count
    db.prepare('UPDATE templates SET usage_count = usage_count + 1 WHERE id = ?').run(templateId)

    const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
    res.status(201).json(document)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Upload document
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

    const id = uuidv4()
    const insert = db.prepare(`
      INSERT INTO documents (
        id, name, deal_id, category, status, version, created_by
      ) VALUES (?, ?, ?, ?, 'pending', 'v1.0', 'User')
    `)

    insert.run(id, name, dealId || null, category)

    const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
    res.status(201).json(document)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Update document
router.put('/:id', (req, res) => {
  try {
    const { status, version } = req.body

    const update = db.prepare(`
      UPDATE documents
      SET status = COALESCE(?, status),
          version = COALESCE(?, version),
          last_modified = CURRENT_TIMESTAMP
      WHERE id = ?
    `)

    update.run(status, version, req.params.id)

    const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(req.params.id)
    if (!document) {
      return res.status(404).json({ error: 'Document not found' })
    }

    res.json(document)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Delete document
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM documents WHERE id = ?').run(req.params.id)
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Document not found' })
    }
    res.json({ message: 'Document deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get document statistics
router.get('/stats/summary', (req, res) => {
  try {
    const stats = db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'review' THEN 1 ELSE 0 END) as review
      FROM documents
    `).get()

    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

