import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => {
      setCaption(res.data.caption);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);

    images.forEach((img) => formData.append("images", img));

    await API.put(`/posts/${id}`, formData);

    navigate("/admin/posts");
  };

  return (
    <form onSubmit={handleUpdate} className="p-4 space-y-4">
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <input
        type="file"
        multiple
        onChange={(e) => setImages([...e.target.files])}
      />

      <button>Update</button>
    </form>
  );
};

export default AdminEditPost;