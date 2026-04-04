import { useState } from "react";
import API from "../services/api";
import { Country, State, City } from "country-state-city";

const MembershipRequest = () => {
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    phone: "",
    email: "",
    aadhaarNumber: "",
    panNumber: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    annualIncome: "",
    incomeSource: "",
    fatherOccupation: "",
    motherOccupation: "",
    aadhaarAddress: "",
    currentAddress: "",
    siblings: "",
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

  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

await API.post("/membership/request", data, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      setMessage("Request submitted successfully ✅");

    } catch (err) {
      setMessage("Submission failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0C2C55] text-center mb-6">
      Membership Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded-xl shadow-lg space-y-6"
      >

        {/* BASIC */}
        <Section title="Basic Information">
          <Input name="name" placeholder="Full Name" onChange={handleChange} required />
          <Input name="fatherName" placeholder="Father Name" onChange={handleChange} />
          <Input name="motherName" placeholder="Mother Name" onChange={handleChange} />
          <Input name="phone" placeholder="Phone" onChange={handleChange} required />
          <Input name="email" placeholder="Email" onChange={handleChange} required />
        </Section>

        {/* LOCATION */}
        <Section title="Location">

          <Select
            name="country"
            value={form.country}
            onChange={(e) =>
              setForm({ ...form, country: e.target.value, state: "", city: "" })
            }
          >
            <option value="">Select Country</option>
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </Select>

          <Select
            name="state"
            value={form.state}
            onChange={(e) =>
              setForm({ ...form, state: e.target.value, city: "" })
            }
            disabled={!form.country}
          >
            <option value="">Select State</option>
            {State.getStatesOfCountry(form.country).map((s) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </Select>

          <Select
            name="city"
            value={form.city}
            onChange={handleChange}
            disabled={!form.state}
          >
            <option value="">Select City</option>
            {City.getCitiesOfState(form.country, form.state).map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </Select>

          <Input name="pincode" placeholder="Pincode" onChange={handleChange} />
        </Section>

        {/* ID */}
        <Section title="Identity">
          <Input name="aadhaarNumber" placeholder="Aadhaar Number" onChange={handleChange} />
          <Input name="panNumber" placeholder="PAN Number" onChange={handleChange} />
        </Section>

        {/* FAMILY */}
        <Section title="Family & Income">
          <Input name="siblings" placeholder="Siblings" onChange={handleChange} />

          <Select name="annualIncome" onChange={handleChange}>
            <option value="">Annual Income</option>
            <option>Below 1 Lakh</option>
            <option>1–3 Lakh</option>
            <option>3–5 Lakh</option>
            <option>Above 5 Lakh</option>
          </Select>

          <Select name="incomeSource" onChange={handleChange}>
            <option value="">Income Source</option>
            <option>Job</option>
            <option>Business</option>
            <option>Agriculture</option>
          </Select>

          <Input name="fatherOccupation" placeholder="Father Occupation" onChange={handleChange} />
          <Input name="motherOccupation" placeholder="Mother Occupation" onChange={handleChange} />
        </Section>

        {/* ADDRESS */}
        <Section title="Address">
          <Textarea name="aadhaarAddress" placeholder="Aadhaar Address" onChange={handleChange} />
          <Textarea name="currentAddress" placeholder="Current Address" onChange={handleChange} />
        </Section>

        {/* MARITAL */}
        <Section title="Marital Status">
          <Select name="maritalStatus" onChange={handleChange}>
            <option value="">Select</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </Select>

          {form.maritalStatus === "married" && (
            <>
              <Input name="wifeName" placeholder="Wife Name" onChange={handleChange} />

              <Select name="children" onChange={handleChange}>
                <option value="">Children?</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Select>

              {form.children === "yes" && (
                <Textarea name="childrenNames" placeholder="Children Names" onChange={handleChange} />
              )}
            </>
          )}
        </Section>

        {/* FILES */}
        <Section title="Documents">
          <input type="file" name="photo" onChange={handleFile} required className="w-full border p-2 rounded" />
          <input type="file" name="aadhaar" onChange={handleFile} required className="w-full border p-2 rounded" />
          <input type="file" name="pan" onChange={handleFile} required className="w-full border p-2 rounded" />
        </Section>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-[#296374] text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>

        {message && (
          <p className="text-center text-sm text-green-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};


/* COMPONENTS */

const Section = ({ title, children }) => (
  <div>
    <h2 className="font-semibold text-[#0C2C55] mb-2">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {children}
    </div>
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#296374]"
  />
);

const Select = (props) => (
  <select
    {...props}
    className="w-full border p-3 rounded-lg"
  >
    {props.children}
  </select>
);

const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full border p-3 rounded-lg sm:col-span-2"
  />
);

export default MembershipRequest;
