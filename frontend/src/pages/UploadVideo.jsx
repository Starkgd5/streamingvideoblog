import React, { useState } from "react";
import axios from "axios";
import { Upload, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor, selecione um arquivo para upload");
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.post("http://127.0.0.1:8000/api/videos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("success");
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Erro ao enviar o vídeo:", error.message);
      setUploadStatus("error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-blue-100 to-purple-100">
      {/* Navbar igual à da página Home */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-3xl font-extrabold text-purple-600">
            Mars Tube
          </Link>
          <div className="flex-grow max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos"
                className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Upload className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/upload"
              className="mr-4 text-purple-600 hover:text-purple-800 font-semibold"
            >
              Upload
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Upload Video
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="video"
              className="block text-sm font-medium text-gray-700"
            >
              Video File
            </label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {uploading ? (
              <Upload className="animate-spin h-5 w-5 mr-3" />
            ) : (
              <Upload className="h-5 w-5 mr-3" />
            )}
            {uploading ? "Uploading..." : "Upload Video"}
          </button>
        </form>

        {uploadStatus === "success" && (
          <div className="mt-4 flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            Vídeo enviado com sucesso!
          </div>
        )}
        {uploadStatus === "error" && (
          <div className="mt-4 flex items-center text-red-600">
            <XCircle className="h-5 w-5 mr-2" />
            Erro ao enviar o vídeo. Por favor, tente novamente.
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoUpload;
