import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
  return (
    <div className={styles.project}>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className={styles.meta}>
        <span>
          Created: {new Date(project.created_at).toLocaleDateString()}
        </span>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${styles.previewButton}`}
          onClick={() =>
            window.open(`/?projectId=${project.project_id}`, "_blank")
          }
        >
          <i className="fa-solid fa-eye" />
          <span>Preview</span>
        </button>
        <button
          className={`${styles.button} ${styles.deployButton}`}
          onClick={() => window.open(project.deployed_url, "_blank")}
          disabled={!project.deployed_url}
        >
          <i className="fa-solid fa-rocket" />
          <span>{!project.deployed_url ? "Not Deployed" : "View Site"}</span>
        </button>
      </div>
    </div>
  );
}
