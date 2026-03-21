import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ImageSlider = ({ images = [] }) => {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-video bg-black rounded-xl overflow-hidden">

      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.35 }}

          // 🔥 FIXED
          className="w-full h-full object-contain"
        />
      </AnimatePresence>

      {/* LEFT BUTTON */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
        >
          ‹
        </button>
      )}

      {/* RIGHT BUTTON */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
        >
          ›
        </button>
      )}

      {/* DOTS */}
      {images.length > 1 && (
        <div className="absolute bottom-2 w-full flex justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;