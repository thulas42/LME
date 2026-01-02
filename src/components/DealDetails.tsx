import { FileText, Calendar, Users, DollarSign, TrendingUp } from 'lucide-react'

const dealInfo = {
  name: 'Renewable Energy Facility',
  borrower: 'GreenPower Corp',
  amount: '€500M',
  status: 'In Progress',
  stage: 'Documentation',
  startDate: '2024-01-15',
  expectedClose: '2024-03-15',
  participants: 8,
  spread: '175 bps',
  term: '5 years',
  sector: 'Energy',
}

export default function DealDetails() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Deal Details</h2>
      </div>
      <div className="card-body">
        <div className="deal-details">
          <div className="detail-section">
            <div className="detail-item">
              <FileText className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Deal Name</span>
                <span className="detail-value">{dealInfo.name}</span>
              </div>
            </div>
            <div className="detail-item">
              <Users className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Borrower</span>
                <span className="detail-value">{dealInfo.borrower}</span>
              </div>
            </div>
            <div className="detail-item">
              <DollarSign className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Amount</span>
                <span className="detail-value">{dealInfo.amount}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-item">
              <TrendingUp className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Spread</span>
                <span className="detail-value">{dealInfo.spread}</span>
              </div>
            </div>
            <div className="detail-item">
              <Calendar className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Term</span>
                <span className="detail-value">{dealInfo.term}</span>
              </div>
            </div>
            <div className="detail-item">
              <Users className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Participants</span>
                <span className="detail-value">{dealInfo.participants}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-item">
              <Calendar className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Start Date</span>
                <span className="detail-value">{dealInfo.startDate}</span>
              </div>
            </div>
            <div className="detail-item">
              <Calendar className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Expected Close</span>
                <span className="detail-value">{dealInfo.expectedClose}</span>
              </div>
            </div>
            <div className="detail-item">
              <FileText className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Sector</span>
                <span className="detail-value">{dealInfo.sector}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

