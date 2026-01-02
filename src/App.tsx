import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import LoanOrigination from './pages/LoanOrigination'
import DocumentManagement from './pages/DocumentManagement'
import LoanTrading from './pages/LoanTrading'
import MarketIntelligence from './pages/MarketIntelligence'
import DealWorkflow from './pages/DealWorkflow'
import Sustainability from './pages/Sustainability'
import Analytics from './pages/Analytics'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/origination" element={<LoanOrigination />} />
          <Route path="/documents" element={<DocumentManagement />} />
          <Route path="/trading" element={<LoanTrading />} />
          <Route path="/market-intelligence" element={<MarketIntelligence />} />
          <Route path="/deal-workflow" element={<DealWorkflow />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

