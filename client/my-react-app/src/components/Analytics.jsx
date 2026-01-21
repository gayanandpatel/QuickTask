import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [trend, setTrend] = useState([]);
  
  // Assuming userId is stored in localStorage after login
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch User Stats
        const statsRes = await axios.get(`http://localhost:5001/api/stats/user?userId=${userId}`);
        setStats(statsRes.data);

        // Fetch Productivity Trend
        const trendRes = await axios.get(`http://localhost:5001/api/stats/productivity?userId=${userId}`);
        setTrend(trendRes.data);
      } catch (error) {
        console.error("Analytics Error:", error);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  if (!stats) return <div>Loading Analytics...</div>;

  return (
    <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <h3>Analytics Dashboard</h3>
      
      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={cardStyle}>
          <h4>Total Tasks</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalTasks}</p>
        </div>
        <div style={cardStyle}>
          <h4>Completion Rate</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.completionRate}%</p>
        </div>
        <div style={cardStyle}>
          <h4>Pending</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.pendingTasks}</p>
        </div>
      </div>

      {/* Productivity Chart */}
      <div style={{ height: '300px', backgroundColor: 'white', padding: '10px', borderRadius: '8px' }}>
        <h4>Tasks Completed (Last 7 Days)</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trend}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="completed" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const cardStyle = {
  flex: 1,
  backgroundColor: 'white',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

export default Analytics;