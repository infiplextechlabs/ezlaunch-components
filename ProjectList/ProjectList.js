import styles from "./ProjectList.module.css";

export default function ProjectList({ projects }) {
  if (!projects?.length) {
    return (
      <div className={styles.empty}>
        <p>No projects yet. Create your first project to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {projects.map((project) => (
        <div key={project.id} className={styles.project}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className={styles.meta}>
            <span>
              Created: {new Date(project.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
