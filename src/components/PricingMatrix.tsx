const pricingData = [
  { sector: 'Technology', avgSpread: 165, deals: 12, volume: 1.2 },
  { sector: 'Healthcare', avgSpread: 180, deals: 8, volume: 0.9 },
  { sector: 'Energy', avgSpread: 195, deals: 15, volume: 1.8 },
  { sector: 'Real Estate', avgSpread: 175, deals: 10, volume: 1.1 },
  { sector: 'Manufacturing', avgSpread: 185, deals: 7, volume: 0.8 },
]

export default function PricingMatrix() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Pricing Matrix</h2>
        <span className="card-subtitle">By sector (avg spread in bps)</span>
      </div>
      <div className="card-body">
        <div className="pricing-table">
          <div className="pricing-header">
            <div className="pricing-col">Sector</div>
            <div className="pricing-col">Avg Spread</div>
            <div className="pricing-col">Deals</div>
            <div className="pricing-col">Volume (B)</div>
          </div>
          {pricingData.map((row, index) => (
            <div key={index} className="pricing-row">
              <div className="pricing-col">{row.sector}</div>
              <div className="pricing-col">
                <span className="spread-value">{row.avgSpread}</span>
                <span className="spread-unit">bps</span>
              </div>
              <div className="pricing-col">{row.deals}</div>
              <div className="pricing-col">${row.volume}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

