import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoQueue from "components/VideoQueue";
import VideoSearch from "components/VideoSearch";
import api from "api/api";
import UsernameForm from "components/UsernameForm";
import { FaArrowUpRightFromSquare, FaHouse } from "react-icons/fa6";
import io from "socket.io-client";
import { CopyToClipboardButton } from "components/CopyToClipboardButton";

const socket = io(process.env.REACT_APP_API_URL); // Adjust this URL as necessary

const Party = ({ admin = false }) => {
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

    // Join the party room
    socket.emit("joinParty", code);

    // Listen for real-time updates to the queue
    socket.on("updateQueue", (newQueue) => {
      setParty((prevParty) => ({ ...prevParty, videos: newQueue }));
    });

    return () => {
      socket.off("updateQueue");
    };
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
      setParty({ ...response.data });
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
    <div className="flex grow flex-col p-2 h-full w-full">
      <div className="flex mb-2">
        <div className="text-xl mb-2 grow">Festa</div>
        <VideoSearch addVideo={addVideo} username={username} />
      </div>
      <div className="flex grow overflow-hidden">
        {/* VideoQueue with scrollbar */}
        <div className="flex grow overflow-y-auto">
          <VideoQueue
            videos={party.videos}
            removeVideo={removeVideo}
            updateVideoOrder={updateVideoOrder}
            admin={admin}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm border-gray-500 text-gray-500 text-xs hover:bg-transparent hover:text-gray-500 mr-2"
          onClick={() => window.open(`/`)}
        >
          <FaHouse className="mr-2" />
          Início
        </button>
        <button
          className="btn btn-secondary btn-sm mr-2"
          onClick={() => window.open(`/party/${code}/player`, "_blank")}
        >
          <FaArrowUpRightFromSquare className="mr-2" />
          Abrir player
        </button>
        <CopyToClipboardButton code={code} />
      </div>
    </div>
  );
};

export default Party;
