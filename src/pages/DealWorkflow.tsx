import { useState, useEffect } from 'react'
import { Plus, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import DealPipeline from '../components/DealPipeline'
import DealDetails from '../components/DealDetails'
import NewDealModal from '../components/NewDealModal'
import { dealsAPI } from '../services/api'

export default function DealWorkflow() {
  const [showNewDeal, setShowNewDeal] = useState(false)
  const [workflowStats, setWorkflowStats] = useState({
    inProgress: 0,
    completed: 0,
    attention: 0,
  })

  useEffect(() => {
    fetchWorkflowStats()
  }, [])

  const fetchWorkflowStats = async () => {
    try {
      const response = await dealsAPI.getStats()
      setWorkflowStats({
        inProgress: response.data.in_progress || 0,
        completed: response.data.completed || 0,
        attention: response.data.attention || 0,
      })
    } catch (error) {
      console.error('Error fetching workflow stats:', error)
    }
  }

  const handleCreateDeal = async (deal: any) => {
    try {
      const response = await dealsAPI.create({
        name: deal.name,
        borrower: deal.borrower,
        amount: parseFloat(deal.amount),
        currency: deal.currency,
        type: deal.loanType,
        sector: deal.sector,
        purpose: deal.purpose,
      })
      console.log('Deal created:', response.data)
      await fetchWorkflowStats()
    } catch (error: any) {
      console.error('Error creating deal:', error)
      alert(error.message || 'Failed to create deal')
    }
  }

  return (
    <div className="deal-workflow">
      <div className="page-header">
        <div>
          <h1>Deal Workflow</h1>
          <p className="subtitle">Manage loan origination, documentation, and execution</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNewDeal(true)}>
          <Plus className="btn-icon" />
          New Deal
        </button>
      </div>

      {showNewDeal && (
        <NewDealModal
          onClose={() => setShowNewDeal(false)}
          onCreate={handleCreateDeal}
        />
      )}

      <div className="workflow-stats">
        <div className="workflow-stat">
          <div className="stat-icon pending">
            <Clock />
          </div>
          <div className="stat-info">
            <span className="stat-value">{workflowStats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
        <div className="workflow-stat">
          <div className="stat-icon completed">
            <CheckCircle />
          </div>
          <div className="stat-info">
            <span className="stat-value">{workflowStats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        <div className="workflow-stat">
          <div className="stat-icon warning">
            <AlertTriangle />
          </div>
          <div className="stat-info">
            <span className="stat-value">{workflowStats.attention}</span>
            <span className="stat-label">Requires Attention</span>
          </div>
        </div>
      </div>

      <div className="workflow-content">
        <div className="workflow-section">
          <DealPipeline />
        </div>
        <div className="workflow-section">
          <DealDetails />
        </div>
      </div>
    </div>
  )
}

