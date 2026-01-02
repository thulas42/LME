import { X, FileText, Calendar, Users, DollarSign, TrendingUp, Eye } from 'lucide-react'

interface LoanDetailsModalProps {
  onClose: () => void
  loan: {
    id: number
    borrower: string
    loanId: string
    amount: string
    remaining: string
    price: number
    spread: number
    sector: string
    views: number
  }
}

export default function LoanDetailsModal({ onClose, loan }: LoanDetailsModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content loan-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText className="section-icon" />
            <h2>Loan Details</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="loan-details-content">
          <div className="loan-details-header">
            <div>
              <h3>{loan.borrower}</h3>
              <p className="loan-id">{loan.loanId}</p>
            </div>
            <div className="loan-views">
              <Eye className="views-icon" />
              {loan.views} views
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <DollarSign className="detail-card-icon" />
              <div>
                <div className="detail-card-label">Total Amount</div>
                <div className="detail-card-value">{loan.amount}</div>
              </div>
            </div>
            <div className="detail-card">
              <DollarSign className="detail-card-icon" />
              <div>
                <div className="detail-card-label">Remaining</div>
                <div className="detail-card-value">{loan.remaining}</div>
              </div>
            </div>
            <div className="detail-card">
              <TrendingUp className="detail-card-icon" />
              <div>
                <div className="detail-card-label">Current Price</div>
                <div className="detail-card-value">{loan.price}%</div>
              </div>
            </div>
            <div className="detail-card">
              <TrendingUp className="detail-card-icon" />
              <div>
                <div className="detail-card-label">Spread</div>
                <div className="detail-card-value">{loan.spread} bps</div>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h4>Additional Information</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Sector:</span>
                <span className="info-value">{loan.sector}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status:</span>
                <span className="info-value">Active</span>
              </div>
              <div className="info-item">
                <span className="info-label">Origination Date:</span>
                <span className="info-value">2024-01-15</span>
              </div>
              <div className="info-item">
                <span className="info-label">Maturity Date:</span>
                <span className="info-value">2029-01-15</span>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary">
              Express Interest
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

