import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const sustainabilityData = [
  { category: 'Renewable Energy', amount: 450, target: 500 },
  { category: 'Green Buildings', amount: 320, target: 400 },
  { category: 'Clean Transport', amount: 280, target: 350 },
  { category: 'Water Management', amount: 150, target: 200 },
]

export default function SustainabilityMetrics() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Sustainability Portfolio</h2>
        <span className="card-subtitle">Green lending by category (Millions USD)</span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sustainabilityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="category" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="amount" fill="#10b981" name="Current Portfolio" />
            <Bar dataKey="target" fill="#3b82f6" name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

