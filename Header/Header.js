"use client";

import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          EZLaunch
        </Link>
        <nav className={styles.nav}>
          <Link href="https://github.com/infiplextech/ezlaunch" className={styles.link}>
            GitHub
          </Link>
          <Link href="https://infiplextech.com" className={styles.link}>
            By InfiplexTech
          </Link>
        </nav>
      </div>
    </header>
  );
} 