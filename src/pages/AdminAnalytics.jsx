// ==============================
// FRONTEND
// ==============================

// client/src/pages/AdminAnalytics.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";

const StatCard = ({ title, value }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white p-6 rounded-xl shadow"
  >
    <p className="text-[#296374] text-sm">{title}</p>
    <h2 className="text-3xl font-bold text-[#0C2C55] mt-2">
      {value}
    </h2>
  </motion.div>
);

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/admin/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) {
    return <p className="text-center mt-10">Loading analytics...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-[#0C2C55] mb-8">
        Admin Analytics
      </h1>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Members Joined" value={stats.totalMembers} />
        <StatCard title="Total Posts" value={stats.totalPosts} />
        <StatCard title="Total Likes" value={stats.totalLikes} />
        <StatCard title="Total Comments" value={stats.totalComments} />
      </div>

      {/* RECENT USERS */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#0C2C55] mb-4">
          Recent Users
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#296374] border-b">
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Joined On</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentUsers.map((u) => (
                <tr key={u._id} className="border-b last:border-0">
                  <td className="py-2 text-[#0C2C55]">{u.name}</td>
                  <td className="py-2 text-[#296374]">{u.email}</td>
                  <td className="py-2 text-[#296374]">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
