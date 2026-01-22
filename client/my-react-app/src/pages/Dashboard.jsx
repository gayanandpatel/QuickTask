import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api'; 

// Components
import TaskModal from '../components/TaskModal';
import DeleteModal from '../components/DeleteModal';
import Analytics from '../components/Analytics';
import ViewToggle from '../components/ViewToggle';
import ThemeToggle from '../components/ThemeToggle';

import styles from './Dashboard.module.css';

const Dashboard = () => {
  // --- STATE MANAGEMENT ---
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState(''); 
  const [sortBy, setSortBy] = useState('createdAt'); 
  const [searchQuery, setSearchQuery] = useState(''); // 1. New Search State
  
  const [refreshKey, setRefreshKey] = useState(0); 

  // UI State
  const [currentView, setCurrentView] = useState('tasks');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Selection State
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  
  const navigate = useNavigate();

  // --- DATA FETCHING ---
  useEffect(() => {
    const loadTasks = async () => {
      try {
        let query = `/tasks?sortBy=${sortBy}`;
        if (filterStatus) query += `&status=${filterStatus}`;
        
        const res = await api.get(query);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load tasks');
      }
    };
    loadTasks();
  }, [filterStatus, sortBy, refreshKey]);

  // --- 2. FILTER LOGIC (Instant Search) ---
  // We filter the already fetched 'tasks' array based on the search query
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- ACTIONS ---
  const refreshData = () => setRefreshKey(prev => prev + 1);

  const initiateDelete = (task) => setTaskToDelete(task);
  
  const confirmDelete = async () => {
    if (!taskToDelete) return;
    try {
      await api.delete(`/tasks/${taskToDelete._id}`);
      toast.success('Task Deleted');
      refreshData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete');
    } finally {
      setTaskToDelete(null); 
    }
  };

  const handleSave = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
        toast.success('Task Updated');
      } else {
        await api.post('/tasks', taskData);
        toast.success('Task Created');
      }
      setIsModalOpen(false);
      setEditingTask(null);
      refreshData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save task');
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      await api.put(`/tasks/${task._id}`, { ...task, status: newStatus });
      toast.success(`Moved to ${newStatus}`);
      refreshData();
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#cbd5e1'; 
    }
  };

  return (
    <div className={styles.container}>
      
      <header className={styles.header}>
        <div className={styles.brand}>
          ⚡ Quick<span>Task</span>
        </div>
        <div className={styles.headerActions}>
          <ThemeToggle />
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Sign Out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <ViewToggle 
            options={[
              { label: 'My Tasks', value: 'tasks' },
              { label: 'Insights', value: 'analytics' }
            ]}
            activeValue={currentView}
            onChange={setCurrentView}
          />
        </div>

        {currentView === 'tasks' ? (
          <>
            {/* Controls Bar */}
            <div className={styles.controls}>
              
              {/* 3. SEARCH INPUT */}
              <div className={styles.searchWrapper}>
                <svg className={styles.searchIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search tasks..." 
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select 
                className={styles.select}
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Todo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <select 
                className={styles.select}
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Newest First</option>
                <option value="date">Due Date</option>
                <option value="priority">Priority</option>
              </select>

              <button onClick={openCreateModal} className={styles.addBtn}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Task
              </button>
            </div>

            {/* Task Grid */}
            {/* 4. Use filteredTasks instead of tasks */}
            {filteredTasks.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>
                  {searchQuery ? `No results for "${searchQuery}"` : "No tasks found"}
                </h3>
                <p>
                  {searchQuery ? "Try a different keyword" : "Create a new task to get started!"}
                </p>
              </div>
            ) : (
              <div className={styles.grid}>
                {filteredTasks.map(task => (
                  <div key={task._id} className={styles.card}>
                    <div 
                      className={styles.priorityStrip} 
                      style={{ backgroundColor: getPriorityColor(task.priority) }} 
                    />

                    <div className={styles.cardHeader}>
                      <h3 className={styles.taskTitle}>{task.title}</h3>
                      <span 
                        className={styles.priorityBadge}
                        style={{ color: getPriorityColor(task.priority) }}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p className={styles.taskDesc}>{task.description}</p>
                    
                    <div className={styles.meta}>
                      <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</span>
                    </div>

                    <div className={styles.actions}>
                      <select 
                        className={styles.statusSelect}
                        value={task.status} 
                        onChange={(e) => handleStatusChange(task, e.target.value)}
                      >
                        <option>Todo</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                      
                      <button 
                        className={styles.iconBtn} 
                        onClick={() => openEditModal(task)}
                        title="Edit Task"
                      >
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button 
                        className={`${styles.iconBtn} ${styles.deleteBtn}`} 
                        onClick={() => initiateDelete(task)}
                        title="Delete Task"
                      >
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.analyticsWrapper}>
            <Analytics refreshTrigger={refreshKey} />
          </div>
        )}

      </main>

      {isModalOpen && (
        <TaskModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave} 
          taskToEdit={editingTask}
        />
      )}

      <DeleteModal 
        isOpen={!!taskToDelete} 
        onClose={() => setTaskToDelete(null)} 
        onConfirm={confirmDelete}
        taskTitle={taskToDelete?.title}
      />

    </div>
  );
};

export default Dashboard;