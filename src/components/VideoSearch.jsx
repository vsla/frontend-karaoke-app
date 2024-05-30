import api from "api/api";
import React, { useState } from "react";

const VideoSearch = ({ addVideo, username }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      const response = await api.get(`/api/search`, {
        params: { q: query },
      });
      setResults(response.data.items);
    }
  };

  const handleAddVideoToQueue = (video, user) => {
    setResults([]);
    addVideo(video, user);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Procure vídeos no YouTube"
        />
        <button type="submit">Procurar</button>
      </form>
      <div>
        {results.map((video) => (
          <div key={video.id.videoId}>
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
            />
            <div>{video.snippet.title}</div>
            <button
              onClick={() =>
                handleAddVideoToQueue({
                  id: video.id.videoId,
                  title: video.snippet.title,
                  thumbnail: video.snippet.thumbnails.default.url,
                  user: username,
                })
              }
            >
              Adicionar à festa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSearch;
