import { useEffect, useState } from 'react'
import { TrendingUp, DollarSign, FileText, Users, Clock, AlertCircle } from 'lucide-react'
import StatCard from '../components/StatCard'
import RecentActivity from '../components/RecentActivity'
import MarketOverview from '../components/MarketOverview'
import { marketAPI, dealsAPI } from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalDealVolume: 0,
    activeDeals: 0,
    participants: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const [marketResponse, dealsResponse] = await Promise.all([
        marketAPI.getDashboardStats(),
        dealsAPI.getStats(),
      ])
      
      setStats({
        totalDealVolume: marketResponse.data.totalDealVolume || 0,
        activeDeals: dealsResponse.data.in_progress || 0,
        participants: marketResponse.data.participants || 0,
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`
    }
    return `$${(value / 1000000).toFixed(1)}M`
  }

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
          value={loading ? '...' : formatCurrency(stats.totalDealVolume)}
          change="+12.5%"
          trend="up"
        />
        <StatCard
          icon={FileText}
          title="Active Deals"
          value={loading ? '...' : stats.activeDeals.toString()}
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
          value={loading ? '...' : stats.participants.toString()}
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

