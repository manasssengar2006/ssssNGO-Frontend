import { useState, useRef } from "react";
import API from "../services/api";

const AdminUpload = () => {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const submitPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    formData.append("caption", caption);

    try {
      setLoading(true);
      await API.post("/posts", formData);
      alert("Uploaded");

      setImages([]);
      setCaption("");
      fileRef.current.value = "";
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitPost} className="p-4 space-y-4">
      <input
        ref={fileRef}
        type="file"
        multiple
        onChange={(e) => setImages([...e.target.files])}
      />

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Caption"
      />

      <button disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default AdminUpload;