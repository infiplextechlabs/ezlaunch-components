import StyleSwitcher from "@/components/StyleSwitcher/StyleSwitcher";
import { useEffect, useState } from "react";
import styles from "./CTA.module.css";

const CTA_STYLES = ["default", "split", "minimal", "gradient", "modern"];

export default function CTA({ config, previewMode }) {
  const [currentStyle, setCurrentStyle] = useState(0);

  const handleStyleChange = (newIndex) => {
    setCurrentStyle(newIndex);
  };

  useEffect(() => {
    if (config.style) {
      const styleIndex = CTA_STYLES.indexOf(config.style);
      setCurrentStyle(styleIndex);
    }
  }, [config]);

  const renderCTAContent = () => {
    switch (CTA_STYLES[currentStyle]) {
      case "split":
        return (
          <div className={styles.splitContainer}>
            <div className={styles.content}>
              <h2>Ready to Get Started?</h2>
              <p>
                Join thousands of satisfied customers and transform your
                business today.
              </p>
              <div className={styles.ctaButtons}>
                <button className={styles.button}>Get Started Now</button>
                <button className={`${styles.button} ${styles.buttonOutline}`}>
                  Contact Sales
                </button>
              </div>
            </div>
            <div className={styles.imageSection}>
              <div className={styles.imagePlaceholder} />
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className={styles.container}>
            <div className={styles.minimalWrapper}>
              <span className={styles.label}>Get Started</span>
              <h2>Ready to Transform Your Business?</h2>
              <p>Join the thousands of companies that trust us.</p>
              <button className={styles.button}>Start Your Journey</button>
            </div>
          </div>
        );

      case "gradient":
        return (
          <div className={styles.container}>
            <div className={styles.gradientWrapper}>
              <div className={styles.gradientContent}>
                <h2>Take Your Business to the Next Level</h2>
                <p>Experience the power of our platform today.</p>
                <div className={styles.ctaButtons}>
                  <button className={styles.button}>Get Started</button>
                  <button className={`${styles.button} ${styles.buttonLight}`}>
                    Learn More
                  </button>
                </div>
              </div>
              <div className={styles.gradientOverlay} />
            </div>
          </div>
        );

      case "modern":
        return (
          <div className={styles.container}>
            <div className={styles.modernWrapper}>
              <div className={styles.modernContent}>
                <div className={styles.badge}>Limited Time Offer</div>
                <h2>Start Your Free Trial Today</h2>
                <p>
                  Get full access to all features for 14 days. No credit card
                  required.
                </p>
                <div className={styles.ctaGroup}>
                  <button className={styles.button}>Start Free Trial</button>
                  <div className={styles.guarantee}>
                    <div className={styles.guaranteeIcon}>✓</div>
                    <span>14-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default: // default
        return (
          <div className={styles.container}>
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied customers today.</p>
            <div className={styles.ctaButtons}>
              <button className={styles.button}>Get Started Now</button>
              <button className={`${styles.button} ${styles.buttonOutline}`}>
                Learn More
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <section className={`${styles.cta} ${styles[CTA_STYLES[currentStyle]]}`}>
      {renderCTAContent()}
      {previewMode && (
        <StyleSwitcher
          currentStyle={currentStyle}
          styles={CTA_STYLES}
          onStyleChange={handleStyleChange}
        />
      )}
    </section>
  );
}
