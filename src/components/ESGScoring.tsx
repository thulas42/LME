import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const esgData = [
  { name: 'Environmental', score: 88, color: '#10b981' },
  { name: 'Social', score: 82, color: '#3b82f6' },
  { name: 'Governance', score: 90, color: '#8b5cf6' },
]

export default function ESGScoring() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>ESG Scoring Dashboard</h2>
        <span className="card-subtitle">Portfolio-wide ESG performance</span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={esgData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value}/100`, 'Score']}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {esgData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="esg-summary">
          <div className="esg-summary-item">
            <span className="summary-label">Overall ESG Score</span>
            <span className="summary-value">87/100</span>
          </div>
          <div className="esg-summary-item">
            <span className="summary-label">Portfolio Coverage</span>
            <span className="summary-value">94%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

