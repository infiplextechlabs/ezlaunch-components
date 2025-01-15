import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Header.module.css";

const Header = ({ config }) => {
  if (!config) return null;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.brandName}>{config.title}</h1>
        <div className={styles.headerRight}>
          <nav>
            {config.nav_items?.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          {config.cta_button && (
            <button
              className={styles.ctaButton}
              onClick={() => (window.location.href = config.cta_button.href)}
            >
              {config.cta_button.label}
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
