import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoQueue from "components/VideoQueue";
import VideoSearch from "components/VideoSearch";

import api from "api/api";
import UsernameForm from "components/UsernameForm";
import { FaLock, FaRegCopy } from "react-icons/fa6";

const Party = () => {
  const { code } = useParams();
  const [party, setParty] = useState(null);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const handleUsernameSubmit = (username) => {
    localStorage.setItem("username", username);
    setUsername(username);
  };

  useEffect(() => {
    const fetchParty = async () => {
      try {
        const response = await api.get(`/api/party/${code}`);
        setParty(response.data);
      } catch (error) {
        console.error("Festa não encontrada");
      }
    };
    fetchParty();
  }, [code]);

  const addVideo = async (video) => {
    try {
      const response = await api.post(`/api/party/${code}/videos`, video);
      setParty(response.data);
    } catch (error) {
      console.error("Erro ao adicionar vídeo", error);
    }
  };

  const removeVideo = async (videoId) => {
    try {
      const response = await api.delete(`/api/party/${code}/videos/${videoId}`);
      setParty(response.data);
    } catch (error) {
      console.error("Erro ao remover vídeo", error);
    }
  };

  const updateVideoOrder = async (videos) => {
    try {
      const response = await api.put(`/api/party/${code}/videos`, { videos });
      setParty(response.data);
    } catch (error) {
      console.error("Erro ao atualizar ordem dos vídeos", error);
    }
  };

  if (!party) {
    return <p>Carregando...</p>;
  }

  if (!username) {
    return <UsernameForm onSubmit={handleUsernameSubmit} />;
  }
  return (
    <div className="p-2">
      <div className="flex mb-2">
        <div className="text-xl mb-2 grow">Festa</div>
        <button type="button" className="btn btn-outline-primary btn-xs border-gray-500 text-gray-500 text-xs hover:bg-transparent hover:text-gray-500">
          <FaRegCopy className="mr-2"/>
          Copiar Código da festa
        </button>
      </div>
      <VideoSearch addVideo={addVideo} username={username} />
      <VideoQueue
        videos={party.videos}
        removeVideo={removeVideo}
        updateVideoOrder={updateVideoOrder}
      />
    </div>
  );
};

export default Party;
