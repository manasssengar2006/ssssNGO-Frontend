import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-[#0C2C55] mb-8">
        Admin Dashboard
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* MEMBERSHIP REQUESTS */}
        <Link
          to="/admin/requests"
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#0C2C55] mb-2">
            Membership Requests
          </h2>
          <p className="text-[#296374]">
            View, approve or reject membership requests
          </p>
        </Link>

        {/* MEMBERS */}
        <Link
          to="/admin/members"
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#0C2C55] mb-2">
            Members
          </h2>
          <p className="text-[#296374]">
            View all approved members
          </p>
        </Link>

        {/* UPLOAD POSTS */}
        <Link
          to="/admin/upload"
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#0C2C55] mb-2">
            Upload Posts
          </h2>
          <p className="text-[#296374]">
            Add photos & updates
          </p>
        </Link>

        {/* ✅ NEW: MANAGE POSTS */}
        <Link
          to="/admin/posts"
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#0C2C55] mb-2">
            Manage Posts
          </h2>
          <p className="text-[#296374]">
            Edit or delete posts
          </p>
        </Link>

        {/* ANALYTICS */}
        <Link
          to="/admin/analytics"
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#0C2C55] mb-2">
            Analytics
          </h2>
          <p className="text-[#296374]">
            View statistics
          </p>
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;