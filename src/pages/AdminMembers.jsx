import { useEffect, useState } from "react";
import API from "../services/api";

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async (searchCity = "") => {
    try {
      setLoading(true);

      const url = searchCity
        ? `/membership/search?city=${searchCity}`
        : `/membership/search`;

      const res = await API.get(url);
      setMembers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch members");
    } finally {
      setLoading(false);
    }
  };

  const searchMembers = () => {
    fetchMembers(city.trim());
  };

  const resetSearch = () => {
    setCity("");
    fetchMembers();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0C2C55] mb-6">
        Members
      </h1>

      {/* 🔍 SEARCH BAR (RESPONSIVE) */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMembers()}
          placeholder="Search by city"
          className="border px-4 py-2 rounded w-full sm:w-64"
        />

        <div className="flex gap-2">
          <button
            onClick={searchMembers}
            className="bg-[#296374] text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Search
          </button>

          <button
            onClick={resetSearch}
            className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Reset
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="mb-4 text-gray-500 text-sm">
          Loading members...
        </p>
      )}

      {/* 📱 RESPONSIVE TABLE WRAPPER */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-[700px] w-full bg-white">
          <thead>
            <tr className="border-b text-[#296374] text-sm sm:text-base">
              <th className="p-3 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">City</th>
              <th className="text-left">Member ID</th>
              <th className="text-left">Joined On</th>
            </tr>
          </thead>

          <tbody>
            {members.length > 0 ? (
              members.map((m) => (
                <tr
                  key={m._id}
                  className="border-b hover:bg-gray-50 text-sm sm:text-base"
                >
                  <td className="p-3 font-medium">{m.name}</td>
                  <td className="break-all">{m.email}</td>
                  <td>{m.city || "N/A"}</td>
                  <td>{m.memberId || "N/A"}</td>
                  <td>
                    {m.createdAt
                      ? new Date(m.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMembers;