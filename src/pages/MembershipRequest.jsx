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

    // ✅ NEW
    city: "",
    state: "",
    pincode: "",

    maritalStatus: "",
    wifeName: "",
    children: "",
    childrenNames: "",
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
    const cleanedForm = { ...form };

    if (cleanedForm.maritalStatus !== "married") {
      delete cleanedForm.wifeName;
      delete cleanedForm.children;
      delete cleanedForm.childrenNames;
    }

    if (cleanedForm.children !== "yes") {
      delete cleanedForm.childrenNames;
    }

    Object.keys(cleanedForm).forEach((key) =>
      data.append(key, cleanedForm[key])
    );

    Object.keys(files).forEach((key) =>
      data.append(key, files[key])
    );

    try {
      await API.post("/membership/request", data);
      setMessage("Request submitted successfully ✅");
    } catch {
      setMessage("Submission failed ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-[#0C2C55] text-center">
        NGO Membership Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
      >

        {/* 🔹 BASIC INFO */}
        <div>
          <h2 className="text-lg font-semibold text-[#0C2C55] mb-3 border-b pb-1">
            Basic Information
          </h2>

          <div className="space-y-3">
            <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#296374]" />
            <input name="fatherName" placeholder="Father's Name" onChange={handleChange} required className="w-full border p-3 rounded-lg" />
            <input name="motherName" placeholder="Mother's Name" onChange={handleChange} required className="w-full border p-3 rounded-lg" />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full border p-3 rounded-lg" />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full border p-3 rounded-lg" />
          </div>
        </div>

        {/* 🔹 LOCATION */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h2 className="text-lg font-semibold text-[#0C2C55] mb-3 border-b pb-1">
            Location Details
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            <input name="city" placeholder="City (Ghaziabad)" onChange={handleChange} required className="border p-3 rounded-lg" />
            <input name="state" placeholder="State" onChange={handleChange} className="border p-3 rounded-lg" />

            {/* ✅ PINCODE FIXED */}
            <input
              name="pincode"
              placeholder="Pincode (e.g. 201001)"
              onChange={handleChange}
              className="border p-3 rounded-lg md:col-span-2"
            />
          </div>
        </div>

        {/* 🔹 DOCUMENT INFO */}
        <div>
          <h2 className="text-lg font-semibold text-[#0C2C55] mb-3 border-b pb-1">
            Identity Details
          </h2>

          <div className="space-y-3">
            <input name="aadhaarNumber" placeholder="Aadhaar Number" onChange={handleChange} required className="w-full border p-3 rounded-lg" />
            <input name="panNumber" placeholder="PAN Number" onChange={handleChange} required className="w-full border p-3 rounded-lg" />
          </div>
        </div>

        {/* 🔹 FAMILY */}
        <div>
          <h2 className="text-lg font-semibold text-[#0C2C55] mb-3 border-b pb-1">
            Family & Income
          </h2>

          <div className="space-y-3">
            <input name="siblings" type="number" placeholder="Number of Siblings" onChange={handleChange} className="w-full border p-3 rounded-lg" />

            <select name="annualIncome" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">Annual Income</option>
              <option>Below 1 Lakh</option>
              <option>1 – 3 Lakh</option>
              <option>3 – 5 Lakh</option>
              <option>Above 5 Lakh</option>
            </select>

            <select name="incomeSource" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">Source of Income</option>
              <option>Job</option>
              <option>Business</option>
              <option>Agriculture</option>
            </select>

            <input name="fatherOccupation" placeholder="Father Occupation" onChange={handleChange} className="w-full border p-3 rounded-lg" />
            <input name="motherOccupation" placeholder="Mother Occupation" onChange={handleChange} className="w-full border p-3 rounded-lg" />
          </div>
        </div>

        {/* 🔹 ADDRESS */}
        <div>
          <h2 className="text-lg font-semibold text-[#0C2C55] mb-3 border-b pb-1">
            Address
          </h2>

          <textarea name="aadhaarAddress" placeholder="Aadhaar Address" onChange={handleChange} className="w-full border p-3 rounded-lg mb-3" />
          <textarea name="currentAddress" placeholder="Current Address" onChange={handleChange} className="w-full border p-3 rounded-lg" />
        </div>

        {/* 🔹 MARITAL */}
        <div>
          <h2 className="text-lg font-semibold text-[#0C2C55] mb-3 border-b pb-1">
            Marital Details
          </h2>

          <select name="maritalStatus" onChange={handleChange} className="w-full border p-3 rounded-lg mb-3">
            <option value="">Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>

          {form.maritalStatus === "married" && (
            <div className="space-y-3">
              <input name="wifeName" placeholder="Wife Name" onChange={handleChange} className="w-full border p-3 rounded-lg" />

              <select name="children" onChange={handleChange} className="w-full border p-3 rounded-lg">
                <option value="">Do you have children?</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>

              {form.children === "yes" && (
                <textarea name="childrenNames" placeholder="Children Names" onChange={handleChange} className="w-full border p-3 rounded-lg" />
              )}
            </div>
          )}
        </div>

        {/* 🔹 FILES */}
        <div>
          <h2 className="text-lg font-semibold text-[#0C2C55] mb-3 border-b pb-1">
            Upload Documents
          </h2>

          <div className="space-y-3">
            <input type="file" name="photo" onChange={handleFile} required />
            <input type="file" name="aadhaar" onChange={handleFile} required />
            <input type="file" name="pan" onChange={handleFile} required />
          </div>
        </div>

        <button className="w-full bg-[#296374] hover:bg-[#1f4e5d] text-white py-3 rounded-lg font-semibold">
          Submit Request
        </button>

        {message && (
          <p className="text-center text-sm mt-2 text-green-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default MembershipRequest;