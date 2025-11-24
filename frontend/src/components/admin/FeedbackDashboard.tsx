import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AlertCircle } from 'lucide-react';

interface FeedbackStats {
  total: number;
  happy: number;
  sad: number;
  happyPercentage: string;
  sadPercentage: string;
}

const FeedbackDashboard = () => {
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedbackStats();
  }, []);

  const fetchFeedbackStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/feedback/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch feedback statistics');
      }

      const result = await response.json();
      setStats(result.data);
    } catch (err) {
      setError('Failed to load feedback statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <p className="text-center text-gray-500">Loading feedback statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow p-6 border border-red-200">
        <div className="flex items-center gap-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const chartData = stats ? [
    { name: 'Happy', value: stats.happy, color: '#10b981' },
    { name: 'Not Satisfied', value: stats.sad, color: '#ef4444' }
  ] : [];

  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
      <h3 className="text-xl font-bold mb-6">Case Search Feedback Analytics</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-4 text-center">
            Feedback Distribution
          </h4>
          {stats && stats.total > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No feedback data available
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-4">
            Feedback Statistics
          </h4>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Feedback</p>
            <p className="text-3xl font-bold text-blue-600">{stats?.total || 0}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Happy Responses</p>
            <p className="text-3xl font-bold text-green-600">{stats?.happy || 0}</p>
            <p className="text-sm text-gray-500 mt-1">{stats?.happyPercentage}%</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Not Satisfied</p>
            <p className="text-3xl font-bold text-red-600">{stats?.sad || 0}</p>
            <p className="text-sm text-gray-500 mt-1">{stats?.sadPercentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDashboard;