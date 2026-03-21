import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ImageSlider = ({ images = [] }) => {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="relative overflow-hidden rounded-xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full h-[420px] object-cover"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 bg-black/40 text-white px-3 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 bg-black/40 text-white px-3 rounded-full"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};

export default ImageSlider;