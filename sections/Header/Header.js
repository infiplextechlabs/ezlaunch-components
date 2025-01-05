import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Header.module.css";

const sectionsToShowInHeader = [
  "features",
  "howitworks",
  "testimonials",
  "pricing",
  "contact",
];

const sectionIdToTitle = {
  features: "Features",
  howitworks: "How It Works",
  testimonials: "Testimonials",
  pricing: "Pricing",
  contact: "Contact",
};

const Header = ({ projectName, selectedSections }) => {
  const sectionsToShow = selectedSections.filter((section) =>
    sectionsToShowInHeader.includes(section)
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.brandName}>{projectName}</h1>
        <div className={styles.headerRight}>
          <nav>
            {sectionsToShow.map((section) => (
              <a key={section} href={`#${section}`}>
                {sectionIdToTitle[section]}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
