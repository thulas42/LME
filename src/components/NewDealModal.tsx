import { X, FileText, Building2, DollarSign } from 'lucide-react'
import { useState } from 'react'

interface NewDealModalProps {
  onClose: () => void
  onCreate: (deal: any) => void
}

export default function NewDealModal({ onClose, onCreate }: NewDealModalProps) {
  const [deal, setDeal] = useState({
    name: '',
    borrower: '',
    amount: '',
    currency: 'USD',
    type: 'Term Loan',
    sector: '',
    purpose: '',
  })

  const handleChange = (field: string, value: string) => {
    setDeal(prev => ({ ...prev, [field]: value }))
  }

  const handleCreate = () => {
    onCreate(deal)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content new-deal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText className="section-icon" />
            <h2>New Deal</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="new-deal-content">
          <div className="form-section">
            <div className="form-group">
              <label>
                Deal Name <span className="required">*</span>
              </label>
              <input
                type="text"
                value={deal.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter deal name"
              />
            </div>

            <div className="form-group">
              <label>
                Borrower <span className="required">*</span>
              </label>
              <input
                type="text"
                value={deal.borrower}
                onChange={(e) => handleChange('borrower', e.target.value)}
                placeholder="Enter borrower name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Loan Amount <span className="required">*</span>
                </label>
                <div className="input-with-currency">
                  <select
                    value={deal.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                    className="currency-select"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <input
                    type="text"
                    value={deal.amount}
                    onChange={(e) => handleChange('amount', e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Loan Type</label>
                <select
                  value={deal.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                >
                  <option value="Term Loan">Term Loan</option>
                  <option value="Revolving Credit">Revolving Credit</option>
                  <option value="Syndicated Loan">Syndicated Loan</option>
                  <option value="Green Loan">Green Loan</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Sector</label>
              <select
                value={deal.sector}
                onChange={(e) => handleChange('sector', e.target.value)}
              >
                <option value="">Select sector</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Energy">Energy</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>

            <div className="form-group">
              <label>Purpose</label>
              <textarea
                value={deal.purpose}
                onChange={(e) => handleChange('purpose', e.target.value)}
                placeholder="Describe the purpose of this deal..."
                rows={3}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreate}
              disabled={!deal.name || !deal.borrower || !deal.amount}
            >
              <FileText className="btn-icon" />
              Create Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

