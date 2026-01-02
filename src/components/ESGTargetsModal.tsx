import { X, Target } from 'lucide-react'
import { useState } from 'react'

interface ESGTargetsModalProps {
  onClose: () => void
  onSave: (targets: any) => void
}

export default function ESGTargetsModal({ onClose, onSave }: ESGTargetsModalProps) {
  const [targets, setTargets] = useState({
    greenLoans: '1500',
    esgCompliance: '95',
    carbonReduction: '50',
    sdgGoals: '15',
  })

  const handleChange = (field: string, value: string) => {
    setTargets(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(targets)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content esg-targets-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Target className="section-icon" />
            <h2>Set ESG Targets</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="esg-targets-content">
          <div className="form-section">
            <div className="form-group">
              <label>
                Green Loans Target (Millions USD)
              </label>
              <input
                type="text"
                value={targets.greenLoans}
                onChange={(e) => handleChange('greenLoans', e.target.value)}
                placeholder="1500"
              />
            </div>

            <div className="form-group">
              <label>
                ESG Compliance Target (%)
              </label>
              <input
                type="text"
                value={targets.esgCompliance}
                onChange={(e) => handleChange('esgCompliance', e.target.value)}
                placeholder="95"
              />
            </div>

            <div className="form-group">
              <label>
                Carbon Reduction Target (kt CO₂)
              </label>
              <input
                type="text"
                value={targets.carbonReduction}
                onChange={(e) => handleChange('carbonReduction', e.target.value)}
                placeholder="50"
              />
            </div>

            <div className="form-group">
              <label>
                SDG Goals Alignment Target
              </label>
              <input
                type="text"
                value={targets.sdgGoals}
                onChange={(e) => handleChange('sdgGoals', e.target.value)}
                placeholder="15"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              <Target className="btn-icon" />
              Save Targets
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

