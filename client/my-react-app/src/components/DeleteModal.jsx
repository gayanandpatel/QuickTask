import styles from './DeleteModal.module.css';

const DeleteModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* Warning Icon */}
        <div className={styles.iconWrapper}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h3 className={styles.title}>Delete Task</h3>
        
        <p className={styles.description}>
          Are you sure you want to delete <span className={styles.taskName}>"{taskTitle}"</span>? 
          <br />
          This action cannot be undone.
        </p>

        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btnDelete} onClick={onConfirm}>
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteModal;