import api from "api/api";
import React, { useEffect, useState } from "react";


const Admin = () => {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    const fetchParties = async () => {
      const response = await api.get("/api/party");
      setParties(response.data);
    };
    fetchParties();
  }, []);

  return (
    <div>
      <h1>Painel de Administração</h1>
      <table>
        <thead>
          <tr>
            <th>Código da Festa</th>
            <th>Número de Vídeos</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party) => (
            <tr key={party.code}>
              <td>{party.code}</td>
              <td>{party.videos.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
