import { useState } from 'react'
import { CheckCircle, Circle, ArrowRight } from 'lucide-react'

const allSteps = [
  { id: 1, name: 'Borrower Info' },
  { id: 2, name: 'Loan Terms' },
  { id: 3, name: 'Credit Assessment' },
  { id: 4, name: 'Documentation' },
  { id: 5, name: 'Review & Submit' },
]

export default function OriginationWizard() {
  const [currentStep, setCurrentStep] = useState(3)

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed'
    if (stepId === currentStep) return 'current'
    return 'pending'
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleContinue = () => {
    if (currentStep < allSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }
  return (
    <div className="card">
      <div className="card-header">
        <h2>New Loan Application</h2>
        <span className="card-subtitle">Step {currentStep} of {allSteps.length}</span>
      </div>
      <div className="card-body">
        <div className="wizard-steps">
          {allSteps.map((step, index) => {
            const status = getStepStatus(step.id)
            return (
              <div key={step.id} className="wizard-step-container">
                <div className={`wizard-step ${status}`}>
                  {status === 'completed' ? (
                    <CheckCircle className="step-icon" />
                  ) : status === 'current' ? (
                    <div className="step-circle active">{step.id}</div>
                  ) : (
                    <Circle className="step-icon" />
                  )}
                  <span className="step-label">{step.name}</span>
                </div>
                {index < allSteps.length - 1 && (
                  <ArrowRight className="step-arrow" />
                )}
              </div>
            )
          })}
        </div>

        <div className="wizard-content">
          <h3>{allSteps[currentStep - 1].name}</h3>
          <div className="assessment-form">
            {currentStep === 3 && (
              <>
                <div className="form-group">
                  <label>Credit Score</label>
                  <div className="score-display">
                    <span className="score-value">720</span>
                    <span className="score-label">Good</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Debt-to-Income Ratio</label>
                  <div className="ratio-display">32%</div>
                </div>
                <div className="form-group">
                  <label>AI Risk Assessment</label>
                  <div className="risk-badge low">Low Risk</div>
                </div>
              </>
            )}
            {currentStep === 4 && (
              <div className="form-group">
                <label>Documentation Status</label>
                <div className="risk-badge low">Documents Generated</div>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                  All required documents have been automatically generated and are ready for review.
                </p>
              </div>
            )}
            {currentStep === 5 && (
              <div className="form-group">
                <label>Review Summary</label>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <p style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
                    Application is ready for submission. All steps have been completed successfully.
                  </p>
                  <ul style={{ color: 'var(--text-secondary)', paddingLeft: '20px' }}>
                    <li>Borrower information verified</li>
                    <li>Loan terms agreed</li>
                    <li>Credit assessment passed</li>
                    <li>Documentation complete</li>
                  </ul>
                </div>
              </div>
            )}
            <div className="form-actions">
              <button
                className="btn btn-secondary"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleContinue}
                disabled={currentStep === allSteps.length}
              >
                {currentStep === allSteps.length ? 'Submit' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

