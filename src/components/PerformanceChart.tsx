import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const performanceData = [
  { month: 'Jan', return: 2.1, benchmark: 1.8 },
  { month: 'Feb', return: 2.4, benchmark: 2.0 },
  { month: 'Mar', return: 2.2, benchmark: 1.9 },
  { month: 'Apr', return: 2.6, benchmark: 2.1 },
  { month: 'May', return: 2.8, benchmark: 2.3 },
  { month: 'Jun', return: 2.7, benchmark: 2.2 },
]

export default function PerformanceChart() {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
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
            dataKey="return"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Portfolio Return (%)"
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            stroke="#6b7280"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Benchmark (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

