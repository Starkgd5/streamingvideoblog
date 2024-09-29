import React, { useState, useEffect, useRef } from 'react';
import { Loader } from 'lucide-react';

const VideoPlayer = ({ video }) => {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      if (video?.file && videoRef.current) {
        setIsLoading(true);
        videoRef.current.load();  // Recarrega o vídeo ao trocar de vídeo
      }
    }, [video]);
  
    const handleLoadedData = () => {
      setIsLoading(false);
      // Não iniciar automaticamente; deixar o controle ao usuário
    };

    // Retorna null se o vídeo não estiver disponível
    if (!video || !video.file) return <p className="text-center text-gray-500">No video available.</p>;
    return (
      <div className="w-full relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
            <Loader className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        )}
        <video
          ref={videoRef}
          className="w-full aspect-video"
          controls
          onLoadedData={handleLoadedData}
        >
          <source src={video.file} type="video/mp4" />
          {/* Adiciona mais fontes se houver suporte para outros tipos de vídeos */}
          {/* Exemplo: <source src={video.file} type="video/webm" /> */}
          Your browser does not support the video tag.
        </video>
        <h2 className="text-xl font-bold mt-4">{video.title || 'Untitled Video'}</h2>
        <p className="text-gray-600 mt-2">{video.description || 'No description available.'}</p>
      </div>
    );
};

export default VideoPlayer;
