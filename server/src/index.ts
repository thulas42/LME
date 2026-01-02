import express from 'express'
import cors from 'cors'
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
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CreditEdge API is running' })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 CreditEdge API server running on http://localhost:${PORT}`)
})

