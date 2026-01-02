import { useEffect, useState } from 'react'
import { Leaf } from 'lucide-react'
import { sustainabilityAPI } from '../services/api'

export default function GreenLendingPortfolio() {
  const [greenLoans, setGreenLoans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGreenLoans()
  }, [])

  const fetchGreenLoans = async () => {
    try {
      const response = await sustainabilityAPI.getGreenLoans()
      setGreenLoans(response.data)
    } catch (error) {
      console.error('Error fetching green loans:', error)
      setGreenLoans([])
    } finally {
      setLoading(false)
    }
  }

  const formatAmount = (amount: number) => {
    const formatted = (amount / 1000000).toFixed(0)
    return `$${formatted}M`
  }
  const handleLoanClick = (loan: typeof greenLoans[0]) => {
    console.log('Viewing green loan:', loan.name)
    // In a real app, this would navigate to loan details
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Green Lending Portfolio</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading green loans...
          </div>
        ) : greenLoans.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No green loans in portfolio
          </div>
        ) : (
          <div className="green-loan-list">
            {greenLoans.map((loan) => (
              <div
                key={loan.id}
                className="green-loan-item"
                onClick={() => handleLoanClick(loan)}
                style={{ cursor: 'pointer' }}
              >
                <div className="green-loan-header">
                  <Leaf className="green-icon" />
                  <div className="green-loan-info">
                    <div className="green-loan-name">{loan.name}</div>
                    <div className="green-loan-borrower">{loan.borrower}</div>
                  </div>
                  <div className="green-loan-amount">{formatAmount(loan.amount)}</div>
                </div>
                <div className="green-loan-body">
                  <div className="green-loan-details">
                    <div className="green-detail">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{loan.category}</span>
                    </div>
                    <div className="green-detail">
                      <span className="detail-label">ESG Score:</span>
                      <span className="detail-value score-high">{loan.esg_score}/100</span>
                    </div>
                    <div className="green-detail">
                      <span className="detail-label">Carbon Reduction:</span>
                      <span className="detail-value">{loan.carbon_reduction}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

