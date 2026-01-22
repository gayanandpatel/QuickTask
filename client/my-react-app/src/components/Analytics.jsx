import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the URL logic at the top of the component or outside
const ANALYTICS_URL = import.meta.env.VITE_ANALYTICS_URL || 'http://localhost:5001/api';

import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell 
} from 'recharts';
import styles from './Analytics.module.css'; // Import the new CSS Module

const Analytics = ({ refreshTrigger }) => {
  const [stats, setStats] = useState(null);
  const [trend, setTrend] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch User Stats
        // const statsRes = await axios.get(`http://localhost:5001/api/stats/user?userId=${userId}`);
        const statsRes = await axios.get(`${ANALYTICS_URL}/stats/user?userId=${userId}`);
        setStats(statsRes.data);

        // Fetch Productivity Trend
        // const trendRes = await axios.get(`http://localhost:5001/api/stats/productivity?userId=${userId}`);
        const trendRes = await axios.get(`${ANALYTICS_URL}/stats/productivity?userId=${userId}`);
        setTrend(trendRes.data);
      } catch (error) {
        console.error("Analytics Error:", error);
      }
    };

    if (userId) fetchData();
  }, [userId, refreshTrigger]);

  if (!stats) return <div className={styles.loading}>Loading Analytics...</div>;

  // Data for Pie Chart (Priorities)
  const priorityData = [
    { name: 'High', value: stats.byPriority?.High || 0, color: '#ef4444' },   // Red 500
    { name: 'Medium', value: stats.byPriority?.Medium || 0, color: '#f59e0b' }, // Amber 500
    { name: 'Low', value: stats.byPriority?.Low || 0, color: '#10b981' }      // Emerald 500
  ];

  // Helper for dynamic colors
  const getProgressColor = (rate) => (rate >= 50 ? '#10b981' : '#ef4444');

  return (
    <div className={styles.container}>
      {/* 1. Top Cards Row */}
      <div className={styles.cardGrid}>
        
        {/* Card: Total Tasks */}
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>Total Tasks</h4>
          <p className={styles.bigNumber}>{stats.totalTasks}</p>
        </div>

        {/* Card: Completion Rate */}
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>Completion Rate</h4>
          <p 
            className={styles.bigNumber} 
            style={{ color: getProgressColor(stats.completionRate) }}
          >
            {stats.completionRate}%
          </p>
          <div className={styles.progressBarBg}>
            <div 
              className={styles.progressBarFill} 
              style={{ 
                width: `${stats.completionRate}%`, 
                backgroundColor: getProgressColor(stats.completionRate) 
              }}
            />
          </div>
        </div>

        {/* Card: Pending */}
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>Pending</h4>
          <p className={styles.bigNumber}>{stats.pendingTasks}</p>
        </div>
      </div>

      {/* 2. Charts Row */}
      <div className={styles.chartsGrid}>
        
        {/* Left: Stacked Bar Chart (Status Trend) */}
        <div className={styles.chartCard}>
          <h4 className={styles.chartTitle}>📅 Weekly Activity</h4>
          <div className={styles.chartContainer}>
            {trend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis 
                    dataKey="date" 
                    tick={{fontSize: 12, fill: '#64748b'}} 
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    allowDecimals={false} 
                    tick={{fontSize: 12, fill: '#64748b'}} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}} 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" />
                  
                  {/* Stacked Bars */}
                  <Bar dataKey="Todo" stackId="a" fill="#94a3b8" name="To Do" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="In Progress" stackId="a" fill="#f59e0b" name="In Progress" />
                  <Bar dataKey="Completed" stackId="a" fill="#10b981" name="Completed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className={styles.noData}>No data available for the last 7 days</p>
            )}
          </div>
        </div>

        {/* Right: Pie Chart (Priority) */}
        <div className={styles.chartCard}>
          <h4 className={styles.chartTitle}>⚡ Tasks by Priority</h4>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;