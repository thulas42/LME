import { TrendingUp, DollarSign, FileText, Users, Clock, AlertCircle } from 'lucide-react'
import StatCard from '../components/StatCard'
import RecentActivity from '../components/RecentActivity'
import MarketOverview from '../components/MarketOverview'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="subtitle">Real-time overview of loan market activity</p>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={DollarSign}
          title="Total Deal Volume"
          value="$2.4B"
          change="+12.5%"
          trend="up"
        />
        <StatCard
          icon={FileText}
          title="Active Deals"
          value="47"
          change="+8"
          trend="up"
        />
        <StatCard
          icon={TrendingUp}
          title="Market Activity"
          value="High"
          change="+15 deals"
          trend="up"
        />
        <StatCard
          icon={Users}
          title="Active Participants"
          value="124"
          change="+6"
          trend="up"
        />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <MarketOverview />
        </div>
        <div className="dashboard-section">
          <RecentActivity />
        </div>
      </div>

      <div className="alerts-section">
        <div
          className="alert-card"
          onClick={() => {
            console.log('Viewing market opportunity')
            // In a real app, this would navigate to the opportunity details
          }}
          style={{ cursor: 'pointer' }}
        >
          <AlertCircle className="alert-icon" />
          <div className="alert-content">
            <h3>Market Opportunity</h3>
            <p>New syndicated loan opportunity in renewable energy sector - €500M facility</p>
          </div>
        </div>
      </div>
    </div>
  )
}

