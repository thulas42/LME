import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const trendData = [
  { period: 'Q1', volume: 6.2, spread: 185 },
  { period: 'Q2', volume: 7.1, spread: 172 },
  { period: 'Q3', volume: 6.8, spread: 168 },
  { period: 'Q4', volume: 7.5, spread: 165 },
]

export default function MarketTrends() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Market Trends</h2>
        <span className="card-subtitle">Quarterly analysis</span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="period" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="volume"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorVolume)"
              name="Volume (B)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="spread"
              stroke="#10b981"
              fillOpacity={0.3}
              fill="#10b981"
              name="Spread (bps)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

