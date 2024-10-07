import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Menu, Bell, User } from "lucide-react";
import VideoPlayer from "../components/VideoPlayer";
import VideoThumbnail from "../components/VideoThumbnail";
import { useParams } from "react-router-dom";

const PlayingVideo = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Função para buscar a lista de vídeos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/videos/");
        setVideos(response.data);
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error.message);
        if (error.response) {
          console.error("Resposta do servidor:", error.response.data);
        } else if (error.request) {
          console.error("Nenhuma resposta recebida:", error.request);
        } else {
          console.error("Erro na configuração da requisição:", error.message);
        }
      }
    };

    fetchVideos();
    setVideo(null); // Limpar a seleção inicial
  }, []);

  // Função para buscar vídeo individual baseado no videoId
  useEffect(() => {
    if (id) {
      // Garantir que videoId existe antes de tentar buscar
      const fetchVideo = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/videos/${id}/`
          );
          setVideo(response.data);
        } catch (error) {
          console.error("Erro ao buscar vídeo específico:", error.message);
          if (error.response) {
            console.error("Resposta do servidor:", error.response.data);
          } else if (error.request) {
            console.error("Nenhuma resposta recebida:", error.request);
          } else {
            console.error("Erro na configuração da requisição:", error.message);
          }
        }
      };
      fetchVideo();
    }
  }, [id]);

  // Filtrando os vídeos de acordo com o termo de busca
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-4" />
            <a href="/">
              <h1 className="text-xl font-bold text-blue-600">Mars Tube</h1>
            </a>
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

      {/* Conteúdo Principal */}
      <main className="flex-grow bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row">
            {/* Video Player */}
            <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <VideoPlayer video={video} />
            </div>

            {/* Lista de Vídeos */}
            <div className="w-full md:w-1/3">
              <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
              <div className="grid grid-cols-1 gap-4">
                {filteredVideos.map((video) => (
                  <VideoThumbnail
                    key={video.id}
                    video={video}
                    onClick={setVideo}
                  />
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
