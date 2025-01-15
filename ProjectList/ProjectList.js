import { useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectTable from "../ProjectTable/ProjectTable";
import styles from "./ProjectList.module.css";

export default function ProjectList({ projects }) {
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "table"

  if (!projects?.length) {
    return (
      <div className={styles.empty}>
        <p>No projects yet. Create your first project to get started!</p>
      </div>
    );
  }

  console.info({ projects });

  return (
    <div>
      <div className={styles.header}>
        <h2>Projects</h2>
        <div className={styles.viewSwitcher}>
          <button
            className={`${styles.switchButton} ${
              viewMode === "grid" ? styles.active : ""
            }`}
            onClick={() => setViewMode("grid")}
          >
            <i className="fa-solid fa-th-large" />
            <span>Grid</span>
          </button>
          <button
            className={`${styles.switchButton} ${
              viewMode === "table" ? styles.active : ""
            }`}
            onClick={() => setViewMode("table")}
          >
            <i className="fa-solid fa-list" />
            <span>Table</span>
          </button>
        </div>
      </div>
      {viewMode === "grid" ? (
        <div className={styles.container}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <ProjectTable projects={projects} />
      )}
    </div>
  );
}
