import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
}

export default function StatCard({ icon: Icon, title, value, change, trend }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <Icon className="stat-icon" />
        <span className="stat-title">{title}</span>
      </div>
      <div className="stat-card-body">
        <div className="stat-value">{value}</div>
        <div className={`stat-change ${trend}`}>
          {change}
        </div>
      </div>
    </div>
  )
}

