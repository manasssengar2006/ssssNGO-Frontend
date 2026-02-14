import { useState } from "react";
import API from "../services/api";

const MembershipRequest = () => {
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    aadhaarNumber: "",
    panNumber: "",
    annualIncome: "",
    incomeSource: "",
    fatherOccupation: "",
    motherOccupation: "",
    aadhaarAddress: "",
    currentAddress: "",
    phone: "",
    email: "",
    siblings: "",
  membershipType: "",
  });

  const [files, setFiles] = useState({
    photo: null,
    aadhaar: null,
    pan: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) =>
    setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    Object.keys(files).forEach((key) => data.append(key, files[key]));

    try {
      await API.post("/membership/request", data);
      setMessage("Request submitted successfully. Admin will verify.");
    } catch {
      setMessage("Submission failed. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-[#0C2C55]">
        NGO Membership Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">

        <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full p-2 border" />

        <input name="fatherName" placeholder="Father's Name" onChange={handleChange} required className="w-full p-2 border" />

        <input name="motherName" placeholder="Mother's Name" onChange={handleChange} required className="w-full p-2 border" />

        <input name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full p-2 border" />

        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border" />

        <input name="aadhaarNumber" placeholder="Aadhaar Number" onChange={handleChange} required className="w-full p-2 border" />

        <input name="panNumber" placeholder="PAN Card Number" onChange={handleChange} required className="w-full p-2 border" />
        <input
  name="siblings"
  type="number"
  placeholder="Number of Siblings"
  onChange={handleChange}
  className="w-full p-2 border"
/>

{/* NEW FIELD – Membership Type */}
<select
  name="membershipType"
  onChange={handleChange}
  required
  className="w-full p-2 border"
>
  <option value="">Select Membership Type</option>
  <option value="yearly">
    Yearly Membership – ₹100
  </option>
  <option value="lifetime">
    Lifetime Membership – ₹1000
  </option>
</select>

        <select name="annualIncome" onChange={handleChange} className="w-full p-2 border">
          <option value="">Annual Income</option>
          <option>Below 1 Lakh</option>
          <option>1 – 3 Lakh</option>
          <option>3 – 5 Lakh</option>
          <option>Above 5 Lakh</option>
        </select>

        <select name="incomeSource" onChange={handleChange} className="w-full p-2 border">
          <option value="">Source of Income</option>
          <option>Job</option>
          <option>Business</option>
          <option>Agriculture</option>
          <option>Other</option>
        </select>

        <input name="fatherOccupation" placeholder="Father Occupation" onChange={handleChange} className="w-full p-2 border" />

        <input name="motherOccupation" placeholder="Mother Occupation" onChange={handleChange} className="w-full p-2 border" />

        <textarea name="aadhaarAddress" placeholder="Address as per Aadhaar" onChange={handleChange} className="w-full p-2 border" />

        <textarea name="currentAddress" placeholder="Current Address" onChange={handleChange} className="w-full p-2 border" />

        <label>Applicant Photo</label>
        <input type="file" name="photo" onChange={handleFile} required />

        <label>Aadhaar Card Image</label>
        <input type="file" name="aadhaar" onChange={handleFile} required />

        <label>PAN Card Image</label>
        <input type="file" name="pan" onChange={handleFile} required />

        <button className="w-full bg-[#296374] text-white py-2 rounded">
          Submit Request
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default MembershipRequest;
