import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AlertCircle, TrendingUp, ThumbsUp, ThumbsDown } from 'lucide-react';

interface FeedbackStats {
  total: number;
  happy: number;
  sad: number;
  happyPercentage: string;
  sadPercentage: string;
}

const Feedback = () => {
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedbackStats();
  }, []);

  const fetchFeedbackStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/feedback/stats', {
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
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Feedback Analytics</h2>
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <p className="text-center text-gray-500">Loading feedback statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Feedback Analytics</h2>
        <div className="bg-white rounded-xl shadow p-6 border border-red-200">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  const chartData = stats ? [
    { name: 'Happy', value: stats.happy, color: '#10b981' },
    { name: 'Not Satisfied', value: stats.sad, color: '#ef4444' }
  ] : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Feedback Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Feedback</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats?.total || 0}</p>
            </div>
            <TrendingUp className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Happy Responses</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats?.happy || 0}</p>
              <p className="text-sm text-gray-500 mt-1">{stats?.happyPercentage}%</p>
            </div>
            <ThumbsUp className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Not Satisfied</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats?.sad || 0}</p>
              <p className="text-sm text-gray-500 mt-1">{stats?.sadPercentage}%</p>
            </div>
            <ThumbsDown className="h-12 w-12 text-red-600" />
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h3 className="text-lg font-bold mb-6">Feedback Distribution</h3>
        
        {stats && stats.total > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
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
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <div>
                  <p className="font-semibold text-gray-700">Happy Users</p>
                  <p className="text-sm text-gray-500">
                    {stats.happy} out of {stats.total} ({stats.happyPercentage}%)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <div>
                  <p className="font-semibold text-gray-700">Not Satisfied Users</p>
                  <p className="text-sm text-gray-500">
                    {stats.sad} out of {stats.total} ({stats.sadPercentage}%)
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Overall satisfaction rate: 
                  <span className="font-bold text-lg ml-2">
                    {stats.happyPercentage}%
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No feedback data available</p>
              <p className="text-sm mt-2">Feedback will appear here once lawyers start using the search feature</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;