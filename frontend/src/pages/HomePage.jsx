import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import VideoCard from "../components/VideoCard";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useAxios();

  const user = React.useMemo(() => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      const decoded = jwtDecode(token);
      return {
        id: decoded.user_id,
        username: decoded.username,
        fullName: decoded.full_name,
        image: decoded.image,
      };
    }
    return null;
  }, []);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await api.get("/videos/");
      setVideos(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching videos. Please try again later.");
      console.error("Error fetching videos:", error);
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const filteredVideos = React.useMemo(() => {
    return videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [videos, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-blue-100 to-purple-100">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/upload"
              className="mr-4 text-purple-600 hover:text-purple-800 font-semibold"
            >
              Upload
            </Link>
            {user && (
              <div className="flex items-center">
                <span className="mr-2 text-gray-800">{user.username}</span>
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.username}
                    className="h-8 w-8 rounded-full shadow-lg"
                  />
                ) : (
                  <User className="h-6 w-6 text-gray-600" />
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Latest Videos
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
