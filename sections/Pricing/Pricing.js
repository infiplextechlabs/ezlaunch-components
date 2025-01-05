import StyleSwitcher from "@/components/StyleSwitcher/StyleSwitcher";
import configRehydrater from "@/utils/configRehydrationHelper";
import { useEffect, useState } from "react";
import styles from "./Pricing.module.css";

const PRICING_STYLES = ["grid", "minimal", "table", "modern"];

export default function Pricing({ config, previewMode }) {
  const rehydratedConfig = configRehydrater(config, "pricing");

  const [currentStyle, setCurrentStyle] = useState(0);
  const handleStyleChange = (newIndex) => {
    setCurrentStyle(newIndex);
  };

  useEffect(() => {
    if (config.style) {
      const styleIndex = PRICING_STYLES.indexOf(config.style);
      setCurrentStyle(styleIndex);
    }
  }, [config]);

  const renderGetStartedButton = () => {
    if (rehydratedConfig.showGetStartedButtonInPricing) {
      return <button className={styles.button}>Get Started</button>;
    }
    return null;
  };

  const renderPricingContent = () => {
    const { title, subtitle, plans } = rehydratedConfig;
    const allFeaturesSet = plans.flatMap((plan) => plan.features);
    const uniqueFeatures = [...new Set(allFeaturesSet)];

    switch (PRICING_STYLES[currentStyle]) {
      case "cards":
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <div className={styles.cardsGrid}>
              {plans.map((plan, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3>{plan.plan}</h3>
                    <div className={styles.price}>
                      <span className={styles.amount}>{plan.price}</span>
                      <span className={styles.period}>{plan.period}</span>
                    </div>
                  </div>
                  <ul className={styles.features}>
                    {plan.features.map((feature, j) => (
                      <li key={j}>{feature}</li>
                    ))}
                  </ul>
                  {renderGetStartedButton()}
                </div>
              ))}
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className={styles.container}>
            <div className={styles.minimalWrapper}>
              <span className={styles.label}>Pricing</span>
              <h2 className={styles.title}>{title}</h2>
              <h3 className={styles.subtitle}>{subtitle}</h3>
              <div className={styles.minimalGrid}>
                {plans.map((plan, i) => (
                  <div key={i} className={styles.minimalPlan}>
                    <div className={styles.planHeader}>
                      <h3>{plan.plan}</h3>
                      <div className={styles.price}>
                        {plan.price}
                        <span>{plan.period}</span>
                      </div>
                    </div>
                    <ul className={styles.features}>
                      {plan.features.map((feature, j) => (
                        <li key={j}>{feature}</li>
                      ))}
                    </ul>
                    {renderGetStartedButton()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "table":
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Features</th>
                    {plans.map((plan, i) => (
                      <th key={i}>
                        <div className={styles.planName}>{plan.plan}</div>
                        <div className={styles.planPrice}>
                          {plan.price}
                          <span>{plan.period}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {uniqueFeatures.map((feature, i) => (
                    <tr key={i}>
                      <td>{feature}</td>
                      {plans.map((plan, j) => (
                        <td key={j}>
                          {plan.features.includes(feature) ? "✓" : "×"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "modern":
        return (
          <div className={styles.container}>
            <div className={styles.modernHeader}>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <div className={styles.modernGrid}>
              {plans.map((plan, i) => (
                <div key={i} className={styles.modernCard}>
                  <div className={styles.popularBadge}>
                    {i === 1 && <span>Popular</span>}
                  </div>
                  <div className={styles.modernContent}>
                    <h3>{plan.plan}</h3>
                    <div className={styles.modernPrice}>
                      {plan.price}
                      <span>{plan.period}</span>
                    </div>
                    <ul className={styles.modernFeatures}>
                      {plan.features.map((feature, j) => (
                        <li key={j}>{feature}</li>
                      ))}
                    </ul>
                    {renderGetStartedButton()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default: // grid
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <div className={styles.pricingGrid}>
              {plans.map((plan, i) => (
                <div key={i} className={styles.pricingCard}>
                  <h3>{plan.plan}</h3>
                  <div className={styles.price}>
                    {plan.price}
                    <span>{plan.period}</span>
                  </div>
                  <ul className={styles.features}>
                    {plan.features.map((feature, j) => (
                      <li key={j}>{feature}</li>
                    ))}
                  </ul>
                  {renderGetStartedButton()}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="pricing"
      className={`${styles.pricing} ${styles[PRICING_STYLES[currentStyle]]}`}
    >
      {renderPricingContent()}
      {previewMode && (
        <StyleSwitcher
          currentStyle={currentStyle}
          styles={PRICING_STYLES}
          onStyleChange={handleStyleChange}
        />
      )}
    </section>
  );
}
