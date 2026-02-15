import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // FETCH REQUESTS
  const fetchRequests = async () => {
    try {
      setPageLoading(true);
      const res = await API.get("/admin/requests");
      setRequests(res.data);
    } catch (err) {
      console.log("Failed to load requests");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // APPROVE
  const approve = async (id) => {
    try {
      setActionLoading(true);
      await API.post(`/admin/approve/${id}`);
      await fetchRequests();
      setSelected(null);
    } finally {
      setActionLoading(false);
    }
  };

  // REJECT
  const reject = async (id) => {
    try {
      setActionLoading(true);
      await API.post(`/admin/reject/${id}`);
      await fetchRequests();
      setSelected(null);
    } finally {
      setActionLoading(false);
    }
  };

  const FileLink = ({ file, label }) => (
    <a
      href={`http://localhost:5000/uploads/docs/${file}`}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 underline text-sm"
    >
      View {label}
    </a>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* GLOBAL LOADER */}
      {(pageLoading || actionLoading) && <Loader />}

      <h1 className="text-3xl font-bold text-[#0C2C55] mb-6">
        Membership Applications
      </h1>

      {/* EMPTY STATE */}
      {!pageLoading && requests.length === 0 && (
        <p className="text-gray-500">No applications yet.</p>
      )}

      {/* LIST VIEW */}
      <div className="grid gap-4">
        {requests.map((r) => (
          <motion.div
            key={r._id}
            whileHover={{ scale: 1.01 }}
            className="bg-white shadow rounded p-4 border"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm">{r.email}</p>
                <p className="text-xs text-gray-500">
                  Status: {r.status}
                </p>
              </div>

              <button
                onClick={() => setSelected(r)}
                className="bg-[#296374] text-white px-3 py-1 rounded"
              >
                View
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DETAIL MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-40">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded p-6 max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            <h2 className="text-xl font-bold mb-4">
              Application Details
            </h2>

            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {selected.name}</p>
              <p><b>Father:</b> {selected.fatherName}</p>
              <p><b>Mother:</b> {selected.motherName}</p>

              <p><b>Phone:</b> {selected.phone}</p>
              <p><b>Email:</b> {selected.email}</p>

              <p><b>Aadhaar No:</b> {selected.aadhaarNumber}</p>
              <p><b>PAN No:</b> {selected.panNumber}</p>

              <p><b>Income:</b> {selected.annualIncome}</p>
              <p><b>Source:</b> {selected.incomeSource}</p>

              <p><b>Father Occupation:</b> {selected.fatherOccupation}</p>
              <p><b>Mother Occupation:</b> {selected.motherOccupation}</p>

              <p><b>Aadhaar Address:</b> {selected.aadhaarAddress}</p>
              <p><b>Current Address:</b> {selected.currentAddress}</p>

              <div className="flex gap-4 mt-3">
                <FileLink file={selected.photoFile} label="Photo" />
                <FileLink file={selected.aadhaarFile} label="Aadhaar" />
                <FileLink file={selected.panFile} label="PAN" />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">
              {selected.status !== "approved" && (
                <button
                  disabled={actionLoading}
                  onClick={() => approve(selected._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  {actionLoading && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  Approve & Generate ID
                </button>
              )}

              {selected.status !== "rejected" && (
                <button
                  disabled={actionLoading}
                  onClick={() => reject(selected._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  {actionLoading && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  Reject
                </button>
              )}

              <button
                onClick={() => setSelected(null)}
                className="border px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
