import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const portfolioData = [
  { name: 'Technology', value: 28, color: '#3b82f6' },
  { name: 'Healthcare', value: 22, color: '#10b981' },
  { name: 'Energy', value: 20, color: '#f59e0b' },
  { name: 'Real Estate', value: 18, color: '#8b5cf6' },
  { name: 'Manufacturing', value: 12, color: '#ef4444' },
]

export default function PortfolioAnalysis() {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={portfolioData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {portfolioData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

