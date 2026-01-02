import { useState } from 'react'
import { Leaf, TrendingUp, CheckCircle, AlertCircle, BarChart3, Target } from 'lucide-react'
import SustainabilityMetrics from '../components/SustainabilityMetrics'
import GreenLendingPortfolio from '../components/GreenLendingPortfolio'
import ESGScoring from '../components/ESGScoring'
import ESGTargetsModal from '../components/ESGTargetsModal'

export default function Sustainability() {
  const [showESGTargets, setShowESGTargets] = useState(false)

  const handleSaveTargets = (targets: any) => {
    console.log('Saving ESG targets:', targets)
    // In a real app, this would save the targets
  }

  return (
    <div className="sustainability">
      <div className="page-header">
        <div>
          <h1>Sustainability & Green Lending</h1>
          <p className="subtitle">ESG assessment, green finance tracking, and sustainable lending practices</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowESGTargets(true)}>
          <Target className="btn-icon" />
          Set ESG Targets
        </button>
      </div>

      {showESGTargets && (
        <ESGTargetsModal
          onClose={() => setShowESGTargets(false)}
          onSave={handleSaveTargets}
        />
      )}

      <div className="sustainability-stats">
        <div className="stat-card">
          <div className="stat-card-header">
            <Leaf className="stat-icon" />
            <span className="stat-title">Green Loans</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">$1.2B</div>
            <div className="stat-change up">+28% YoY</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <CheckCircle className="stat-icon" />
            <span className="stat-title">ESG Compliant</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">94%</div>
            <div className="stat-change up">+6% improvement</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <TrendingUp className="stat-icon" />
            <span className="stat-title">Carbon Impact</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">-45kt CO₂</div>
            <div className="stat-change up">Reduced</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <Target className="stat-icon" />
            <span className="stat-title">SDG Alignment</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">12/17</div>
            <div className="stat-change up">Goals supported</div>
          </div>
        </div>
      </div>

      <div className="sustainability-content">
        <div className="sustainability-section">
          <SustainabilityMetrics />
        </div>
        <div className="sustainability-section">
          <GreenLendingPortfolio />
        </div>
      </div>

      <div className="sustainability-section full-width">
        <ESGScoring />
      </div>

      <div className="sustainability-info">
        <div className="card">
          <div className="card-header">
            <Leaf className="section-icon" />
            <h2>Green Lending Framework</h2>
          </div>
          <div className="card-body">
            <div className="framework-grid">
              <div className="framework-item">
                <h3>Environmental Criteria</h3>
                <p>Assessment of climate impact, resource efficiency, and environmental risk</p>
                <ul>
                  <li>Carbon footprint analysis</li>
                  <li>Renewable energy projects</li>
                  <li>Environmental compliance</li>
                </ul>
              </div>
              <div className="framework-item">
                <h3>Social Impact</h3>
                <p>Evaluation of social benefits, community impact, and stakeholder engagement</p>
                <ul>
                  <li>Job creation metrics</li>
                  <li>Community development</li>
                  <li>Social inclusion initiatives</li>
                </ul>
              </div>
              <div className="framework-item">
                <h3>Governance Standards</h3>
                <p>Transparency, accountability, and ethical business practices</p>
                <ul>
                  <li>Board composition</li>
                  <li>Risk management</li>
                  <li>Regulatory compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

