import { useState } from 'react';

const initialFormState = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Todo',
  dueDate: ''
};

const TaskModal = ({ isOpen, onClose, onSave, taskToEdit }) => {
  // Initialize form data state
  const [formData, setFormData] = useState(() => {
    if (taskToEdit) {
      const formattedDate = taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : '';
      return { ...taskToEdit, dueDate: formattedDate };
    }
    return initialFormState;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

// Render nothing if modal is not open
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          
          <div style={styles.group}>
            <label>Title *</label>
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              style={styles.input}
            />
          </div>

          <div style={styles.group}>
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.group}>
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange} style={styles.input}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div style={styles.group}>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} style={styles.input}>
                <option>Todo</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div style={styles.group}>
            <label>Due Date</label>
            <input 
              type="date" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange} 
              style={styles.input}
            />
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.saveBtn}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles
const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px', maxWidth: '90%' },
  group: { marginBottom: '15px' },
  row: { display: 'flex', gap: '10px' },
  input: { width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' },
  saveBtn: { padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  cancelBtn: { padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default TaskModal;