import { Leaf, CheckCircle, TrendingUp, DollarSign } from 'lucide-react'

const greenLoans = [
  {
    id: 1,
    name: 'Solar Farm Development',
    borrower: 'SunPower Energy',
    amount: '$150M',
    category: 'Renewable Energy',
    esgScore: 92,
    carbonReduction: '25kt CO₂/year',
    status: 'active',
  },
  {
    id: 2,
    name: 'Green Building Retrofit',
    borrower: 'EcoBuild Corp',
    amount: '$85M',
    category: 'Green Buildings',
    esgScore: 88,
    carbonReduction: '12kt CO₂/year',
    status: 'active',
  },
  {
    id: 3,
    name: 'Electric Vehicle Fleet',
    borrower: 'CleanTransport Ltd',
    amount: '$45M',
    category: 'Clean Transport',
    esgScore: 85,
    carbonReduction: '8kt CO₂/year',
    status: 'pending',
  },
]

export default function GreenLendingPortfolio() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Green Lending Portfolio</h2>
      </div>
      <div className="card-body">
        <div className="green-loan-list">
          {greenLoans.map((loan) => (
            <div key={loan.id} className="green-loan-item">
              <div className="green-loan-header">
                <Leaf className="green-icon" />
                <div className="green-loan-info">
                  <div className="green-loan-name">{loan.name}</div>
                  <div className="green-loan-borrower">{loan.borrower}</div>
                </div>
                <div className="green-loan-amount">{loan.amount}</div>
              </div>
              <div className="green-loan-body">
                <div className="green-loan-details">
                  <div className="green-detail">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{loan.category}</span>
                  </div>
                  <div className="green-detail">
                    <span className="detail-label">ESG Score:</span>
                    <span className="detail-value score-high">{loan.esgScore}/100</span>
                  </div>
                  <div className="green-detail">
                    <span className="detail-label">Carbon Reduction:</span>
                    <span className="detail-value">{loan.carbonReduction}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

