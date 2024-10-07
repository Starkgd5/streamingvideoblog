import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  // Verificação para garantir que os dados essenciais estejam presentes
  const thumbnailUrl = video?.thumbnail_url || 'default_thumbnail.jpg'; // Pode ser uma imagem padrão se estiver ausente
  const title = video?.title || 'Untitled Video';
  const description = video?.description || 'No description available.';
  const createdAt = video?.created_at ? new Date(video.created_at).toLocaleDateString() : 'Unknown date';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/video/${video?.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
        <img 
          src={thumbnailUrl} 
          alt={`Thumbnail of ${title}`} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 truncate">{title}</h3>
          <p className="text-sm text-gray-600 mb-2 truncate">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{createdAt}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
