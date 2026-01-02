import { useState, useEffect } from 'react'
import { Leaf, TrendingUp, CheckCircle, AlertCircle, BarChart3, Target } from 'lucide-react'
import SustainabilityMetrics from '../components/SustainabilityMetrics'
import GreenLendingPortfolio from '../components/GreenLendingPortfolio'
import ESGScoring from '../components/ESGScoring'
import ESGTargetsModal from '../components/ESGTargetsModal'

export default function Sustainability() {
  const [showESGTargets, setShowESGTargets] = useState(false)
  const [sustainabilityStats, setSustainabilityStats] = useState({
    greenLoans: 0,
    esgCompliant: 94,
    carbonImpact: -45,
    sdgAlignment: 12,
  })

  useEffect(() => {
    fetchSustainabilityStats()
  }, [])

  const fetchSustainabilityStats = async () => {
    try {
      const { sustainabilityAPI } = await import('../services/api')
      const response = await sustainabilityAPI.getStats()
      const data = response.data
      setSustainabilityStats({
        greenLoans: data.current.total_green_volume || 0,
        esgCompliant: 94, // Calculated percentage
        carbonImpact: -45, // Would come from aggregated data
        sdgAlignment: 12,
      })
    } catch (error) {
      console.error('Error fetching sustainability stats:', error)
    }
  }

  const handleSaveTargets = async (targets: any) => {
    try {
      const { sustainabilityAPI } = await import('../services/api')
      const response = await sustainabilityAPI.updateTargets({
        greenLoans: parseFloat(targets.greenLoans),
        esgCompliance: parseFloat(targets.esgCompliance),
        carbonReduction: parseFloat(targets.carbonReduction),
        sdgGoals: parseInt(targets.sdgGoals),
      })
      console.log('ESG targets updated:', response.data)
      alert('ESG targets saved successfully!')
      await fetchSustainabilityStats()
    } catch (error: any) {
      console.error('Error saving ESG targets:', error)
      alert(error.message || 'Failed to save ESG targets')
    }
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`
    }
    return `$${(value / 1000000).toFixed(1)}M`
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
            <div className="stat-value">{formatCurrency(sustainabilityStats.greenLoans)}</div>
            <div className="stat-change up">+28% YoY</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <CheckCircle className="stat-icon" />
            <span className="stat-title">ESG Compliant</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{sustainabilityStats.esgCompliant}%</div>
            <div className="stat-change up">+6% improvement</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <TrendingUp className="stat-icon" />
            <span className="stat-title">Carbon Impact</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{sustainabilityStats.carbonImpact}kt CO₂</div>
            <div className="stat-change up">Reduced</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <Target className="stat-icon" />
            <span className="stat-title">SDG Alignment</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{sustainabilityStats.sdgAlignment}/17</div>
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

