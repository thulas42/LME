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
  const [searchQuery, setSearchQuery] = useState('')

  const handleApplyFilters = async (filters: any) => {
    try {
      console.log('Applying filters:', filters)
      // In a real app, this would filter the displayed data
      // For now, we'll just log it
    } catch (error: any) {
      console.error('Error applying filters:', error)
    }
  }

  const handleExport = async (format: string) => {
    try {
      const { marketAPI } = await import('../services/api')
      const response = await marketAPI.getIntelligence()
      console.log('Exporting data as:', format, response.data)
      // In a real app, this would convert and download the data
      alert(`Data exported as ${format.toUpperCase()} successfully!`)
    } catch (error: any) {
      console.error('Error exporting data:', error)
      alert(error.message || 'Failed to export data')
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    console.log('Searching for:', e.target.value)
    // In a real app, this would filter the displayed data
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
          value={searchQuery}
          onChange={handleSearch}
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

