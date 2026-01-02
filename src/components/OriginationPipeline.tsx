import { Clock, CheckCircle, AlertTriangle, FileText, DollarSign } from 'lucide-react'

const applications = [
  {
    id: 1,
    borrower: 'TechCorp Industries',
    amount: '$50M',
    type: 'Term Loan',
    status: 'under-review',
    stage: 'Credit Assessment',
    daysInPipeline: 2,
    riskLevel: 'low',
  },
  {
    id: 2,
    borrower: 'GreenEnergy Solutions',
    amount: '$75M',
    type: 'Revolving Credit',
    status: 'pending',
    stage: 'Documentation',
    daysInPipeline: 5,
    riskLevel: 'medium',
  },
  {
    id: 3,
    borrower: 'InfraBuild Ltd',
    amount: '$120M',
    type: 'Syndicated Loan',
    status: 'approved',
    stage: 'Final Review',
    daysInPipeline: 8,
    riskLevel: 'low',
  },
]

export default function OriginationPipeline() {
  const handleApplicationClick = (app: typeof applications[0]) => {
    console.log('Viewing application:', app.borrower)
    // In a real app, this would navigate to application details
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Application Pipeline</h2>
      </div>
      <div className="card-body">
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
                    <div className="pipeline-name">{app.borrower}</div>
                    <div className="pipeline-type">{app.type}</div>
                  </div>
                </div>
                <div className="pipeline-amount">{app.amount}</div>
              </div>
              <div className="pipeline-body">
                <div className="pipeline-stage">{app.stage}</div>
                <div className="pipeline-meta">
                  <span className="pipeline-days">{app.daysInPipeline} days in pipeline</span>
                  <span className={`risk-badge ${app.riskLevel}`}>
                    {app.riskLevel.charAt(0).toUpperCase() + app.riskLevel.slice(1)} Risk
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

