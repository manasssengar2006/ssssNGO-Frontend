import { useEffect, useState } from "react";
import API from "../services/api";

const AdminMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    API.get("/admin/members").then((res) =>
      setMembers(res.data)
    );
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-[#0C2C55] mb-6">
        NGO Members
      </h1>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="border-b text-[#296374]">
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Member ID</th>
            <th>Joined On</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m._id} className="border-b">
              <td className="p-3">{m.name}</td>
              <td>{m.email}</td>
              <td>{m.memberId}</td>
              <td>
                {new Date(m.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMembers;
