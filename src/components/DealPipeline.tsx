import { useEffect, useState } from 'react'
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { dealsAPI } from '../services/api'

export default function DealPipeline() {
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      const response = await dealsAPI.getAll()
      setDeals(response.data)
    } catch (error) {
      console.error('Error fetching deals:', error)
      setDeals([])
    } finally {
      setLoading(false)
    }
  }

  const formatAmount = (amount: number, currency: string) => {
    const formatted = (amount / 1000000).toFixed(0)
    return `${currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}${formatted}M`
  }

  const getDaysRemaining = (expectedClose: string) => {
    if (!expectedClose) return 0
    const close = new Date(expectedClose)
    const now = new Date()
    const diff = Math.ceil((close.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'attention':
        return AlertTriangle
      case 'pending':
        return Clock
      default:
        return FileText
    }
  }

  const handleDealClick = (deal: typeof deals[0]) => {
    console.log('Viewing deal:', deal.name)
    // In a real app, this would navigate to deal details or open a modal
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Deal Pipeline</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading deals...
          </div>
        ) : deals.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No deals in pipeline
          </div>
        ) : (
          <div className="deal-list">
            {deals.map((deal) => {
              const StatusIcon = getStatusIcon(deal.status)
              return (
                <div
                  key={deal.id}
                  className={`deal-item ${deal.status}`}
                  onClick={() => handleDealClick(deal)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="deal-header">
                    <div className="deal-title-section">
                      <StatusIcon className="deal-status-icon" />
                      <div>
                        <div className="deal-name">{deal.name}</div>
                        <div className="deal-borrower">{deal.borrower}</div>
                      </div>
                    </div>
                    <div className="deal-amount">{formatAmount(deal.amount, deal.currency)}</div>
                  </div>
                  <div className="deal-body">
                    <div className="deal-stage">{deal.stage || 'Initiation'}</div>
                    <div className="deal-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${deal.progress || 0}%` }}
                        />
                      </div>
                      <span className="progress-text">{deal.progress || 0}%</span>
                    </div>
                    <div className="deal-footer">
                      {deal.expected_close && (
                        <span className="days-remaining">
                          {getDaysRemaining(deal.expected_close)} days remaining
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

