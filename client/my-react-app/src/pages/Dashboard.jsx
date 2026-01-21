import { useEffect, useState } from 'react';
import api from '../api'; 
import { toast } from 'react-toastify';
import TaskModal from '../components/TaskModal';
import Analytics from '../components/Analytics';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState(''); 
  const [sortBy, setSortBy] = useState('createdAt'); 
  
// Used to trigger re-fetching tasks
  const [refreshKey, setRefreshKey] = useState(0); 

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

// 1. Fetch Tasks
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

// Function to trigger task reload
  const refreshTasks = () => {
    setRefreshKey(prev => prev + 1);
  };

  // 2. Delete Task
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success('Task Deleted');
        refreshTasks();
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete');
      }
    }
  };

// 3. Save Task (Create/Update)
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
      refreshTasks();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save task');
    }
  };

  // 4. Quick Status Update
  const handleStatusChange = async (task, newStatus) => {
    try {
      await api.put(`/tasks/${task._id}`, { ...task, status: newStatus });
      toast.success('Status Updated');
      refreshTasks();
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

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Task Dashboard</h1>
        <button onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      

      {/* SECTION: Task Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
        <button onClick={openCreateModal} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          + Add New Task
        </button>
        
        {/* Filter Dropdown */}
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: '10px' }}>
          <option value="">All Statuses</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Sort Dropdown */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '10px' }}>
          <option value="createdAt">Newest First</option>
          <option value="date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {/* SECTION: Task Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {tasks.map(task => (
          <div key={task._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: 'white', borderLeft: `5px solid ${getPriorityColor(task.priority)}` }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{task.title}</h3>
            <p style={{ color: '#666', fontSize: '0.9em' }}>{task.description}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', color: '#888', marginBottom: '10px' }}>
              <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</span>
              <span style={{ fontWeight: 'bold', color: getPriorityColor(task.priority) }}>{task.priority}</span>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <select 
                value={task.status} 
                onChange={(e) => handleStatusChange(task, e.target.value)}
                style={{ padding: '5px', borderRadius: '4px', flex: 1 }}
              >
                <option>Todo</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              
              <button onClick={() => openEditModal(task)} style={{ cursor: 'pointer', padding: '5px 10px' }}>Edit</button>
              <button onClick={() => handleDelete(task._id)} style={{ cursor: 'pointer', padding: '5px 10px', color: 'red' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION: Analytics */}
      <Analytics />

      {/* The Modal Component */}
      {isModalOpen && (
        <TaskModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave} 
          taskToEdit={editingTask}
        />
      )}
    </div>
  );
};

const getPriorityColor = (priority) => {
  switch(priority) {
    case 'High': return '#dc3545'; 
    case 'Medium': return '#ffc107'; 
    case 'Low': return '#28a745'; 
    default: return '#ccc';
  }
};

export default Dashboard;