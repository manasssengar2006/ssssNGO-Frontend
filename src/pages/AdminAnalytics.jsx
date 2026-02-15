import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";

const StatCard = ({ title, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white shadow rounded-xl p-5 text-center"
  >
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-[#0C2C55] mt-2">{value}</p>
  </motion.div>
);

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Stats failed");
      }
    };

    loadStats();
  }, []);

  if (!stats) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-[#0C2C55] mb-6">
        Admin Analytics
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Members" value={stats.members} />
        <StatCard title="Pending Requests" value={stats.pendingRequests} />
        <StatCard title="Total Posts" value={stats.totalPosts} />
      </div>
    </div>
  );
};

export default AdminAnalytics;
