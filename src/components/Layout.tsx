import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText, 
  BarChart3,
  Zap,
  Rocket,
  FileCheck,
  ArrowLeftRight,
  Leaf
} from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/origination', icon: Rocket, label: 'Loan Origination' },
    { path: '/documents', icon: FileCheck, label: 'Document Management' },
    { path: '/trading', icon: ArrowLeftRight, label: 'Loan Trading' },
    { path: '/market-intelligence', icon: TrendingUp, label: 'Market Intelligence' },
    { path: '/deal-workflow', icon: FileText, label: 'Deal Workflow' },
    { path: '/sustainability', icon: Leaf, label: 'Sustainability' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  ]

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Zap className="logo-icon" />
            <span className="logo-text">CreditEdge</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

