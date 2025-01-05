import StyleSwitcher from "@/components/StyleSwitcher/StyleSwitcher";
import configRehydrater from "@/utils/configRehydrationHelper";
import { useEffect, useState } from "react";
import styles from "./Testimonials.module.css";

const TESTIMONIALS_STYLES = ["grid", "carousel", "cards", "minimal", "quotes"];

export default function Testimonials({ config, previewMode }) {
  const rehydratedConfig = configRehydrater(config, "testimonials");
  const testimonialData = rehydratedConfig.testimonials ?? [];
  const [currentStyle, setCurrentStyle] = useState(0);

  const handleStyleChange = (newIndex) => {
    setCurrentStyle(newIndex);
  };

  useEffect(() => {
    if (config.style) {
      const styleIndex = TESTIMONIALS_STYLES.indexOf(config.style);
      setCurrentStyle(styleIndex);
    }
  }, [config]);

  const renderTestimonialsContent = () => {
    switch (TESTIMONIALS_STYLES[currentStyle]) {
      case "carousel":
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{rehydratedConfig.title}</h2>
            <h3 className={styles.subtitle}>{rehydratedConfig.subtitle}</h3>
            <div className={styles.carousel}>
              {testimonialData.map((testimonial, i) => (
                <div key={i} className={styles.carouselItem}>
                  <div className={styles.quote}>"</div>
                  <p>{testimonial.text}</p>
                  <div className={styles.author}>
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.role}</span>
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
              {testimonialData.map((testimonial, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardContent}>
                    <div className={styles.avatar} />
                    <p>{testimonial.text}</p>
                    <div className={styles.author}>
                      <strong>{testimonial.author}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className={styles.container}>
            <div className={styles.minimalWrapper}>
              <span className={styles.label}>Testimonials</span>
              <h2 className={styles.title}>{rehydratedConfig.title}</h2>
              <h3 className={styles.subtitle}>{rehydratedConfig.subtitle}</h3>
              <div className={styles.minimalGrid}>
                {testimonialData.map((testimonial, i) => (
                  <div key={i} className={styles.minimalTestimonial}>
                    <p>{testimonial.text}</p>
                    <div className={styles.author}>
                      <strong>{testimonial.author}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "quotes":
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{rehydratedConfig.title}</h2>
            <h3 className={styles.subtitle}>{rehydratedConfig.subtitle}</h3>
            <div className={styles.quotesGrid}>
              {testimonialData.map((testimonial, i) => (
                <div key={i} className={styles.quoteCard}>
                  <div className={styles.quoteIcon}>"</div>
                  <p>{testimonial.text}</p>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorAvatar} />
                    <div className={styles.authorDetails}>
                      <strong>{testimonial.author}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default: // grid
        return (
          <div className={styles.container}>
            <h2 className={styles.title}>{rehydratedConfig.title}</h2>
            <h3 className={styles.subtitle}>{rehydratedConfig.subtitle}</h3>
            <div className={styles.testimonialGrid}>
              {testimonialData.map((testimonial, i) => (
                <div key={i} className={styles.testimonial}>
                  <p>{testimonial.text}</p>
                  <div className={styles.author}>
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="testimonials"
      className={`${styles.testimonials} ${
        styles[TESTIMONIALS_STYLES[currentStyle]]
      }`}
    >
      {renderTestimonialsContent()}
      {previewMode && (
        <StyleSwitcher
          currentStyle={currentStyle}
          styles={TESTIMONIALS_STYLES}
          onStyleChange={handleStyleChange}
        />
      )}
    </section>
  );
}
