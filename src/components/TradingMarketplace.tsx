import { useState } from 'react'
import { Eye, ArrowLeftRight, TrendingUp, DollarSign } from 'lucide-react'
import LoanDetailsModal from './LoanDetailsModal'

const listings = [
  {
    id: 1,
    borrower: 'TechCorp Industries',
    loanId: 'LN-2024-001',
    amount: '$50M',
    remaining: '$42M',
    price: 98.5,
    spread: 175,
    sector: 'Technology',
    views: 24,
    status: 'active',
  },
  {
    id: 2,
    borrower: 'GreenEnergy Solutions',
    loanId: 'LN-2024-015',
    amount: '$75M',
    remaining: '$68M',
    price: 99.2,
    spread: 165,
    sector: 'Energy',
    views: 18,
    status: 'active',
  },
  {
    id: 3,
    borrower: 'InfraBuild Ltd',
    loanId: 'LN-2024-028',
    amount: '$120M',
    remaining: '$95M',
    price: 97.8,
    spread: 185,
    sector: 'Infrastructure',
    views: 31,
    status: 'active',
  },
]

export default function TradingMarketplace() {
  const [selectedLoan, setSelectedLoan] = useState<typeof listings[0] | null>(null)

  return (
    <div className="card">
      <div className="card-header">
        <h2>Active Listings</h2>
        <span className="card-subtitle">Available for trading</span>
      </div>
      <div className="card-body">
        <div className="listing-list">
          {listings.map((listing) => (
            <div key={listing.id} className="listing-item">
              <div className="listing-header">
                <div className="listing-title-section">
                  <ArrowLeftRight className="listing-icon" />
                  <div>
                    <div className="listing-name">{listing.borrower}</div>
                    <div className="listing-id">{listing.loanId}</div>
                  </div>
                </div>
                <div className="listing-amount">{listing.amount}</div>
              </div>
              <div className="listing-body">
                <div className="listing-details">
                  <div className="listing-detail">
                    <span className="detail-label">Remaining:</span>
                    <span className="detail-value">{listing.remaining}</span>
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
                    {listing.views} views
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedLoan(listing)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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

