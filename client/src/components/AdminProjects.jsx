import { useEffect, useState } from "react";
import { api } from "../api";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [image, setImage] = useState(null);

  // GET PROJECTS
  const fetchProjects = () => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // SUBMIT FORM (ADD or UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    if (image) data.append("image", image);

    try {
      if (editingId) {
        // UPDATE
        await api.put(`/projects/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        // CREATE
        await api.post("/projects", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Could not save project. Make sure you are logged in.");
    }
  };

  const resetForm = () => {
    setForm({ name: "", description: "" });
    setImage(null);
    setEditingId(null);
  };

  // DELETE PROJECT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project permanently?")) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not delete project.");
    }
  };

  // EDIT PROJECT (populate form)
  const handleEdit = (project) => {
    setForm({
      name: project.name,
      description: project.description,
    });
    setImage(null);
    setEditingId(project._id);
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Project Management</h2>

      {/* FORM CARD */}
      <div className="admin-card">
        <h3>{editingId ? "Update Project" : "Add New Project"}</h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Project Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <label className="file-input">
            <span>
              {editingId ? "Upload new image (optional)" : "Upload image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <button type="submit" className="btn-primary">
            {editingId ? "Update Project" : "Add Project"}
          </button>

          {editingId && (
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* TABLE CARD */}
      <div className="admin-card">
        <h3>All Projects</h3>
        {projects.length === 0 ? (
          <p className="muted">No projects added yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img src={p.imageUrl} alt={p.name} className="thumb" />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td className="actions">
                    <button className="btn-edit" onClick={() => handleEdit(p)}>
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
