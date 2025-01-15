import styles from "./ProjectTable.module.css";

export default function ProjectTable({ projects }) {
  if (!projects?.length) {
    return (
      <div className={styles.empty}>
        <p>No projects yet. Create your first project to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{new Date(project.created_at).toLocaleDateString()}</td>
              <td>
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
                    <span>
                      {!project.deployed_url ? "Not Deployed" : "View Site"}
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
