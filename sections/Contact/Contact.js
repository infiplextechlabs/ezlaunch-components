import StyleSwitcher from "@/components/StyleSwitcher/StyleSwitcher";
import { useEffect, useState } from "react";
import styles from "./Contact.module.css";

const CONTACT_STYLES = ["default", "split", "modern", "minimal", "card"];

export default function Contact({ config, previewMode }) {
  const [currentStyle, setCurrentStyle] = useState(0);

  useEffect(() => {
    if (config.style) {
      const styleIndex = CONTACT_STYLES.indexOf(config.style);
      setCurrentStyle(styleIndex);
    }
  }, [config]);

  const handleStyleChange = (newStyle) => {
    setCurrentStyle(newStyle);
  };

  const renderContactContent = () => {
    switch (CONTACT_STYLES[currentStyle]) {
      case "split":
        return (
          <div className={`${styles.container} ${styles.splitContainer}`}>
            <div className={styles.infoSection}>
              <h2>{config.projectName}</h2>
              <div className={styles.separator} />
              <p className={styles.description}>
                We&apos;d love to hear from you. Send us a message and
                we&apos;ll respond as soon as possible.
              </p>
              <div className={styles.contactInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoValue}>contact@example.com</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Phone</span>
                  <span className={styles.infoValue}>+1 (555) 123-4567</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Address</span>
                  <span className={styles.infoValue}>
                    123 Business Street, Suite 100, City, Country
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.formSection}>
              <form className={styles.contactForm}>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message"></textarea>
                <button className={styles.button}>Send Message</button>
              </form>
            </div>
          </div>
        );

      case "modern":
        return (
          <div className={styles.container}>
            <div className={styles.modernWrapper}>
              <div className={styles.modernHeader}>
                <span className={styles.badge}>Contact Us</span>
                <h2>Let&apos;s Start a Conversation</h2>
                <p>
                  We&apos;re here to help and answer any question you might
                  have.
                </p>
              </div>
              <form className={`${styles.contactForm} ${styles.modernForm}`}>
                <div className={styles.inputGroup}>
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Your Email" />
                </div>
                <textarea placeholder="Your Message"></textarea>
                <button className={`${styles.button} ${styles.modernButton}`}>
                  Send Message
                  <span className={styles.buttonIcon}>→</span>
                </button>
              </form>
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className={styles.container}>
            <div className={styles.minimalWrapper}>
              <h2>Contact</h2>
              <form className={`${styles.contactForm} ${styles.minimalForm}`}>
                <div className={styles.formField}>
                  <label>Name</label>
                  <input type="text" placeholder="Enter your name" />
                </div>
                <div className={styles.formField}>
                  <label>Email</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className={styles.formField}>
                  <label>Message</label>
                  <textarea placeholder="Write your message"></textarea>
                </div>
                <button className={styles.button}>Submit</button>
              </form>
            </div>
          </div>
        );

      case "card":
        return (
          <div className={styles.container}>
            <div className={styles.cardWrapper}>
              <div className={styles.cardContent}>
                <h2>Get in Touch</h2>
                <form className={`${styles.contactForm} ${styles.cardForm}`}>
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Your Email" />
                  <textarea placeholder="Your Message"></textarea>
                  <button className={styles.button}>Send Message</button>
                </form>
              </div>
              <div className={styles.cardDecoration} />
            </div>
          </div>
        );

      default:
        return (
          <div className={styles.container}>
            <h2>Get in Touch</h2>
            <div className={styles.contactForm}>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message"></textarea>
              <button className={styles.button}>Send Message</button>
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="contact"
      className={`${styles.contact} ${styles[CONTACT_STYLES[currentStyle]]}`}
    >
      {renderContactContent()}
      {previewMode && (
        <StyleSwitcher
          currentStyle={currentStyle}
          styles={CONTACT_STYLES}
          onStyleChange={handleStyleChange}
        />
      )}
    </section>
  );
}
