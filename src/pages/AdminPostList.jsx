import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const AdminPostsList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    if (!window.confirm("Delete post?")) return;

    await API.delete(`/posts/${id}`);
    fetchPosts();
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {posts.map((post) => (
        <div key={post._id} className="border p-2">
          <img
            src={post.images[0]}
            className="h-40 w-full object-cover"
          />

          <p>{post.caption}</p>

          <Link to={`/admin/edit/${post._id}`}>
            <button>Edit</button>
          </Link>

          <button onClick={() => deletePost(post._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPostsList;