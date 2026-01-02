import { Clock, FileText, DollarSign, Users } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'deal',
    icon: FileText,
    title: 'New Deal Created',
    description: 'Syndicated loan facility - €500M',
    time: '2 hours ago',
    status: 'active',
  },
  {
    id: 2,
    type: 'pricing',
    icon: DollarSign,
    title: 'Pricing Updated',
    description: 'Corporate loan pricing adjusted',
    time: '4 hours ago',
    status: 'info',
  },
  {
    id: 3,
    type: 'participant',
    icon: Users,
    title: 'New Participant',
    description: 'Bank of Europe joined platform',
    time: '6 hours ago',
    status: 'info',
  },
  {
    id: 4,
    type: 'deal',
    icon: FileText,
    title: 'Deal Completed',
    description: 'Infrastructure loan - £250M',
    time: '1 day ago',
    status: 'completed',
  },
]

export default function RecentActivity() {
  const handleActivityClick = (activity: typeof activities[0]) => {
    console.log('Viewing activity:', activity.title)
    // In a real app, this would navigate to the activity details
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Recent Activity</h2>
      </div>
      <div className="card-body">
        <div className="activity-list">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="activity-item"
                onClick={() => handleActivityClick(activity)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`activity-icon ${activity.status}`}>
                  <Icon />
                </div>
                <div className="activity-content">
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-description">{activity.description}</div>
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

