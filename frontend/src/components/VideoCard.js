import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img 
      src={video.thumbnail_url} 
      alt={video.title} 
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2 truncate">{video.title}</h3>
      <p className="text-sm text-gray-600 mb-2 truncate">{video.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{new Date(video.created_at).toLocaleDateString()}</span>
        <Link to={`/video/${video.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
          Watch Now
        </Link>
      </div>
    </div>
  </div>
);

export default VideoCard;