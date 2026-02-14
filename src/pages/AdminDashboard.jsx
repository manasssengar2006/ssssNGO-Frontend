import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#0C2C55] mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

        <Link
          to="/admin/members"
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#0C2C55] mb-2">
            Members
          </h2>
          <p className="text-[#296374]">
            View all approved NGO members
          </p>
        </Link>

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

        <Link
          to="/admin/analytics"
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-[#0C2C55] mb-2">
            Analytics
          </h2>
          <p className="text-[#296374]">
            View NGO statistics
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
