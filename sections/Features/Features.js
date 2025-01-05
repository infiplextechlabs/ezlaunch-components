import StyleSwitcher from "@/components/StyleSwitcher/StyleSwitcher";
import configRehydrater from "@/utils/configRehydrationHelper";
import { useEffect, useState } from "react";
import styles from "./Features.module.css";

const FEATURES_STYLES = ["grid", "cards", "minimal", "icons", "interactive"];

export default function Features({ config, previewMode }) {
  const rehydratedConfig = configRehydrater(config, "features");
  const [currentStyle, setCurrentStyle] = useState(0);

  useEffect(() => {
    if (config.style) {
      const styleIndex = FEATURES_STYLES.indexOf(config.style);
      setCurrentStyle(styleIndex);
    }
  }, [config]);

  const featureData = rehydratedConfig.features ?? [];

  const handleStyleChange = (newIndex) => {
    setCurrentStyle(newIndex);
  };

  const renderFeaturesContent = () => {
    switch (FEATURES_STYLES[currentStyle]) {
      case "cards":
        return (
          <div className={styles.container}>
            <h2>Features</h2>
            <div className={`${styles.grid} ${styles.cardsGrid}`}>
              {featureData.map((feature, i) => (
                <div key={i} className={`${styles.feature} ${styles.card}`}>
                  <div className={styles.cardIcon}>
                    <div className={styles.iconCircle}>
                      <i
                        className={`${styles.icon} fa-solid fa-${feature.icon}`}
                      />
                    </div>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className={styles.container}>
            <h2>Features</h2>
            <div className={`${styles.grid} ${styles.minimalGrid}`}>
              {featureData.map((feature, i) => (
                <div key={i} className={`${styles.feature} ${styles.minimal}`}>
                  <span className={styles.featureNumber}>0{i + 1}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "icons":
        return (
          <div className={styles.container}>
            <h2>Features</h2>
            <div className={`${styles.grid} ${styles.iconsGrid}`}>
              {[...featureData].map((feature, i) => (
                <div
                  key={i}
                  className={`${styles.feature} ${styles.iconFeature}`}
                >
                  <div className={styles.iconBox}>
                    <i
                      className={`${styles.icon} fa-solid fa-${feature.icon}`}
                    />
                  </div>
                  <div className={styles.featureContent}>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "interactive":
        return (
          <div className={styles.container}>
            <h2>Features</h2>
            <div className={`${styles.grid} ${styles.interactiveGrid}`}>
              {featureData.map((feature, i) => (
                <div
                  key={i}
                  className={`${styles.feature} ${styles.interactive}`}
                >
                  <div className={styles.interactiveContent}>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <button className={styles.learnMore}>Learn More</button>
                  </div>
                  <div className={styles.interactiveImage}>
                    <div className={styles.imagePlaceholder} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default: // grid
        return (
          <div className={styles.container}>
            <h2>Features</h2>
            <div className={styles.grid}>
              {featureData.map((feature, i) => (
                <div key={i} className={styles.feature}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  // if currentStyle is grid, don't add that class to section className
  const sectionClassName =
    currentStyle === 0
      ? styles.features
      : `${styles.features} ${styles[FEATURES_STYLES[currentStyle]]}`;

  return (
    <section id="features" className={sectionClassName}>
      {renderFeaturesContent()}
      {previewMode && (
        <StyleSwitcher
          currentStyle={currentStyle}
          styles={FEATURES_STYLES}
          onStyleChange={handleStyleChange}
        />
      )}
    </section>
  );
}
