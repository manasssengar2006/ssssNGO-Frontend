import { useState } from "react";
import API from "../services/api";

const AdminUpload = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const submitPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    await API.post("/posts", formData);
    alert("Post uploaded 🎉");
  };

  return (
    <form
      onSubmit={submitPost}
      className="max-w-md mx-auto p-6 space-y-4"
    >
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <textarea
        placeholder="Caption"
        className="border p-2 w-full"
        onChange={(e) => setCaption(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 w-full">
        Upload
      </button>
    </form>
  );
};

export default AdminUpload;
