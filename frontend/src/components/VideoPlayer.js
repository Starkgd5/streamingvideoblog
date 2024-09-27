import React, { useState, useEffect, useRef } from 'react';
import { Loader } from 'lucide-react';

const VideoPlayer = ({ video }) => {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      if (videoRef.current) {
        setIsLoading(true);
        videoRef.current.load();
      }
    }, [video]);
  
    const handleLoadedData = () => {
      setIsLoading(false);
      videoRef.current.play();
    };
  
    if (!video) return null;
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
          Your browser does not support the video tag.
        </video>
        <h2 className="text-xl font-bold mt-4">{video.title}</h2>
        <p className="text-gray-600 mt-2">{video.description}</p>
      </div>
    );
  };

export default VideoPlayer;