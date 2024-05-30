import React, { useState } from "react";
import axios from "axios";
import { useVideoQueue } from "../contexts/VideoQueueContext";

const VideoSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const { addVideoToQueue } = useVideoQueue();
  const user = "Guest"; // Substitua pelo nome do usuário autenticado, se disponível

  const handleSearch = async () => {
    const response = await axios.get(`http://localhost:5000/api/search`, {
      params: { q: searchTerm },
    });
    setVideos(response.data.items);
  };

  const handleAddVideoToQueue = (video, user) => {
    setVideos([]);
    addVideoToQueue(video, user);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <div>
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
            />
            <p>{video.snippet.title}</p>
            <button onClick={() => handleAddVideoToQueue(video, user)}>
              Adicionar à Fila
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSearch;
