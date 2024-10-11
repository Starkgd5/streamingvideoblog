import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const VideoCard = ({ video }) => {
  // Fallback para garantir que os dados essenciais estejam presentes
  const thumbnailUrl = video?.thumbnail_url || "default_thumbnail.jpg"; // Fallback para imagem padrão
  const title = video?.title || "Sem título";
  const description = video?.description || "Sem descrição disponível.";
  const author = video?.author?.username || "Autor desconhecido";
  const createdAt = video?.created_at
    ? new Date(video.created_at).toLocaleDateString()
    : "Data desconhecida";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <Link
        to={`/video/${video?.id}`}
        className="block"
        aria-label={`Assistir ${title}`}
      >
        <img
          src={thumbnailUrl}
          alt={`Thumbnail do vídeo: ${title}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 truncate" title={title}>
            {title}
          </h3>
          <p
            className="text-sm text-gray-600 mb-2 truncate"
            title={description}
          >
            {description}
          </p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{createdAt}</span>
            <span>{author}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

// Definindo tipos de props para garantir que os dados recebidos estejam no formato esperado
VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired, // Certifica-se de que o vídeo tem um ID
    thumbnail_url: PropTypes.string, // URL da thumbnail pode ser opcional
    title: PropTypes.string, // Título do vídeo
    description: PropTypes.string, // Descrição do vídeo
    created_at: PropTypes.string, // Data de criação
    author: PropTypes.shape({
      username: PropTypes.string, // Nome do autor
    }),
  }).isRequired, // O vídeo em si é obrigatório
};

export default VideoCard;
