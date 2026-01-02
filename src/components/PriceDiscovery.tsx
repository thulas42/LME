import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const priceData = [
  { date: 'Jan', avgPrice: 98.2, high: 99.5, low: 97.1 },
  { date: 'Feb', avgPrice: 98.5, high: 99.8, low: 97.3 },
  { date: 'Mar', avgPrice: 98.8, high: 99.9, low: 97.5 },
  { date: 'Apr', avgPrice: 99.0, high: 100.1, low: 97.8 },
  { date: 'May', avgPrice: 99.2, high: 100.3, low: 98.0 },
  { date: 'Jun', avgPrice: 99.1, high: 100.2, low: 97.9 },
]

export default function PriceDiscovery() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Price Discovery & Market Trends</h2>
        <span className="card-subtitle">Secondary market pricing trends</span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" domain={[96, 101]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgPrice"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Average Price (%)"
            />
            <Line
              type="monotone"
              dataKey="high"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="High (%)"
            />
            <Line
              type="monotone"
              dataKey="low"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Low (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

