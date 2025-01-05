"use client";

import { useEffect, useState } from 'react';
import styles from './ProjectForm.module.css';

const themes = {
  modern: {
    name: "Modern",
    description: "Bold and vibrant with gradient accents",
    colors: ['#0070f3', '#00a6ed', '#ffffff', '#f5f5f5']
  },
  classic: {
    name: "Classic",
    description: "Timeless black and white design",
    colors: ['#1a1a1a', '#333333', '#ffffff', '#f5f5f5']
  },
  minimal: {
    name: "Minimal",
    description: "Clean and simple with subtle details",
    colors: ['#f5f5f5', '#ffffff', '#333333', '#666666']
  }
};

const landingSections = {
  hero: {
    id: 'hero',
    label: 'Hero Section',
    description: 'Main banner with headline and CTA'
  },
  features: {
    id: 'features',
    label: 'Features Grid',
    description: 'Highlight key features or benefits'
  },
  howItWorks: {
    id: 'howItWorks',
    label: 'How It Works',
    description: 'Step-by-step process explanation'
  },
  testimonials: {
    id: 'testimonials',
    label: 'Testimonials',
    description: 'Customer reviews and feedback'
  },
  pricing: {
    id: 'pricing',
    label: 'Pricing Plans',
    description: 'Different pricing tiers and features'
  },
  faq: {
    id: 'faq',
    label: 'FAQ Section',
    description: 'Common questions and answers'
  },
  cta: {
    id: 'cta',
    label: 'Call to Action',
    description: 'Final conversion section'
  },
  about: {
    id: 'about',
    label: 'About Us',
    description: 'Company or product story'
  },
  contact: {
    id: 'contact',
    label: 'Contact Form',
    description: 'Get in touch section'
  }
};

const sectionPreviews = {
  hero: (
    <div className={styles.previewHero}>
      <h2>Welcome to [Your Project]</h2>
      <p>The perfect solution for your needs</p>
      <button className={styles.submitButton}>Get Started</button>
    </div>
  ),
  features: (
    <div className={styles.previewFeatures}>
      {[1, 2, 3].map((i) => (
        <div key={i} className={styles.previewFeatureCard}>
          <h3>Feature {i}</h3>
          <p>Description of feature {i}</p>
        </div>
      ))}
    </div>
  ),
  testimonials: (
    <div className={styles.previewTestimonials}>
      {[1, 2].map((i) => (
        <div key={i} className={styles.previewFeatureCard}>
          <p>"Amazing product! Exactly what we needed."</p>
          <small>- Customer {i}</small>
        </div>
      ))}
    </div>
  ),
  pricing: (
    <div className={styles.previewPricing}>
      {['Basic', 'Pro', 'Enterprise'].map((plan) => (
        <div key={plan} className={styles.previewFeatureCard}>
          <h3>{plan}</h3>
          <p>Features for {plan}</p>
          <button>Choose {plan}</button>
        </div>
      ))}
    </div>
  ),
  faq: (
    <div className={styles.previewFaq}>
      {[1, 2, 3].map((i) => (
        <div key={i} className={styles.previewFeatureCard}>
          <h3>Common Question {i}?</h3>
          <p>Answer to question {i}</p>
        </div>
      ))}
    </div>
  ),
  cta: (
    <div className={styles.previewCta}>
      <h2>Ready to get started?</h2>
      <p>Join thousands of satisfied customers</p>
      <button className={styles.submitButton}>Sign Up Now</button>
    </div>
  )
};

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    targetPersonasInput: '',
    targetPersonas: [],
    theme: 'modern',
    sections: ['hero', 'features', 'cta'] // Default sections
  });
  const [selectedPreview, setSelectedPreview] = useState('hero');

  // Load saved data from sessionStorage
  useEffect(() => {
    const savedConfig = sessionStorage.getItem('ezlaunch_config');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setFormData({
        ...config,
        // Convert targetPersonas array back to input string
        targetPersonasInput: config.targetPersonas.join(', '),
      });
    }
  }, []);

  const handleSectionToggle = (sectionId) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.includes(sectionId)
        ? prev.sections.filter(id => id !== sectionId)
        : [...prev.sections, sectionId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const config = {
      ...formData,
      targetPersonas: formData.targetPersonasInput
        .split(',')
        .map(persona => persona.trim())
        .filter(persona => persona !== '')
    };

    // Save to sessionStorage
    sessionStorage.setItem('ezlaunch_config', JSON.stringify(config));

    // Redirect to preview
    window.location.href = '/preview';
  };

  const handleSectionClick = (sectionId) => {
    handleSectionToggle(sectionId);
    setSelectedPreview(sectionId);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          id="projectName"
          value={formData.projectName}
          onChange={(e) => setFormData({...formData, projectName: e.target.value})}
          placeholder="Enter your project name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="projectDescription">Project Description</label>
        <textarea
          id="projectDescription"
          value={formData.projectDescription}
          onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
          placeholder="Describe what your project does..."
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="targetPersonas">Target Personas</label>
        <input
          type="text"
          id="targetPersonas"
          value={formData.targetPersonasInput}
          onChange={(e) => setFormData({...formData, targetPersonasInput: e.target.value})}
          placeholder="e.g. Small Business Owners, Freelancers, Students"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Theme</label>
        <div className={styles.themeOptions}>
          {Object.entries(themes).map(([key, theme]) => (
            <div
              key={key}
              className={`${styles.themeOption} ${styles[key]} ${formData.theme === key ? styles.selected : ''}`}
              onClick={() => setFormData({...formData, theme: key})}
            >
              <div className={styles.themePreview} />
              <div className={styles.themeName}>{theme.name}</div>
              <div className={styles.themeDescription}>{theme.description}</div>
              <div className={styles.colorPalette}>
                {theme.colors.map((color, index) => (
                  <div
                    key={index}
                    className={styles.colorSwatch}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Page Sections</label>
        <div className={styles.sectionsContainer}>
          <div className={styles.sectionsList}>
            {Object.values(landingSections).map((section) => (
              <div
                key={section.id}
                className={`${styles.sectionItem} ${
                  formData.sections.includes(section.id) ? styles.selected : ''
                }`}
                onClick={() => handleSectionClick(section.id)}
              >
                <input
                  type="checkbox"
                  checked={formData.sections.includes(section.id)}
                  onChange={() => {}}
                  className={styles.sectionCheckbox}
                />
                <div>
                  <div className={styles.sectionLabel}>{section.label}</div>
                  <div className={styles.sectionDescription}>{section.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.sectionPreview}>
            <div className={styles.previewHeader}>
              <div className={styles.previewTitle}>
                {landingSections[selectedPreview]?.label || 'Section'} Preview
              </div>
              <div className={styles.previewDescription}>
                {landingSections[selectedPreview]?.description || 'Select a section to preview'}
              </div>
            </div>
            <div className={styles.previewContent}>
              {sectionPreviews[selectedPreview] || (
                <div className={styles.previewPlaceholder}>
                  Select a section to see preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Preview Website
      </button>
    </form>
  );
} 