import { useEffect, useState } from "react";
import { api } from "../api";

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  // GET CLIENTS
  const fetchClients = () => {
    api
      .get("/clients")
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // SUBMIT FORM (ADD or UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("designation", form.designation);
    data.append("description", form.description);
    if (image) data.append("image", image);

    try {
      if (editingId) {
        await api.put(`/clients/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        await api.post("/clients", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      resetForm();
      fetchClients();
    } catch {
      alert("Something went wrong — please log in again.");
    }
  };

  const resetForm = () => {
    setForm({ name: "", designation: "", description: "" });
    setImage(null);
    setEditingId(null);
  };

  // DELETE CLIENT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this client permanently?")) return;
    try {
      await api.delete(`/clients/${id}`);
      setClients((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert("Could not delete.");
    }
  };

  // POPULATE FORM FOR UPDATE
  const handleEdit = (client) => {
    setForm({
      name: client.name,
      designation: client.designation,
      description: client.description,
    });
    setEditingId(client._id);
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Client Management</h2>

      {/* FORM CARD */}
      <div className="admin-card">
        <h3>{editingId ? "Update Client" : "Add New Client"}</h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Client Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Designation (e.g. CEO)"
            value={form.designation}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
            required
          />
          <textarea
            placeholder="Client Feedback"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>

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
            {editingId ? "Update Client" : "Add Client"}
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
        <h3>All Clients</h3>
        {clients.length === 0 ? (
          <p className="muted">No clients added yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Description</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id}>
                  <td>
                    <img
                      src={client.imageUrl}
                      alt={client.name}
                      className="thumb"
                    />
                  </td>
                  <td>{client.name}</td>
                  <td>{client.designation}</td>
                  <td>{client.description}</td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(client)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(client._id)}
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

export default AdminClients;
