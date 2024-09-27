import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Menu, Bell, User } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import VideoThumbnail from '../components/VideoThumbnail';
import { useParams } from 'react-router-dom';

const PlayingVideo = () => {
  const { videoId } = useParams('id');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/videos/');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
  
    fetchVideos();
    setSelectedVideo(null); // Clear initial selection
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/videos/${videoId}`);
        setSelectedVideo(response.data)
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideo();
  }, [videoId]);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-4" />
            <a href="/"><h1 className="text-xl font-bold">Mars Tube</h1></a>
          </div>
          <div className="flex-grow max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center">
            <Bell className="h-6 w-6 mr-4" />
            <User className="h-6 w-6" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row">
            {/* Video Player */}
            <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <VideoPlayer video={selectedVideo} />
            </div>

            {/* Video List */}
            <div className="w-full md:w-1/3">
              <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
              <div className="grid grid-cols-1 gap-4">
                {filteredVideos.map((video) => (
                  <VideoThumbnail key={video.id} video={video} onClick={setSelectedVideo} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayingVideo;