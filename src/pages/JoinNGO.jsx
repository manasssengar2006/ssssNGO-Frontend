import { useState } from "react";
import API from "../services/api";

const JoinNgo = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [aadhaar, setAadhaar] = useState(null);
  const [pan, setPan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aadhaar || !pan) {
      alert("Upload Aadhaar & PAN");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("phone", form.phone);
    data.append("aadhaar", aadhaar);
    data.append("pan", pan);

    try {
      setLoading(true);
      await API.post("/membership/request", data);
      alert("Request submitted. Admin will verify.");
    } catch {
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-[#0C2C55] mb-6 text-center">
        Join NGO Membership
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded space-y-4"
      >
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setAadhaar(e.target.files[0])}
          required
        />

        <input
          type="file"
          onChange={(e) => setPan(e.target.files[0])}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-[#296374] text-white py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default JoinNgo;
