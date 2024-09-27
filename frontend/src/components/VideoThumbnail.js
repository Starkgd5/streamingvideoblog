const VideoThumbnail = ({ video, onClick }) => (
    <div className="flex flex-col cursor-pointer" onClick={() => onClick(video)}>
      <img 
        src={video.thumbnail_url} 
        alt={video.title} 
        className="w-full object-cover rounded-lg" 
      />
      <h3 className="text-sm font-semibold mt-2">{video.title}</h3>
      <p className="text-xs text-gray-500">{video.author}</p>
    </div>
  );

export default VideoThumbnail;