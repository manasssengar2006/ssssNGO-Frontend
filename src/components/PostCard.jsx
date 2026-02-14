import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const PostCard = ({ post, refreshPosts }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [liking, setLiking] = useState(false);

  const likedByMe =
    user && (post.likes || []).includes(user._id);

  const handleLike = async () => {
    if (!user || liking) return;

    try {
      setLiking(true);
      await API.post(`/posts/${post._id}/like`);
      refreshPosts();
    } finally {
      setLiking(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
    >
      <img
        onClick={() => navigate(`/posts/${post._id}`)}
        src={`http://localhost:5000/uploads/${post.image}`}
        alt=""
        className="w-full h-56 object-cover cursor-pointer"
      />

      <div className="p-4">
        <p className="text-[#0C2C55] mb-3 break-words line-clamp-3">
          {post.caption}
        </p>

        <div className="flex items-center gap-6 text-sm text-[#296374]">
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

          <span>💬 {post.comments?.length || 0}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
