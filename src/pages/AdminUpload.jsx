import { useState, useRef } from "react";
import API from "../services/api";

const AdminUpload = () => {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const submitPost = async (e) => {
    e.preventDefault();
    if (!images.length) return alert("Select images first");

    try {
      setLoading(true);

      const formData = new FormData();

      images.forEach((img) => formData.append("images", img));
      formData.append("caption", caption);

      const res = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("UPLOAD SUCCESS:", res.data);

      alert("Posts uploaded 🎉");

      // reset
      setImages([]);
      setCaption("");
      fileRef.current.value = "";
    } catch (err) {
  console.log("🔥 BACKEND RESPONSE:", err.response?.data);

  alert(
    JSON.stringify(err.response?.data, null, 2) ||
    err.message
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitPost}
      className="max-w-md mx-auto p-6 space-y-4 bg-white shadow rounded-xl"
    >
      {/* FILE INPUT */}
      <input
        ref={fileRef}
        type="file"
        multiple
        onChange={(e) => setImages([...e.target.files])}
        required
      />

      {/* PREVIEW */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={URL.createObjectURL(img)}
              className="h-20 w-full object-cover rounded"
            />
          ))}
        </div>
      )}

      {/* CAPTION */}
      <textarea
        placeholder="Caption"
        className="border p-2 w-full rounded"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {/* BUTTON */}
      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 w-full rounded flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Spinner />
            Uploading...
          </>
        ) : (
          "Upload Multiple"
        )}
      </button>
    </form>
  );
};

export default AdminUpload;

// ================= SPINNER =================
const Spinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
);