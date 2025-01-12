"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import styles from "./ProjectForm.module.css";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export default function ProjectForm({ onSuccess }) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    personas: "",
    sections: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.email) {
      setError("You must be logged in to create a project");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: session.user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error creating project:", error);
      setError(error.message || "Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        sections: checked
          ? [...prev.sections, name]
          : prev.sections.filter((s) => s !== name),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.field}>
        <label htmlFor="name">Project Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter project name"
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Describe your project"
          rows={3}
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="personas">User Personas</label>
        <textarea
          id="personas"
          name="personas"
          value={formData.personas}
          onChange={handleChange}
          placeholder="Enter personas separated by commas (e.g., Admin, Customer, Guest)"
          rows={3}
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.field}>
        <label>Project Sections</label>
        <div className={styles.checkboxGrid}>
          {SECTIONS.map((section) => (
            <label key={section.id} className={styles.checkbox}>
              <input
                type="checkbox"
                name={section.id}
                checked={formData.sections.includes(section.id)}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {section.label}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
