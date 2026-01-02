import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import MarketIntelligence from './pages/MarketIntelligence'
import DealWorkflow from './pages/DealWorkflow'
import Analytics from './pages/Analytics'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/market-intelligence" element={<MarketIntelligence />} />
          <Route path="/deal-workflow" element={<DealWorkflow />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

