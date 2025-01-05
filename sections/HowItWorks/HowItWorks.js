import StyleSwitcher from "@/components/StyleSwitcher/StyleSwitcher";
import configRehydrater from "@/utils/configRehydrationHelper";
import { useEffect, useState } from "react";
import styles from "./HowItWorks.module.css";

const HOWITWORKS_STYLES = [
  "steps",
  "timeline",
  "cards",
  "minimal",
  "interactive",
];

export default function HowItWorks({ config, previewMode }) {
  const rehydratedConfig = configRehydrater(config, "howitworks");
  const stepsData = rehydratedConfig.steps ?? [];
  const [currentStyle, setCurrentStyle] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (config.style) {
      const styleIndex = HOWITWORKS_STYLES.indexOf(config.style);
      setCurrentStyle(styleIndex);
    }
  }, [config]);

  const handleStyleChange = (newStyle) => {
    setCurrentStyle(newStyle);
  };

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const renderHowItWorksContent = () => {
    switch (HOWITWORKS_STYLES[currentStyle]) {
      case "timeline":
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{rehydratedConfig.title}</h2>
            <h3 className={styles.subtitle}>{rehydratedConfig.subtitle}</h3>
            <div className={styles.timeline}>
              {stepsData.map((step, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineNumber}>{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "cards":
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{rehydratedConfig.title}</h2>
            <h3 className={styles.subtitle}>{rehydratedConfig.subtitle}</h3>
            <div className={styles.cardsGrid}>
              {stepsData.map((step, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.cardNumber}>{index + 1}</div>
                  <div className={styles.cardContent}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  <div className={styles.cardArrow}>→</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className={styles.container}>
            <div className={styles.minimalWrapper}>
              <span className={styles.label}>Process</span>
              <h2 className={styles.title}>{rehydratedConfig.title}</h2>
              <h3 className={styles.subtitle}>{rehydratedConfig.subtitle}</h3>
              <div className={styles.minimalSteps}>
                {stepsData.map((step, index) => (
                  <div key={index} className={styles.minimalStep}>
                    <span className={styles.stepNumber}>0{index + 1}</span>
                    <div className={styles.stepContent}>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "interactive":
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{rehydratedConfig.title}</h2>
            <h3 className={styles.subtitle}>{rehydratedConfig.subtitle}</h3>
            <div className={styles.interactiveContainer}>
              <div className={styles.stepsList}>
                {stepsData.map((step, index) => (
                  <button
                    key={index}
                    className={`${styles.stepButton} ${
                      activeStep === index ? styles.activeStep : ""
                    }`}
                    onClick={() => handleStepClick(index)}
                  >
                    <span className={styles.stepNumber}>{index + 1}</span>
                    {step.title}
                  </button>
                ))}
              </div>
              <div className={styles.stepDetails}>
                <h3>{stepsData[activeStep].title}</h3>
                <p>{stepsData[activeStep].description}</p>
              </div>
            </div>
          </div>
        );

      default: // steps
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{rehydratedConfig.title}</h2>
            <h3 className={styles.subtitle}>{rehydratedConfig.subtitle}</h3>
            <div className={styles.steps}>
              {stepsData.map((step, index) => (
                <div key={index} className={styles.step}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  const sectionClassName =
    currentStyle === 0
      ? `${styles.howItWorks} ${styles.stepsSection}`
      : `${styles.howItWorks} ${styles[HOWITWORKS_STYLES[currentStyle]]}`;

  return (
    <section id="howitworks" className={sectionClassName}>
      {renderHowItWorksContent()}
      {previewMode && (
        <StyleSwitcher
          currentStyle={currentStyle}
          styles={HOWITWORKS_STYLES}
          onStyleChange={handleStyleChange}
        />
      )}
    </section>
  );
}
