import { Search, Filter, Download } from 'lucide-react'
import MarketTrends from '../components/MarketTrends'
import PricingMatrix from '../components/PricingMatrix'
import SectorAnalysis from '../components/SectorAnalysis'

export default function MarketIntelligence() {
  return (
    <div className="market-intelligence">
      <div className="page-header">
        <div>
          <h1>Market Intelligence</h1>
          <p className="subtitle">Real-time market data, pricing, and trends</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Filter className="btn-icon" />
            Filters
          </button>
          <button className="btn btn-secondary">
            <Download className="btn-icon" />
            Export
          </button>
        </div>
      </div>

      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search deals, borrowers, or sectors..."
          className="search-input"
        />
      </div>

      <div className="intelligence-grid">
        <div className="intelligence-section">
          <MarketTrends />
        </div>
        <div className="intelligence-section">
          <PricingMatrix />
        </div>
        <div className="intelligence-section full-width">
          <SectorAnalysis />
        </div>
      </div>
    </div>
  )
}

