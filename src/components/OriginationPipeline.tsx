import { useEffect, useState } from 'react'
import { Clock, CheckCircle, AlertTriangle, FileText, DollarSign } from 'lucide-react'
import { applicationsAPI } from '../services/api'

export default function OriginationPipeline() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await applicationsAPI.getAll()
      setApplications(response.data.slice(0, 3)) // Show first 3
    } catch (error) {
      console.error('Error fetching applications:', error)
      // Fallback to empty array
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  const handleApplicationClick = (app: any) => {
    console.log('Viewing application:', app.borrower_name)
  }

  const formatAmount = (amount: number, currency: string) => {
    const formatted = (amount / 1000000).toFixed(0)
    return `${currency}${formatted}M`
  }

  const getDaysInPipeline = (createdAt: string) => {
    const created = new Date(createdAt)
    const now = new Date()
    const diff = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Application Pipeline</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading applications...
          </div>
        ) : applications.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No applications in pipeline
          </div>
        ) : (
          <div className="pipeline-list">
            {applications.map((app) => (
              <div
                key={app.id}
                className={`pipeline-item ${app.status}`}
                onClick={() => handleApplicationClick(app)}
                style={{ cursor: 'pointer' }}
              >
                <div className="pipeline-header">
                  <div className="pipeline-title-section">
                    <FileText className="pipeline-icon" />
                    <div>
                      <div className="pipeline-name">{app.borrower_name}</div>
                      <div className="pipeline-type">{app.loan_type}</div>
                    </div>
                  </div>
                  <div className="pipeline-amount">{formatAmount(app.loan_amount, app.currency === 'USD' ? '$' : app.currency === 'EUR' ? '€' : '£')}</div>
                </div>
                <div className="pipeline-body">
                  <div className="pipeline-stage">Step {app.current_step}</div>
                  <div className="pipeline-meta">
                    <span className="pipeline-days">{getDaysInPipeline(app.created_at)} days in pipeline</span>
                    {app.risk_level && (
                      <span className={`risk-badge ${app.risk_level}`}>
                        {app.risk_level.charAt(0).toUpperCase() + app.risk_level.slice(1)} Risk
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

