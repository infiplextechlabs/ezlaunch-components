"use client";

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme preference
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.style.colorScheme = 'light';
      html.setAttribute('data-theme', 'light');
    } else {
      html.style.colorScheme = 'dark';
      html.setAttribute('data-theme', 'dark');
    }
    setIsDark(!isDark);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className={styles.themeToggle}
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
} 