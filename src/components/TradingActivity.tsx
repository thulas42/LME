import { useEffect, useState } from 'react'
import { ArrowLeftRight, TrendingUp, TrendingDown, Clock } from 'lucide-react'
import { tradingAPI } from '../services/api'

export default function TradingActivity() {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivity()
  }, [])

  const fetchActivity = async () => {
    try {
      const response = await tradingAPI.getActivity(10)
      setActivities(response.data)
    } catch (error) {
      console.error('Error fetching activity:', error)
      setActivities([])
    } finally {
      setLoading(false)
    }
  }

  const formatAmount = (amount: number) => {
    const formatted = (amount / 1000000).toFixed(0)
    return `$${formatted}M`
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    return 'Just now'
  }
  return (
    <div className="card">
      <div className="card-header">
        <h2>Recent Trading Activity</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading activity...
          </div>
        ) : activities.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No recent trading activity
          </div>
        ) : (
          <div className="activity-list">
            {activities.map((activity) => {
              // Determine trend based on price (simplified)
              const trend = activity.price >= 98 ? 'up' : 'down'
              const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown
              return (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon trading">
                    <ArrowLeftRight />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.borrower}</div>
                    <div className="activity-description">
                      {activity.buyer} ← {activity.seller}
                    </div>
                  </div>
                  <div className="activity-details">
                    <div className="activity-amount">{formatAmount(activity.amount)}</div>
                    <div className={`activity-price ${trend}`}>
                      <TrendIcon className="price-icon" />
                      {activity.price}%
                    </div>
                  </div>
                  <div className="activity-time">
                    <Clock className="time-icon" />
                    {getTimeAgo(activity.created_at)}
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

