import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react'

const deals = [
  {
    id: 1,
    name: 'Renewable Energy Facility',
    borrower: 'GreenPower Corp',
    amount: '€500M',
    status: 'in-progress',
    stage: 'Documentation',
    progress: 65,
    daysRemaining: 12,
  },
  {
    id: 2,
    name: 'Infrastructure Loan',
    borrower: 'InfraBuild Ltd',
    amount: '£250M',
    status: 'pending',
    stage: 'Due Diligence',
    progress: 40,
    daysRemaining: 25,
  },
  {
    id: 3,
    name: 'Corporate Refinancing',
    borrower: 'TechGlobal Inc',
    amount: '$300M',
    status: 'attention',
    stage: 'Pricing Review',
    progress: 80,
    daysRemaining: 5,
  },
  {
    id: 4,
    name: 'Acquisition Financing',
    borrower: 'MergerCo Holdings',
    amount: '€400M',
    status: 'in-progress',
    stage: 'Syndication',
    progress: 50,
    daysRemaining: 18,
  },
]

export default function DealPipeline() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'attention':
        return AlertTriangle
      case 'pending':
        return Clock
      default:
        return FileText
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Deal Pipeline</h2>
      </div>
      <div className="card-body">
        <div className="deal-list">
          {deals.map((deal) => {
            const StatusIcon = getStatusIcon(deal.status)
            return (
              <div key={deal.id} className={`deal-item ${deal.status}`}>
                <div className="deal-header">
                  <div className="deal-title-section">
                    <StatusIcon className="deal-status-icon" />
                    <div>
                      <div className="deal-name">{deal.name}</div>
                      <div className="deal-borrower">{deal.borrower}</div>
                    </div>
                  </div>
                  <div className="deal-amount">{deal.amount}</div>
                </div>
                <div className="deal-body">
                  <div className="deal-stage">{deal.stage}</div>
                  <div className="deal-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${deal.progress}%` }}
                      />
                    </div>
                    <span className="progress-text">{deal.progress}%</span>
                  </div>
                  <div className="deal-footer">
                    <span className="days-remaining">{deal.daysRemaining} days remaining</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

