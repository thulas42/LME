import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const riskData = [
  { metric: 'Credit Risk', score: 72, threshold: 80 },
  { metric: 'Market Risk', score: 65, threshold: 75 },
  { metric: 'Liquidity Risk', score: 58, threshold: 70 },
  { metric: 'Operational Risk', score: 68, threshold: 75 },
]

export default function RiskMetrics() {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={riskData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="metric" stroke="#6b7280" />
          <YAxis stroke="#6b7280" domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="score" fill="#3b82f6" name="Current Score" />
          <Bar dataKey="threshold" fill="#ef4444" name="Threshold" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

