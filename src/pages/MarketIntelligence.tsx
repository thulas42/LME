import { useState } from 'react'
import { Search, Filter, Download } from 'lucide-react'
import MarketTrends from '../components/MarketTrends'
import PricingMatrix from '../components/PricingMatrix'
import SectorAnalysis from '../components/SectorAnalysis'
import FilterModal from '../components/FilterModal'
import ExportModal from '../components/ExportModal'

export default function MarketIntelligence() {
  const [showFilters, setShowFilters] = useState(false)
  const [showExport, setShowExport] = useState(false)

  const handleApplyFilters = (filters: any) => {
    console.log('Applying filters:', filters)
  }

  const handleExport = (format: string) => {
    console.log('Exporting data as:', format)
  }

  return (
    <div className="market-intelligence">
      <div className="page-header">
        <div>
          <h1>Market Intelligence</h1>
          <p className="subtitle">Real-time market data, pricing, and trends</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => setShowFilters(true)}>
            <Filter className="btn-icon" />
            Filters
          </button>
          <button className="btn btn-secondary" onClick={() => setShowExport(true)}>
            <Download className="btn-icon" />
            Export
          </button>
        </div>
      </div>

      {showFilters && (
        <FilterModal
          onClose={() => setShowFilters(false)}
          onApply={handleApplyFilters}
          type="market"
        />
      )}

      {showExport && (
        <ExportModal
          onClose={() => setShowExport(false)}
          onExport={handleExport}
          type="market"
        />
      )}

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

