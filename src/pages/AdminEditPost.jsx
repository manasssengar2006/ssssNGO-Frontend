import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => {
      setCaption(res.data.caption);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    if (image) formData.append("image", image);

    await API.put(`/posts/${id}`, formData);
    navigate("/admin");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#0C2C55] mb-6">
        Edit Post
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border p-3 rounded"
          rows={4}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="w-full bg-[#296374] text-[#EDEDCE] py-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default AdminEditPost;
