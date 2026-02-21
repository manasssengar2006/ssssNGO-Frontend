import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  const images = post.images || [];

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="max-w-2xl mx-auto py-10">
      {/* BIG CAROUSEL */}
      <div className="relative">
        <img
          src={images[index]}
          className="w-full rounded-xl"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 bg-black/40 text-white px-3 rounded"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 bg-black/40 text-white px-3 rounded"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1 mt-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Caption */}
      <p className="mt-4 text-lg">{post.caption}</p>
    </div>
  );
};

export default PostDetail;