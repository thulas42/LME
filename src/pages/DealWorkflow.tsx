import { Plus, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import DealPipeline from '../components/DealPipeline'
import DealDetails from '../components/DealDetails'

export default function DealWorkflow() {
  return (
    <div className="deal-workflow">
      <div className="page-header">
        <div>
          <h1>Deal Workflow</h1>
          <p className="subtitle">Manage loan origination, documentation, and execution</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="btn-icon" />
          New Deal
        </button>
      </div>

      <div className="workflow-stats">
        <div className="workflow-stat">
          <div className="stat-icon pending">
            <Clock />
          </div>
          <div className="stat-info">
            <span className="stat-value">12</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
        <div className="workflow-stat">
          <div className="stat-icon completed">
            <CheckCircle />
          </div>
          <div className="stat-info">
            <span className="stat-value">8</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        <div className="workflow-stat">
          <div className="stat-icon warning">
            <AlertTriangle />
          </div>
          <div className="stat-info">
            <span className="stat-value">3</span>
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

