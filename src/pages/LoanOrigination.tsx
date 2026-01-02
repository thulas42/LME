import { useState, useEffect } from 'react'
import { Plus, Sparkles, CheckCircle, Clock, AlertCircle, FileText, Users, DollarSign } from 'lucide-react'
import OriginationWizard from '../components/OriginationWizard'
import OriginationPipeline from '../components/OriginationPipeline'
import NewApplicationModal from '../components/NewApplicationModal'
import AIAssistantModal from '../components/AIAssistantModal'

export default function LoanOrigination() {
  const [showNewApplication, setShowNewApplication] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [hasActiveApplication, setHasActiveApplication] = useState(true)

  const handleNewApplication = () => {
    setShowNewApplication(true)
  }

  const handleStartApplication = async (applicationData: any) => {
    try {
      const { applicationsAPI } = await import('../services/api')
      const response = await applicationsAPI.create({
        borrowerName: applicationData.borrowerName,
        borrowerType: applicationData.borrowerType,
        loanAmount: parseFloat(applicationData.loanAmount),
        currency: applicationData.currency,
        loanType: applicationData.loanType,
        sector: applicationData.sector,
        loanPurpose: applicationData.loanPurpose,
      })
      console.log('Application created:', response.data)
      setShowNewApplication(false)
      setHasActiveApplication(true)
    } catch (error: any) {
      console.error('Error creating application:', error)
      alert(error.message || 'Failed to create application')
    }
  }

  return (
    <div className="loan-origination">
      <div className="page-header">
        <div>
          <h1>Loan Origination</h1>
          <p className="subtitle">Digital workflow for streamlined loan origination and processing</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => setShowAIAssistant(true)}>
            <Sparkles className="btn-icon" />
            AI Assistant
          </button>
          <button className="btn btn-primary" onClick={handleNewApplication}>
            <Plus className="btn-icon" />
            New Application
          </button>
        </div>
      </div>

      {showNewApplication && (
        <NewApplicationModal
          onClose={() => setShowNewApplication(false)}
          onStart={handleStartApplication}
        />
      )}

      {showAIAssistant && (
        <AIAssistantModal onClose={() => setShowAIAssistant(false)} />
      )}

      <div className="origination-stats">
        <div className="stat-card">
          <div className="stat-card-header">
            <FileText className="stat-icon" />
            <span className="stat-title">Applications</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats.applications}</div>
            <div className="stat-change up">+5 this week</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <Clock className="stat-icon" />
            <span className="stat-title">Avg. Processing</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats.avgProcessing}</div>
            <div className="stat-change up">-40% faster</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <CheckCircle className="stat-icon" />
            <span className="stat-title">Approval Rate</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats.approvalRate}%</div>
            <div className="stat-change up">+12% improvement</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <DollarSign className="stat-icon" />
            <span className="stat-title">Pipeline Value</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">$1.8B</div>
            <div className="stat-change up">+$420M</div>
          </div>
        </div>
      </div>

      <div className="origination-content">
        <div className="origination-section">
          {hasActiveApplication ? (
            <OriginationWizard />
          ) : (
            <div className="card">
              <div className="card-body" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <FileText className="stat-icon" style={{ width: '64px', height: '64px', margin: '0 auto 20px', opacity: 0.5 }} />
                <h3 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>No Active Application</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Start a new loan application to begin the origination process
                </p>
                <button className="btn btn-primary" onClick={handleNewApplication}>
                  <Plus className="btn-icon" />
                  Create New Application
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="origination-section">
          <OriginationPipeline />
        </div>
      </div>

      <div className="ai-features">
        <div className="card">
          <div className="card-header">
            <Sparkles className="section-icon" />
            <h2>AI-Powered Features</h2>
          </div>
          <div className="card-body">
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <Sparkles />
                </div>
                <div className="feature-content">
                  <h3>Automated Credit Assessment</h3>
                  <p>AI analyzes borrower profiles and market data to provide instant risk scoring</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <FileText />
                </div>
                <div className="feature-content">
                  <h3>Smart Document Generation</h3>
                  <p>Automatically generate loan agreements and documentation based on deal parameters</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <AlertCircle />
                </div>
                <div className="feature-content">
                  <h3>Compliance Checking</h3>
                  <p>Real-time validation against regulatory requirements and LMA standards</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Users />
                </div>
                <div className="feature-content">
                  <h3>Market Matching</h3>
                  <p>Intelligent matching of borrowers with suitable lenders based on criteria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

