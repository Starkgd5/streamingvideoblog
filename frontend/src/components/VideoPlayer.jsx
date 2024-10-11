import React, { useState, useEffect, useRef } from "react";
import { Loader } from "lucide-react";
import PropTypes from "prop-types";

const VideoPlayer = ({ video }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Recarrega o vídeo quando o vídeo muda
  useEffect(() => {
    if (video?.file && videoRef.current) {
      setIsLoading(true);
      videoRef.current.load(); // Recarrega o vídeo ao trocar de vídeo
    }
  }, [video?.file]); // Adicionei dependência do vídeo

  const handleLoadedData = () => {
    setIsLoading(false); // Remove o estado de loading quando o vídeo é carregado
  };

  // Retorna uma mensagem amigável se o vídeo não estiver disponível
  if (!video || !video.file) {
    return <p className="text-center text-gray-500">No video available.</p>;
  }

  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
          <Loader className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full aspect-video rounded-lg" // Adicionei bordas arredondadas para harmonizar com o estilo moderno
        controls
        onLoadedData={handleLoadedData}
      >
        <source src={video.file} type="video/mp4" />
        {/* Suporte adicional para diferentes formatos pode ser incluído */}
        Your browser does not support the video tag.
      </video>
      <h2 className="text-xl font-bold mt-4">
        {video.title || "Untitled Video"}
      </h2>
      <p className="text-gray-600 mt-2">
        {video.description || "No description available."}
      </p>
    </div>
  );
};

// Definindo tipos de props para evitar erros e ajudar na manutenção
VideoPlayer.propTypes = {
  video: PropTypes.shape({
    thumbnail_url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    file: PropTypes.string,
  }),
};

export default VideoPlayer;
