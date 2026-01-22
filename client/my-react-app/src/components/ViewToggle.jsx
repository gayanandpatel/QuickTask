import styles from './ViewToggle.module.css';

const ViewToggle = ({ options, activeValue, onChange }) => {
  // Find the index of the active value to calculate slider position
  const activeIndex = options.findIndex(opt => opt.value === activeValue);
  
  // Calculate percentage for the slider translation
  // e.g., if 2 items, move 100% per index. 
  // Note: This simple calculation assumes equal width buttons.
  const sliderStyle = {
    width: `${100 / options.length}%`,
    transform: `translateX(${activeIndex * 100}%)`
  };

  return (
    <div className={styles.container}>
      {/* The sliding white pill */}
      <div className={styles.slider} style={sliderStyle} />

      {options.map((option) => (
        <button
          key={option.value}
          className={`${styles.button} ${activeValue === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
          style={{ width: `${100 / options.length}%` }} // Force equal widths
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;