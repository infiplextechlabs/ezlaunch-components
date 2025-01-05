import StyleSwitcher from "@/components/StyleSwitcher/StyleSwitcher";
import { useEffect, useState } from "react";
import styles from "./About.module.css";

const ABOUT_STYLES = ["default", "split", "cards", "minimal", "timeline"];

export default function About({ config, previewMode }) {
  const [currentStyle, setCurrentStyle] = useState(0);

  const handleStyleChange = (newStyle) => {
    setCurrentStyle(newStyle);
  };

  useEffect(() => {
    if (config.style) {
      const styleIndex = ABOUT_STYLES.indexOf(config.style);
      setCurrentStyle(styleIndex);
    }
  }, [config]);

  const renderAboutContent = () => {
    switch (ABOUT_STYLES[currentStyle]) {
      case "split":
        return (
          <div className={`${styles.container} ${styles.splitContainer}`}>
            <div className={styles.imageSection}>
              <div className={styles.imagePlaceholder} />
            </div>
            <div className={styles.contentSection}>
              <h2>About Us</h2>
              <div className={styles.aboutText}>
                <p>
                  We are {config.projectName}, dedicated to providing the best
                  solutions for our customers.
                </p>
                <p>{config.projectDescription}</p>
              </div>
              <button className={styles.learnMore}>Learn More</button>
            </div>
          </div>
        );

      case "cards":
        return (
          <div className={styles.container}>
            <h2>About Us</h2>
            <div className={styles.cardsGrid}>
              <div className={styles.card}>
                <h3>Our Mission</h3>
                <p>We are {config.projectName}, dedicated to excellence.</p>
              </div>
              <div className={styles.card}>
                <h3>Our Vision</h3>
                <p>{config.projectDescription}</p>
              </div>
              <div className={styles.card}>
                <h3>Our Values</h3>
                <p>Innovation, Quality, Customer Success</p>
              </div>
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className={styles.container}>
            <div className={styles.minimalContent}>
              <span className={styles.label}>About Us</span>
              <h2>{config.projectName}</h2>
              <div className={styles.separator} />
              <p className={styles.description}>{config.projectDescription}</p>
            </div>
          </div>
        );

      case "timeline":
        return (
          <div className={styles.container}>
            <h2>Our Journey</h2>
            <div className={styles.timeline}>
              {[2021, 2022, 2023].map((year) => (
                <div key={year} className={styles.timelineItem}>
                  <div className={styles.timelineMarker} />
                  <div className={styles.timelineContent}>
                    <h3>{year}</h3>
                    <p>
                      Major milestone in our journey. {config.projectName}{" "}
                      achieved significant growth.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className={styles.container}>
            <h2>About Us</h2>
            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <p>
                  We are {config.projectName}, dedicated to providing the best
                  solutions for our customers.
                </p>
                <p>{config.projectDescription}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="about"
      className={`${styles.about} ${styles[ABOUT_STYLES[currentStyle]]}`}
    >
      {renderAboutContent()}
      <StyleSwitcher
        currentStyle={currentStyle}
        styles={ABOUT_STYLES}
        onStyleChange={handleStyleChange}
      />
    </section>
  );
}
