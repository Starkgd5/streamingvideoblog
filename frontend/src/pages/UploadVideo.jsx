import React, { useState } from "react";
import axios from "axios";
import { Upload, CheckCircle, XCircle } from "lucide-react";

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Manipula a mudança do arquivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Manipula o envio do formulário
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
      await axios.post("http://localhost:8000/api/videos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("success");
      // Limpa o formulário após o upload bem-sucedido
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
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {uploading ? (
            <Upload className="animate-spin h-5 w-5 mr-3" />
          ) : (
            <Upload className="h-5 w-5 mr-3" />
          )}
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

      {/* Feedback sobre o status do upload */}
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
    </div>
  );
};

export default VideoUpload;
