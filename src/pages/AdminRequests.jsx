import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const fileUrl = (file) =>
  !file ? null : file.startsWith("http") ? file : `${BASE_URL}/uploads/docs/${file}`;

const FileLink = ({ file, label }) => {
  const url = fileUrl(file);
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 underline text-sm"
    >
      View {label}
    </a>
  );
};

const PlanBadge = ({ type }) => {
  const isPermanent = type === "permanent";
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        isPermanent
          ? "bg-[#E1B12C]/20 text-[#8a6d00]"
          : "bg-[#296374]/10 text-[#296374]"
      }`}
    >
      {isPermanent ? "Permanent" : "Annual"}
    </span>
  );
};

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
              <div className="flex items-center gap-3">
                {fileUrl(r.photoFile) ? (
                  <img
                    src={fileUrl(r.photoFile)}
                    alt={r.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 border flex items-center justify-center text-gray-400 text-xs">
                    N/A
                  </div>
                )}

                <div>
                  <p className="font-semibold flex items-center gap-2">
                    {r.name}
                    <PlanBadge type={r.membershipType} />
                  </p>
                  <p className="text-sm">{r.email}</p>
                  <p className="text-xs text-gray-500">Status: {r.status}</p>
                </div>
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
            <div className="flex items-center gap-4 mb-4">
              {fileUrl(selected.photoFile) ? (
                <img
                  src={fileUrl(selected.photoFile)}
                  alt={selected.name}
                  className="w-20 h-20 rounded-lg object-cover border"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-gray-100 border flex items-center justify-center text-gray-400 text-xs">
                  No Photo
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold">Application Details</h2>
                <p className="text-xs text-gray-500 mt-1">
                  This photo will appear on the member's ID card.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {selected.name}</p>
              <p><b>Father:</b> {selected.fatherName}</p>
              <p><b>Mother:</b> {selected.motherName}</p>

              <p><b>Phone:</b> {selected.phone}</p>
              <p><b>Email:</b> {selected.email}</p>

              <p>
                <b>Membership Plan:</b>{" "}
                <PlanBadge type={selected.membershipType} />{" "}
                {selected.membershipType === "permanent"
                  ? "(Lifetime validity)"
                  : "(Valid 1 year from approval)"}
              </p>
              <p><b>Amount:</b> ₹{selected.amount ?? 0}</p>

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