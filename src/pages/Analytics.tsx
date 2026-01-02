import { BarChart3, TrendingUp, PieChart } from 'lucide-react'
import PerformanceChart from '../components/PerformanceChart'
import PortfolioAnalysis from '../components/PortfolioAnalysis'
import RiskMetrics from '../components/RiskMetrics'

export default function Analytics() {
  return (
    <div className="analytics">
      <div className="page-header">
        <h1>Analytics & Insights</h1>
        <p className="subtitle">Data-driven insights for strategic decision-making</p>
      </div>

      <div className="analytics-grid">
        <div className="analytics-section">
          <div className="section-header">
            <BarChart3 className="section-icon" />
            <h2>Performance Metrics</h2>
          </div>
          <PerformanceChart />
        </div>

        <div className="analytics-section">
          <div className="section-header">
            <PieChart className="section-icon" />
            <h2>Portfolio Analysis</h2>
          </div>
          <PortfolioAnalysis />
        </div>

        <div className="analytics-section full-width">
          <div className="section-header">
            <TrendingUp className="section-icon" />
            <h2>Risk Metrics</h2>
          </div>
          <RiskMetrics />
        </div>
      </div>
    </div>
  )
}

