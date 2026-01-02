import { useState, useEffect } from 'react'
import { Eye, ArrowLeftRight } from 'lucide-react'
import LoanDetailsModal from './LoanDetailsModal'
import { tradingAPI } from '../services/api'

export default function TradingMarketplace() {
  const [listings, setListings] = useState<any[]>([])
  const [selectedLoan, setSelectedLoan] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const response = await tradingAPI.getListings()
      setListings(response.data)
    } catch (error) {
      console.error('Error fetching listings:', error)
      setListings([])
    } finally {
      setLoading(false)
    }
  }

  const formatAmount = (amount: number) => {
    const formatted = (amount / 1000000).toFixed(0)
    return `$${formatted}M`
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Active Listings</h2>
        <span className="card-subtitle">Available for trading</span>
      </div>
      <div className="card-body">
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading listings...
          </div>
        ) : listings.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No active listings
          </div>
        ) : (
          <div className="listing-list">
            {listings.map((listing) => (
              <div key={listing.id} className="listing-item">
                <div className="listing-header">
                  <div className="listing-title-section">
                    <ArrowLeftRight className="listing-icon" />
                    <div>
                      <div className="listing-name">{listing.borrower}</div>
                      <div className="listing-id">{listing.loan_id}</div>
                    </div>
                  </div>
                  <div className="listing-amount">{formatAmount(listing.amount)}</div>
                </div>
                <div className="listing-body">
                  <div className="listing-details">
                    <div className="listing-detail">
                      <span className="detail-label">Remaining:</span>
                      <span className="detail-value">{formatAmount(listing.remaining)}</span>
                    </div>
                    <div className="listing-detail">
                      <span className="detail-label">Price:</span>
                      <span className="detail-value">{listing.price}%</span>
                    </div>
                    <div className="listing-detail">
                      <span className="detail-label">Spread:</span>
                      <span className="detail-value">{listing.spread} bps</span>
                    </div>
                    <div className="listing-detail">
                      <span className="detail-label">Sector:</span>
                      <span className="detail-value">{listing.sector}</span>
                    </div>
                  </div>
                  <div className="listing-footer">
                    <div className="listing-views">
                      <Eye className="views-icon" />
                      {listing.views || 0} views
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={async () => {
                        try {
                          const loan = await tradingAPI.getListing(listing.id)
                          setSelectedLoan(loan.data)
                        } catch (error) {
                          console.error('Error fetching loan details:', error)
                          setSelectedLoan(listing)
                        }
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedLoan && (
        <LoanDetailsModal
          onClose={() => setSelectedLoan(null)}
          loan={selectedLoan}
        />
      )}
    </div>
  )
}

