import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const sectorData = [
  { sector: 'Tech', volume: 1.2, deals: 12, avgSize: 100 },
  { sector: 'Healthcare', volume: 0.9, deals: 8, avgSize: 112 },
  { sector: 'Energy', volume: 1.8, deals: 15, avgSize: 120 },
  { sector: 'Real Estate', volume: 1.1, deals: 10, avgSize: 110 },
  { sector: 'Manufacturing', volume: 0.8, deals: 7, avgSize: 114 },
]

export default function SectorAnalysis() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Sector Analysis</h2>
        <span className="card-subtitle">Market activity by sector</span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sectorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="sector" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="volume" fill="#3b82f6" name="Volume (B)" />
            <Bar yAxisId="right" dataKey="deals" fill="#10b981" name="Deals" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

