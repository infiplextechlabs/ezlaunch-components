import StyleSwitcher from "@/components/StyleSwitcher/StyleSwitcher";
import configRehydrater from "@/utils/configRehydrationHelper";
import { useEffect, useState } from "react";
import styles from "./FAQ.module.css";

const FAQ_STYLES = ["grid", "accordion", "cards", "minimal", "tabs"];

export default function FAQ({ config, previewMode }) {
  const [currentStyle, setCurrentStyle] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const rehydratedConfig = configRehydrater(config, "faq");

  useEffect(() => {
    if (config.style) {
      const styleIndex = FAQ_STYLES.indexOf(config.style);
      setCurrentStyle(styleIndex);
    }
  }, [config]);

  const handleStyleChange = (newStyle) => {
    setCurrentStyle(newStyle);
  };

  const toggleItem = (index) => {
    setActiveItem(activeItem === index ? null : index);
  };

  const renderFAQContent = () => {
    const { title, subtitle, questions } = rehydratedConfig;

    switch (FAQ_STYLES[currentStyle]) {
      case "accordion":
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <div className={styles.accordion}>
              {questions.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.accordionItem} ${
                    activeItem === index ? styles.active : ""
                  }`}
                  onClick={() => toggleItem(index)}
                >
                  <div className={styles.accordionHeader}>
                    <h3>{item.question}</h3>
                    <span className={styles.accordionIcon}>+</span>
                  </div>
                  <div className={styles.accordionContent}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "cards":
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <div className={styles.cardsGrid}>
              {questions.map((item, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.cardIcon}>?</div>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className={styles.container}>
            <div className={styles.minimalWrapper}>
              <span className={styles.label}>FAQ</span>
              <h2 className={styles.title}>{title}</h2>
              <h3 className={styles.subtitle}>{subtitle}</h3>
              <div className={styles.minimalList}>
                {questions.map((item, index) => (
                  <div key={index} className={styles.minimalItem}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "tabs":
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <div className={styles.tabsContainer}>
              <div className={styles.tabsList}>
                {questions.map((item, index) => (
                  <button
                    key={index}
                    className={`${styles.tabButton} ${
                      activeItem === index ? styles.activeTab : ""
                    }`}
                    onClick={() => toggleItem(index)}
                  >
                    {item.question}
                  </button>
                ))}
              </div>
              <div className={styles.tabContent}>
                {activeItem !== null && (
                  <div className={styles.tabPanel}>
                    <p>{questions[activeItem].answer}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default: // grid
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <div className={styles.faqGrid}>
              {questions.map((item, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="faq"
      className={`${styles.faq} ${styles[FAQ_STYLES[currentStyle]]}`}
    >
      {renderFAQContent()}
      {previewMode && (
        <StyleSwitcher
          currentStyle={currentStyle}
          styles={FAQ_STYLES}
          onStyleChange={handleStyleChange}
        />
      )}
    </section>
  );
}
