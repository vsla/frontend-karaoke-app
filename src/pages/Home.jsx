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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
          padding: "20px",
          border: "1px solid #ccc",
        }}
      >
        <button onClick={handleCreateParty} style={{ marginBottom: "20px" }}>
          Crie uma nova festa
        </button>
        <input
          type="text"
          placeholder="Entre com o código de uma festa"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={handleJoinParty} style={{ marginTop: "10px" }}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Home;
