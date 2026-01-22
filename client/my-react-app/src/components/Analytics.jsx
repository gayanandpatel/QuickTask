import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell 
} from 'recharts';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [trend, setTrend] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch User Stats
        const statsRes = await axios.get(`http://localhost:5001/api/stats/user?userId=${userId}`);
        setStats(statsRes.data);

        // Fetch Productivity Trend (Now returns Todo/In Progress/Completed per day)
        const trendRes = await axios.get(`http://localhost:5001/api/stats/productivity?userId=${userId}`);
        setTrend(trendRes.data);
      } catch (error) {
        console.error("Analytics Error:", error);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  if (!stats) return <div style={{textAlign: 'center', padding: '20px'}}>Loading Dashboard...</div>;

  // Data for Pie Chart (Priorities)
  const priorityData = [
    { name: 'High', value: stats.byPriority?.High || 0, color: '#dc3545' },   // Red
    { name: 'Medium', value: stats.byPriority?.Medium || 0, color: '#ffc107' }, // Yellow
    { name: 'Low', value: stats.byPriority?.Low || 0, color: '#28a745' }      // Green
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Analytics Overview</h2>
      
      {/* 1. Top Cards Row */}
      <div style={styles.cardGrid}>
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Total Tasks</h4>
          <p style={styles.bigNumber}>{stats.totalTasks}</p>
        </div>
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Completion Rate</h4>
          <p style={{...styles.bigNumber, color: stats.completionRate >= 50 ? '#28a745' : '#dc3545'}}>
            {stats.completionRate}%
          </p>
          <div style={styles.progressBarBg}>
            <div style={{...styles.progressBarFill, width: `${stats.completionRate}%`, backgroundColor: stats.completionRate >= 50 ? '#28a745' : '#dc3545'}}></div>
          </div>
        </div>
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Pending</h4>
          <p style={styles.bigNumber}>{stats.pendingTasks}</p>
        </div>
      </div>

      {/* 2. Charts Row */}
      <div style={styles.chartsGrid}>
        
        {/* Left: Stacked Bar Chart (Status Trend) */}
        <div style={styles.chartCard}>
          <h4 style={styles.chartTitle}>📅 Weekly Activity (Stacked)</h4>
          <div style={{ width: '100%', height: 300 }}>
            {trend.length > 0 ? (
              <ResponsiveContainer>
                <BarChart data={trend} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="date" tick={{fontSize: 12}} />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{fill: '#f0f0f0'}} />
                  <Legend />
                  
                  {/* STACKED BARS: All have the same stackId="a" */}
                  <Bar dataKey="Todo" stackId="a" fill="#6c757d" name="Todo" />
                  <Bar dataKey="In Progress" stackId="a" fill="#ffc107" name="In Progress" />
                  <Bar dataKey="Completed" stackId="a" fill="#28a745" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p style={styles.noData}>No data for the last 7 days</p>
            )}
          </div>
        </div>

        {/* Right: Pie Chart (Priority) */}
        <div style={styles.chartCard}>
          <h4 style={styles.chartTitle}>⚡ Tasks by Priority</h4>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { marginBottom: '30px' },
  header: { marginBottom: '20px', color: '#333', fontSize: '1.5rem' },
  cardGrid: { display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' },
  card: { flex: 1, minWidth: '200px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' },
  cardTitle: { margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
  bigNumber: { fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: '#333' },
  progressBarBg: { width: '100%', height: '6px', backgroundColor: '#eee', borderRadius: '3px', marginTop: '15px', overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: '3px', transition: 'width 0.5s ease' },
  chartsGrid: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  chartCard: { flex: 1, minWidth: '350px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eee' },
  chartTitle: { marginBottom: '20px', color: '#444' },
  noData: { textAlign: 'center', color: '#999', marginTop: '80px' }
};

export default Analytics;