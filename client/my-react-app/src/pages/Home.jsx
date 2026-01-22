import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          ⚡ Quick<span>Task</span>
        </div>
        {/* Optional: Add a small login link in nav if desired */}
        <button 
          className={styles.btnSecondary} 
          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
      </nav>

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={styles.badge}>
          Task Management Application
        </div>

        <h1 className={styles.title}>
          Efficiency meets <br />
          <span className={styles.titleHighlight}>Data-Driven Insights</span>
        </h1>

        <p className={styles.description}>
          Manage your daily operations with our high-performance Node.js core, 
          and visualize your productivity with Python-powered analytics.
        </p>

        {/* CTA Buttons */}
        <div className={styles.ctaGroup}>
          <button 
            className={styles.btnPrimary}
            onClick={() => navigate('/register')}
          >
            Get Started
          </button>
          
          <button 
            className={styles.btnSecondary}
            onClick={() => navigate('/login')}
          >
            Log In
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} QuickTask. Optimized for Performance.
      </footer>
    </div>
  );
};

export default Home;