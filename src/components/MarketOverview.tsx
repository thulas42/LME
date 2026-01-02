import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', volume: 1.8, deals: 32 },
  { month: 'Feb', volume: 2.1, deals: 38 },
  { month: 'Mar', volume: 1.9, deals: 35 },
  { month: 'Apr', volume: 2.4, deals: 42 },
  { month: 'May', volume: 2.6, deals: 45 },
  { month: 'Jun', volume: 2.4, deals: 47 },
]

export default function MarketOverview() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Market Overview</h2>
        <span className="card-subtitle">6-month trend</span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="volume"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Volume (B)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="deals"
              stroke="#10b981"
              strokeWidth={2}
              name="Deals"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

