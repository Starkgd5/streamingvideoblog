const VideoThumbnail = ({ video, onClick }) => {
  if (!video) return null; // Garantir que o vídeo exista

  return (
    <div
      className="flex flex-col cursor-pointer"
      onClick={() => onClick(video)}
      aria-label={`View details for ${video.title || "Untitled Video"}`}
    >
      <img
        src={video.thumbnail_url || "/path/to/default-thumbnail.jpg"} // Fallback para thumbnail padrão
        alt={video.title || "No title available"} // Fallback para o atributo alt
        className="w-full object-cover rounded-lg"
      />
      <h3 className="text-sm font-semibold mt-2 truncate">
        {video.title || "Untitled Video"}
      </h3>
      <p className="text-xs text-gray-500 truncate">
        {video.author || "Unknown Author"}
      </p>
    </div>
  );
};

export default VideoThumbnail;
