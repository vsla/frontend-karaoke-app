import React, { useEffect, useState } from "react";
import api from "api/api";

const Admin = () => {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    const fetchParties = async () => {
      const response = await api.get("/api/party");
      setParties(response.data);
    };
    fetchParties();
  }, []);

  const handleDeleteParty = async (partyCode) => {
    try {
      await api.delete(`/api/party/${partyCode}`);
      setParties(parties.filter((party) => party.code !== partyCode));
    } catch (error) {
      console.error("Erro ao remover festa", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4">Painel de Administração</h1>
      <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="py-3 px-6">Código da Festa</th>
            <th className="py-3 px-6">Número de Vídeos</th>
            <th className="py-3 px-6">Ações</th>
          </tr>
        </thead>
        <tbody>
          {parties.length === 0 ? (
            <tr>
              <td colSpan="3" className="py-4 px-6 text-center">
                Nenhuma festa disponível
              </td>
            </tr>
          ) : (
            parties.map((party) => (
              <tr
                key={party.code}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
              >
                <td className="py-4 px-6">{party.code}</td>
                <td className="py-4 px-6 ">{party.videos.length}</td>
                <td className="py-4 px-6 ">
                  <button
                    type="button"
                    className="btn btn-red btn-sm"
                    onClick={() => handleDeleteParty(party.code)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
