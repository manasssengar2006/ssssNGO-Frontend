import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const PostCard = ({ post, refreshPosts }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [liking, setLiking] = useState(false);

  // 🌐 Base URL (auto works local + render)
  const BASE =
    import.meta.env.VITE_API_URL?.replace("/api", "") ||
    "http://localhost:5000";

  // ❤️ Check liked
  const likedByMe = user && (post.likes || []).includes(user._id);

  // ❤️ Like handler
  const handleLike = async () => {
    if (!user || liking) return;

    try {
      setLiking(true);
      await API.post(`/posts/${post._id}/like`);
      refreshPosts?.();
    } catch (err) {
      console.error("Like error:", err);
    } finally {
      setLiking(false);
    }
  };

  // 🖼️ Image resolver (Cloudinary + disk fallback)
  const imageUrl =
    post.images?.[0] || // Cloudinary or multi-image
    (post.image ? `${BASE}/uploads/${post.image}` : null); // old disk

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
    >
      {/* IMAGE */}
      {imageUrl && (
        <img
          onClick={() => navigate(`/posts/${post._id}`)}
          src={imageUrl}
          alt="post"
          className="w-full h-56 object-cover cursor-pointer"
        />
      )}

      <div className="p-4">
        {/* CAPTION */}
        <p className="text-[#0C2C55] mb-3 break-words line-clamp-3">
          {post.caption}
        </p>

        {/* ACTIONS */}
        <div className="flex items-center gap-6 text-sm text-[#296374]">
          {/* LIKE */}
          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={handleLike}
            disabled={!user || liking}
            className={`flex items-center gap-1 transition ${
              likedByMe ? "text-red-500" : ""
            } ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            ❤️ {post.likes?.length || 0}
            {likedByMe && <span className="text-xs">(You)</span>}
          </motion.button>

          {/* COMMENTS */}
          <span>💬 {post.comments?.length || 0}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;