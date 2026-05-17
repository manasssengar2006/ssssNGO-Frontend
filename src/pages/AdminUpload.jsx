import { useEffect, useRef, useState } from "react";
import API from "../services/api";

const AdminUpload = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    const objectUrls = images.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setImages(selectedFiles);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (updated.length === 0 && fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const submitPost = async (e) => {
    e.preventDefault();

    if (!images.length) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    formData.append("caption", caption);

    try {
      setLoading(true);
      await API.post("/posts", formData);
      alert("Uploaded successfully");

      setImages([]);
      setCaption("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={submitPost}
        className="w-full max-w-3xl rounded-2xl bg-white shadow-xl border border-slate-200 p-6 md:p-8 space-y-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Upload Post
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Add images and write a short caption before publishing.
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Select Images
          </label>

          <div className="relative rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition p-6 text-center">
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="pointer-events-none">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xl">
                ⬆
              </div>
              <p className="font-medium text-slate-800">
                Click or drag images here
              </p>
              <p className="text-sm text-slate-500 mt-1">
                PNG, JPG, JPEG up to any reasonable size
              </p>
            </div>
          </div>
        </div>

        {previews.length > 0 && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Preview
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm"
                >
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="h-32 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows={5}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Uploading..." : "Upload Post"}
        </button>
      </form>
    </div>
  );
};

export default AdminUpload;