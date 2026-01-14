import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import { initDatabase } from './db/database'
import loansRouter from './routes/loans'
import documentsRouter from './routes/documents'
import tradingRouter from './routes/trading'
import applicationsRouter from './routes/applications'
import dealsRouter from './routes/deals'
import analyticsRouter from './routes/analytics'
import sustainabilityRouter from './routes/sustainability'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for public deployment
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'CreditEdge API Documentation',
}))

// Initialize database
initDatabase()

// Routes
app.use('/api/loans', loansRouter)
app.use('/api/documents', documentsRouter)
app.use('/api/trading', tradingRouter)
app.use('/api/applications', applicationsRouter)
app.use('/api/deals', dealsRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/sustainability', sustainabilityRouter)

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: CreditEdge API is running
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CreditEdge API is running' })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 CreditEdge API server running on http://localhost:${PORT}`)
  console.log(`📚 Swagger API Documentation: http://localhost:${PORT}/api-docs`)
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`)
})

