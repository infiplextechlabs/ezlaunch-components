"use client";

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer({name, email}) {
  if(!name || !email) {
    name = 'InfiplexTech';
    email = 'hello@infiplextech.com';
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </div>
          <div className={styles.links}>
            <Link href="/privacy" className={styles.link}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.link}>
              Terms of Service
            </Link>
            <a 
              href={`mailto:${email}`} 
              className={styles.link}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 