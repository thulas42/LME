import { X, Filter } from 'lucide-react'
import { useState } from 'react'

interface FilterModalProps {
  onClose: () => void
  onApply: (filters: any) => void
  type?: 'market' | 'trading'
}

export default function FilterModal({ onClose, onApply, type = 'market' }: FilterModalProps) {
  const [filters, setFilters] = useState({
    sector: '',
    dateRange: 'all',
    amountMin: '',
    amountMax: '',
    status: '',
    currency: '',
  })

  const handleChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      sector: '',
      dateRange: 'all',
      amountMin: '',
      amountMax: '',
      status: '',
      currency: '',
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content filter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Filter className="section-icon" />
            <h2>Filters</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="filter-content">
          <div className="form-section">
            <div className="form-group">
              <label>Sector</label>
              <select
                value={filters.sector}
                onChange={(e) => handleChange('sector', e.target.value)}
              >
                <option value="">All Sectors</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Energy">Energy</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleChange('dateRange', e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>

            {type === 'trading' && (
              <>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Currency</label>
                  <select
                    value={filters.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                  >
                    <option value="">All Currencies</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>Min Amount</label>
                <input
                  type="text"
                  value={filters.amountMin}
                  onChange={(e) => handleChange('amountMin', e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="form-group">
                <label>Max Amount</label>
                <input
                  type="text"
                  value={filters.amountMax}
                  onChange={(e) => handleChange('amountMax', e.target.value)}
                  placeholder="No limit"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
            <button type="button" className="btn btn-primary" onClick={handleApply}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

