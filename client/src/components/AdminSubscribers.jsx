import { useEffect, useState } from "react";
import { api } from "../api";

const AdminSubscribers = () => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api
      .get("/subscribers")
      .then((res) => setSubs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Subscribed Email Addresses</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Subscribed At</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((s) => (
            <tr key={s._id}>
              <td>{s.email}</td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSubscribers;
