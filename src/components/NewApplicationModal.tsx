import { useState } from 'react'
import { X, Building2, DollarSign, Calendar, FileText, User } from 'lucide-react'

interface NewApplicationModalProps {
  onClose: () => void
  onStart: (data: any) => Promise<void>
}

export default function NewApplicationModal({ onClose, onStart }: NewApplicationModalProps) {
  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerType: 'Corporate',
    loanAmount: '',
    loanType: 'Term Loan',
    loanPurpose: '',
    sector: '',
    currency: 'USD',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.borrowerName.trim()) {
      newErrors.borrowerName = 'Borrower name is required'
    }
    if (!formData.loanAmount.trim()) {
      newErrors.loanAmount = 'Loan amount is required'
    } else if (isNaN(Number(formData.loanAmount)) || Number(formData.loanAmount) <= 0) {
      newErrors.loanAmount = 'Please enter a valid loan amount'
    }
    if (!formData.loanPurpose.trim()) {
      newErrors.loanPurpose = 'Loan purpose is required'
    }
    if (!formData.sector.trim()) {
      newErrors.sector = 'Sector is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        await onStart(formData)
      } catch (error: any) {
        console.error('Error creating application:', error)
        alert(error.message || 'Failed to create application')
      }
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Loan Application</h2>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-section">
            <h3>
              <User className="section-icon" />
              Borrower Information
            </h3>
            
            <div className="form-group">
              <label htmlFor="borrowerName">
                Borrower Name <span className="required">*</span>
              </label>
              <input
                id="borrowerName"
                type="text"
                value={formData.borrowerName}
                onChange={(e) => handleChange('borrowerName', e.target.value)}
                placeholder="Enter borrower name"
                className={errors.borrowerName ? 'error' : ''}
              />
              {errors.borrowerName && (
                <span className="error-message">{errors.borrowerName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="borrowerType">Borrower Type</label>
              <select
                id="borrowerType"
                value={formData.borrowerType}
                onChange={(e) => handleChange('borrowerType', e.target.value)}
              >
                <option value="Corporate">Corporate</option>
                <option value="SME">SME</option>
                <option value="Financial Institution">Financial Institution</option>
                <option value="Government">Government</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sector">
                Sector <span className="required">*</span>
              </label>
              <select
                id="sector"
                value={formData.sector}
                onChange={(e) => handleChange('sector', e.target.value)}
                className={errors.sector ? 'error' : ''}
              >
                <option value="">Select sector</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Energy">Energy</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Other">Other</option>
              </select>
              {errors.sector && (
                <span className="error-message">{errors.sector}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>
              <DollarSign className="section-icon" />
              Loan Details
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="loanAmount">
                  Loan Amount <span className="required">*</span>
                </label>
                <div className="input-with-currency">
                  <select
                    value={formData.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                    className="currency-select"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <input
                    id="loanAmount"
                    type="text"
                    value={formData.loanAmount}
                    onChange={(e) => handleChange('loanAmount', e.target.value)}
                    placeholder="Enter amount"
                    className={errors.loanAmount ? 'error' : ''}
                  />
                </div>
                {errors.loanAmount && (
                  <span className="error-message">{errors.loanAmount}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="loanType">Loan Type</label>
                <select
                  id="loanType"
                  value={formData.loanType}
                  onChange={(e) => handleChange('loanType', e.target.value)}
                >
                  <option value="Term Loan">Term Loan</option>
                  <option value="Revolving Credit">Revolving Credit</option>
                  <option value="Syndicated Loan">Syndicated Loan</option>
                  <option value="Bridge Loan">Bridge Loan</option>
                  <option value="Green Loan">Green Loan</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="loanPurpose">
                Loan Purpose <span className="required">*</span>
              </label>
              <textarea
                id="loanPurpose"
                value={formData.loanPurpose}
                onChange={(e) => handleChange('loanPurpose', e.target.value)}
                placeholder="Describe the purpose of the loan..."
                rows={3}
                className={errors.loanPurpose ? 'error' : ''}
              />
              {errors.loanPurpose && (
                <span className="error-message">{errors.loanPurpose}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <FileText className="btn-icon" />
              Start Application
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

