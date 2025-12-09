const ProjectsSection = ({ projects }) => {
  return (
    <section className="section projects">
      <h2>Our Projects</h2>
      <div className="card-grid">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <img src={project.imageUrl} alt={project.name} />
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <button className="btn-outline">Read More</button>
          </div>
        ))}
        {projects.length === 0 && <p>No projects yet.</p>}
      </div>
    </section>
  );
};

export default ProjectsSection;
