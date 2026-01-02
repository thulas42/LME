import { useState, useEffect } from 'react'
import { Search, TrendingUp, ArrowLeftRight, Filter, Download, Eye } from 'lucide-react'
import TradingMarketplace from '../components/TradingMarketplace'
import TradingActivity from '../components/TradingActivity'
import PriceDiscovery from '../components/PriceDiscovery'
import FilterModal from '../components/FilterModal'
import ExportModal from '../components/ExportModal'
import { tradingAPI } from '../services/api'

export default function LoanTrading() {
  const [showFilters, setShowFilters] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [tradingStats, setTradingStats] = useState({
    activeListings: 0,
    tradingVolume: 0,
    participants: 0,
  })

  useEffect(() => {
    fetchTradingStats()
  }, [])

  const fetchTradingStats = async () => {
    try {
      const response = await tradingAPI.getStats()
      setTradingStats({
        activeListings: response.data.listings.total_listings || 0,
        tradingVolume: response.data.listings.total_volume || 0,
        participants: response.data.listings.unique_borrowers || 0,
      })
    } catch (error) {
      console.error('Error fetching trading stats:', error)
    }
  }

  const handleApplyFilters = async (filters: any) => {
    try {
      console.log('Applying filters:', filters)
      // In a real app, this would filter the data
    } catch (error: any) {
      console.error('Error applying filters:', error)
    }
  }

  const handleExport = async (format: string) => {
    try {
      const response = await tradingAPI.getListings()
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
    // In a real app, this would filter the displayed loans
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000).toFixed(1)}B`
    }
    return `$${(value / 1000000).toFixed(1)}M`
  }

  return (
    <div className="loan-trading">
      <div className="page-header">
        <div>
          <h1>Loan Trading</h1>
          <p className="subtitle">Transparent marketplace for loan trading and secondary market transactions</p>
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
          type="trading"
        />
      )}

      {showExport && (
        <ExportModal
          onClose={() => setShowExport(false)}
          onExport={handleExport}
          type="trading"
        />
      )}

      <div className="trading-stats">
        <div className="stat-card">
          <div className="stat-card-header">
            <ArrowLeftRight className="stat-icon" />
            <span className="stat-title">Active Listings</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{tradingStats.activeListings}</div>
            <div className="stat-change up">+8 today</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <TrendingUp className="stat-icon" />
            <span className="stat-title">Trading Volume</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{formatCurrency(tradingStats.tradingVolume)}</div>
            <div className="stat-change up">+15% this month</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <Eye className="stat-icon" />
            <span className="stat-title">Market Participants</span>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{tradingStats.participants}</div>
            <div className="stat-change up">+12 active</div>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search loans by borrower, sector, or loan ID..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="trading-content">
        <div className="trading-section">
          <TradingMarketplace />
        </div>
        <div className="trading-section">
          <TradingActivity />
        </div>
      </div>

      <div className="trading-section full-width">
        <PriceDiscovery />
      </div>
    </div>
  )
}

