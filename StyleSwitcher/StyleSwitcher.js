"use client";
import styles from './StyleSwitcher.module.css';

export default function StyleSwitcher({ currentStyle, styles: styleOptions, onStyleChange }) {
  const handlePrevStyle = () => {
    const newIndex = currentStyle === 0 ? styleOptions.length - 1 : currentStyle - 1;
    onStyleChange(newIndex);
  };

  const handleNextStyle = () => {
    const newIndex = currentStyle === styleOptions.length - 1 ? 0 : currentStyle + 1;
    onStyleChange(newIndex);
  };

  const formatStyleName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className={styles.styleSwitcher}>
      <button 
        className={styles.arrow} 
        onClick={handlePrevStyle}
        aria-label="Previous style"
      >
        ←
      </button>
      <div className={styles.styleInfo}>
        <span className={styles.styleNumber}>{formatStyleName(styleOptions[currentStyle])}</span>
        <span className={styles.totalStyles}>{currentStyle + 1} of {styleOptions.length}</span>
      </div>
      <button 
        className={styles.arrow} 
        onClick={handleNextStyle}
        aria-label="Next style"
      >
        →
      </button>
    </div>
  );
} 