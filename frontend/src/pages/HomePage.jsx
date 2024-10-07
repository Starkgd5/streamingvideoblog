import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import VideoCard from "../components/VideoCard";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/videos/");
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erro ao buscar vídeos. Tente novamente mais tarde.");
        console.error("Erro ao buscar vídeos:", error.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Filtrar vídeos de acordo com o termo de busca
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabeçalho */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Mars Tube
          </Link>
          <div className="flex-grow max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/upload"
              className="mr-4 text-blue-600 hover:text-blue-800"
            >
              Upload
            </Link>
            <User className="h-6 w-6" />
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Latest Videos</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl">No videos found.</p>
        )}
      </main>
    </div>
  );
};

export default HomePage;
