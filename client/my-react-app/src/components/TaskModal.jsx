import { useState, useEffect } from 'react';
import styles from './TaskModal.module.css';

const initialFormState = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Todo',
  dueDate: ''
};

const TaskModal = ({ isOpen, onClose, onSave, taskToEdit }) => {
  const [formData, setFormData] = useState(initialFormState);

  // Update state when taskToEdit changes or modal opens
  useEffect(() => {
    if (taskToEdit) {
      const formattedDate = taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : '';
      setFormData({ ...taskToEdit, dueDate: formattedDate });
    } else {
      setFormData(initialFormState);
    }
  }, [taskToEdit, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* stopPropagation prevents closing when clicking inside the modal */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>
            {taskToEdit ? 'Edit Task' : 'Create New Task'}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className={styles.group}>
            <label className={styles.label}>Title <span style={{color: 'red'}}>*</span></label>
            <input 
              className={styles.input}
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g. Review Q3 Financials"
              required 
              autoFocus
            />
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Description</label>
            <textarea 
              className={styles.textarea}
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Add details about this task..."
            />
          </div>

          <div className={styles.row}>
            <div className={styles.group}>
              <label className={styles.label}>Priority</label>
              <select 
                className={styles.select}
                name="priority" 
                value={formData.priority} 
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Status</label>
              <select 
                className={styles.select}
                name="status" 
                value={formData.status} 
                onChange={handleChange}
              >
                <option value="Todo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Due Date</label>
            <input 
              className={styles.input}
              type="date" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange} 
            />
          </div>

          <div className={styles.actions}>
            <button 
              type="button" 
              onClick={onClose} 
              className={styles.btnCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.btnSave}
            >
              {taskToEdit ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;