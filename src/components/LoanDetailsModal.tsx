import { useState } from 'react'
import { X, FileText, Calendar, Users, DollarSign, TrendingUp, Eye, CheckCircle } from 'lucide-react'
import { tradingAPI } from '../services/api'

interface LoanDetailsModalProps {
  onClose: () => void
  loan: {
    id?: string
    borrower: string
    loan_id?: string
    loanId?: string
    amount: number | string
    remaining?: number | string
    price: number
    spread: number
    sector: string
    views?: number
  }
}

export default function LoanDetailsModal({ onClose, loan }: LoanDetailsModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [interestExpressed, setInterestExpressed] = useState(false)

  const handleExpressInterest = async () => {
    try {
      setIsSubmitting(true)
      await tradingAPI.expressInterest({
        loanId: loan.loan_id || loan.loanId,
        borrower: loan.borrower,
        amount: typeof loan.amount === 'number' ? loan.amount : null,
        message: `Interest expressed in ${loan.borrower} loan`,
      })
      setInterestExpressed(true)
      setTimeout(() => {
        setInterestExpressed(false)
        onClose()
      }, 2000)
    } catch (error: any) {
      console.error('Error expressing interest:', error)
      alert(error.response?.data?.error || 'Failed to express interest. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
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
              <p className="loan-id">{loan.loan_id || loan.loanId}</p>
            </div>
            {loan.views !== undefined && (
              <div className="loan-views">
                <Eye className="views-icon" />
                {loan.views} views
              </div>
            )}
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <DollarSign className="detail-card-icon" />
              <div>
                <div className="detail-card-label">Total Amount</div>
                <div className="detail-card-value">
                  {typeof loan.amount === 'number' 
                    ? `$${(loan.amount / 1000000).toFixed(0)}M`
                    : loan.amount}
                </div>
              </div>
            </div>
            {loan.remaining && (
              <div className="detail-card">
                <DollarSign className="detail-card-icon" />
                <div>
                  <div className="detail-card-label">Remaining</div>
                  <div className="detail-card-value">
                    {typeof loan.remaining === 'number'
                      ? `$${(loan.remaining / 1000000).toFixed(0)}M`
                      : loan.remaining}
                  </div>
                </div>
              </div>
            )}
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
            {interestExpressed ? (
              <button className="btn btn-success" disabled>
                <CheckCircle className="btn-icon" />
                Interest Expressed!
              </button>
            ) : (
              <button 
                className="btn btn-primary" 
                onClick={handleExpressInterest}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Express Interest'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

