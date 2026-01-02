import { ArrowLeftRight, TrendingUp, TrendingDown, Clock } from 'lucide-react'

const activities = [
  {
    id: 1,
    loan: 'TechCorp Industries',
    amount: '$5M',
    price: 98.5,
    buyer: 'Bank A',
    seller: 'Bank B',
    time: '2 hours ago',
    trend: 'up',
  },
  {
    id: 2,
    loan: 'GreenEnergy Solutions',
    amount: '$8M',
    price: 99.2,
    buyer: 'Bank C',
    seller: 'Bank D',
    time: '5 hours ago',
    trend: 'up',
  },
  {
    id: 3,
    loan: 'InfraBuild Ltd',
    amount: '$12M',
    price: 97.8,
    buyer: 'Bank E',
    seller: 'Bank F',
    time: '1 day ago',
    trend: 'down',
  },
]

export default function TradingActivity() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Recent Trading Activity</h2>
      </div>
      <div className="card-body">
        <div className="activity-list">
          {activities.map((activity) => {
            const TrendIcon = activity.trend === 'up' ? TrendingUp : TrendingDown
            return (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon trading">
                  <ArrowLeftRight />
                </div>
                <div className="activity-content">
                  <div className="activity-title">{activity.loan}</div>
                  <div className="activity-description">
                    {activity.buyer} ← {activity.seller}
                  </div>
                </div>
                <div className="activity-details">
                  <div className="activity-amount">{activity.amount}</div>
                  <div className={`activity-price ${activity.trend}`}>
                    <TrendIcon className="price-icon" />
                    {activity.price}%
                  </div>
                </div>
                <div className="activity-time">
                  <Clock className="time-icon" />
                  {activity.time}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

