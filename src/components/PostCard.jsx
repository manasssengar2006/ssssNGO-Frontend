import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const images = post.images || [];

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {/* IMAGE SLIDER */}
      <div className="relative">
        <img
          src={images[index]}
          className="w-full h-64 object-cover cursor-pointer"
          onClick={() => navigate(`/posts/${post._id}`)}
        />

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 bg-black/40 text-white px-2 rounded"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 bg-black/40 text-white px-2 rounded"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="p-3">
        <p className="line-clamp-2">{post.caption}</p>

        <div className="flex gap-4 text-sm text-gray-500 mt-2">
          ❤️ {post.likes?.length || 0}
          💬 {post.comments?.length || 0}
        </div>
      </div>
    </div>
  );
};

export default PostCard;