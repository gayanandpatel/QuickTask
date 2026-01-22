import styles from './ViewToggle.module.css';

const ViewToggle = ({ options, activeValue, onChange }) => {
  // Find the index of the active value to calculate slider position
  const activeIndex = options.findIndex(opt => opt.value === activeValue);
  
// Style for the sliding pill
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
          style={{ width: `${100 / options.length}%` }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;