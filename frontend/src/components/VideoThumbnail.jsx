import React from "react";
import PropTypes from "prop-types";

const VideoThumbnail = ({ video, onClick }) => {
  if (!video) return null; // Garantir que o vídeo exista

  const {
    thumbnail_url = "/path/to/default-thumbnail.jpg",
    title = "Untitled Video",
    author: { username = "Unknown Author" } = {},
  } = video;

  return (
    <div
      className="flex flex-col cursor-pointer"
      onClick={() => onClick(video)}
      aria-label={`View details for ${title}`}
    >
      <img
        src={thumbnail_url}
        alt={title}
        className="w-full object-cover rounded-lg"
      />
      <h3 className="text-sm font-semibold mt-2 truncate">{title}</h3>
      <p className="text-xs text-gray-500 truncate">{username}</p>
    </div>
  );
};

// Definindo tipos de props para evitar erros e ajudar na manutenção
VideoThumbnail.propTypes = {
  video: PropTypes.shape({
    thumbnail_url: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
    }),
  }),
  onClick: PropTypes.func.isRequired, // onClick deve ser uma função e é obrigatório
};

export default VideoThumbnail;
