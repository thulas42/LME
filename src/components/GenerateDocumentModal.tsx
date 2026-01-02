import { X, Sparkles, FileText } from 'lucide-react'
import { useState } from 'react'

interface GenerateDocumentModalProps {
  onClose: () => void
  onGenerate: (data: any) => void
}

export default function GenerateDocumentModal({ onClose, onGenerate }: GenerateDocumentModalProps) {
  const [formData, setFormData] = useState({
    template: '',
    dealId: '',
    borrowerName: '',
    loanAmount: '',
    loanType: 'Term Loan',
    currency: 'USD',
  })

  const templates = [
    'LMA Term Loan Agreement',
    'Revolving Credit Facility',
    'Syndicated Loan Agreement',
    'Green Loan Agreement',
    'Amendment Agreement',
  ]

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerate = () => {
    onGenerate(formData)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content generate-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles className="section-icon" />
            <h2>Generate Document</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="generate-content">
          <div className="form-section">
            <div className="form-group">
              <label>
                Template <span className="required">*</span>
              </label>
              <select
                value={formData.template}
                onChange={(e) => handleChange('template', e.target.value)}
              >
                <option value="">Select a template</option>
                {templates.map((tpl) => (
                  <option key={tpl} value={tpl}>{tpl}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                Deal ID <span className="required">*</span>
              </label>
              <input
                type="text"
                value={formData.dealId}
                onChange={(e) => handleChange('dealId', e.target.value)}
                placeholder="LN-2024-XXX"
              />
            </div>

            <div className="form-group">
              <label>
                Borrower Name <span className="required">*</span>
              </label>
              <input
                type="text"
                value={formData.borrowerName}
                onChange={(e) => handleChange('borrowerName', e.target.value)}
                placeholder="Enter borrower name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Loan Amount <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.loanAmount}
                  onChange={(e) => handleChange('loanAmount', e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Loan Type</label>
              <select
                value={formData.loanType}
                onChange={(e) => handleChange('loanType', e.target.value)}
              >
                <option value="Term Loan">Term Loan</option>
                <option value="Revolving Credit">Revolving Credit</option>
                <option value="Syndicated Loan">Syndicated Loan</option>
                <option value="Green Loan">Green Loan</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerate}
              disabled={!formData.template || !formData.dealId || !formData.borrowerName || !formData.loanAmount}
            >
              <Sparkles className="btn-icon" />
              Generate Document
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

