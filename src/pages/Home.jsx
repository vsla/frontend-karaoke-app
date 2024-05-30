import api from "api/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [code, setCode] = useState("");
  let navigate = useNavigate();

  const handleCreateParty = async () => {
    const response = await api.post("/api/party/create");
    const { code } = response.data;
    navigate(`/party/${code}`);
  };

  const handleJoinParty = () => {
    if (code) {
      navigate(`/party/${code}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to Karaoke Party</h1>
      <div className="w-full max-w-md">
        <input
          className="mb-4"
          placeholder="Entre com o código de uma festa"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={handleCreateParty} className="w-full mb-4">
          Create Party
        </button>
        <button onClick={handleJoinParty} className="w-full">
          Join Party
        </button>
      </div>
    </div>
  );
};

export default Home;
