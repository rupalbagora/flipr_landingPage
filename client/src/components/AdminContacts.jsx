import { useEffect, useState } from "react";
import { api } from "../api";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api
      .get("/contacts")
      .then((res) => setContacts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Contact Form Details</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.fullName}</td>
              <td>{c.email}</td>
              <td>{c.mobile}</td>
              <td>{c.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContacts;
