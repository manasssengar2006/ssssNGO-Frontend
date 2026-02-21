import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const BASE =
    import.meta.env.VITE_API_URL?.replace("/api", "") ||
    "http://localhost:5000";

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error("DETAIL ERROR:", err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!user) return alert("Login required");

    await API.post(`/posts/${id}/like`);
    fetchPost();
  };

  const handleComment = async () => {
    if (!user || !commentText.trim()) return;

    await API.post(`/posts/${id}/comment`, {
      text: commentText,
      userName: user.name,
    });

    setCommentText("");
    fetchPost();
  };

  if (!post) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // 🖼️ Image resolver (Cloudinary + disk fallback)
  const images =
    post.images?.length > 0
      ? post.images
      : post.image
      ? [`${BASE}/uploads/${post.image}`]
      : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      {/* 🖼️ IMAGE GALLERY */}
      {images.length > 0 && (
        <div className="space-y-4 mb-6">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="NGO activity"
              className="w-full rounded-xl object-cover"
            />
          ))}
        </div>
      )}

      {/* CAPTION */}
      <p className="text-[#0C2C55] text-lg mb-6 break-words whitespace-pre-wrap">
        {post.caption}
      </p>

      {/* LIKE + COMMENT COUNT */}
      <div className="flex gap-6 text-[#296374] mb-6">
        <button onClick={handleLike}>
          ❤️ {(post.likes || []).length} Likes
        </button>
        <span>💬 {(post.comments || []).length} Comments</span>
      </div>

      {/* COMMENTS */}
      <div className="space-y-3 mb-6">
        {(post.comments || []).map((c, i) => (
          <div
            key={i}
            className="bg-[#EDEDCE] p-3 rounded break-words"
          >
            <b className="text-[#0C2C55]">{c.userName}</b>
            <p className="text-[#296374] whitespace-pre-wrap">
              {c.text}
            </p>
          </div>
        ))}
      </div>

      {/* ADD COMMENT */}
      <div className="space-y-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={!user}
          placeholder={user ? "Write a comment..." : "Login to comment"}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#629FAD]"
        />

        <button
          onClick={handleComment}
          disabled={!user}
          className="bg-[#296374] text-[#EDEDCE] px-4 py-2 rounded hover:bg-[#629FAD] transition"
        >
          Comment
        </button>
      </div>
    </motion.div>
  );
};

export default PostDetail;