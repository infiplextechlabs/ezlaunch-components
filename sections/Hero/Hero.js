import StyleSwitcher from "@/components/StyleSwitcher/StyleSwitcher";
import configRehydrater from "@/utils/configRehydrationHelper";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const HERO_STYLES = [
  "centered", // Current style
  "split", // Content + Image
  "minimal", // Large text, minimal content
  "gradient", // Colorful background
  "animated", // With animations
];

export default function Hero({ config, previewMode }) {
  const [currentStyle, setCurrentStyle] = useState(0);

  const rehydratedConfig = configRehydrater(config, "hero");

  useEffect(() => {
    if (config.style) {
      const styleIndex = HERO_STYLES.indexOf(config.style);
      setCurrentStyle(styleIndex);
    }
  }, [config]);

  const renderCTAButton = (innerConfig, type = "cta_primary") => {
    if (!innerConfig[type]) return null;

    const { label, href } = innerConfig[type];
    return (
      <button
        className={`${styles.button} ${styles[type]}`}
        onClick={() => {
          window.location.href = href;
        }}
      >
        {label}
      </button>
    );
  };

  const handleStyleChange = (direction) => {
    if (direction === "next") {
      setCurrentStyle((prev) => (prev + 1) % HERO_STYLES.length);
    } else {
      setCurrentStyle(
        (prev) => (prev - 1 + HERO_STYLES.length) % HERO_STYLES.length
      );
    }
  };

  const renderHeroContent = () => {
    switch (HERO_STYLES[currentStyle]) {
      case "split":
        return (
          <div className={`${styles.container} ${styles.splitContainer}`}>
            <div className={styles.content}>
              <h1>{rehydratedConfig.projectName}</h1>
              <p>{rehydratedConfig.projectDescription}</p>
              {renderCTAButton(rehydratedConfig, "cta_primary")}
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.mockup}>Preview Image</div>
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className={`${styles.container} ${styles.minimalContainer}`}>
            <h1>{rehydratedConfig.projectName}</h1>
            {renderCTAButton(rehydratedConfig, "cta_primary")}
          </div>
        );

      case "gradient":
        return (
          <div className={`${styles.container} ${styles.gradientContainer}`}>
            <span className={styles.badge}>New Release</span>
            <h1>{rehydratedConfig.projectName}</h1>
            <p>{rehydratedConfig.projectDescription}</p>
            <div className={styles.buttonGroup}>
              {renderCTAButton(rehydratedConfig, "cta_primary")}
              {renderCTAButton(rehydratedConfig, "cta_secondary")}
            </div>
          </div>
        );

      case "animated":
        return (
          <div className={`${styles.container} ${styles.animatedContainer}`}>
            <div className={styles.shapes}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={styles.shape} />
              ))}
            </div>
            <h1>{rehydratedConfig.projectName}</h1>
            <p>{rehydratedConfig.projectDescription}</p>
            {renderCTAButton(rehydratedConfig, "cta_primary")}
          </div>
        );

      default: // centered
        return (
          <div className={styles.container}>
            <h1>{rehydratedConfig.projectName}</h1>
            <p>{rehydratedConfig.projectDescription}</p>
            {renderCTAButton(rehydratedConfig, "cta_primary")}
          </div>
        );
    }
  };

  return (
    <section
      id="hero"
      className={`${styles.hero} ${styles[HERO_STYLES[currentStyle]]}`}
    >
      {renderHeroContent()}
      {previewMode && (
        <StyleSwitcher
          currentStyle={currentStyle}
          styles={HERO_STYLES}
          onStyleChange={handleStyleChange}
        />
      )}
    </section>
  );
}
