import api from "api/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [code, setCode] = useState("");
  let navigate = useNavigate();

  const handleCreateParty = async () => {
    const response = await api.post("/api/party/create");
    const {
      party: { code },
    } = response.data;

    navigate(`/party/${code}`);
  };

  const handleJoinParty = () => {
    if (code) {
      navigate(`/party/${code}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div class="card">
        <div class="card-body">
          <h1 className="card-header justify-center">
            Bem vindo ao Karaoke Party
          </h1>
          <div className="w-full flex flex-col items-center space-x-4 divide-y">
            <div className="w-full flex justify-center  pb-4">
              <button
                onClick={handleCreateParty}
                class="py-2 px-2 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Nova festa
              </button>
            </div>

            <div className=" w-full flex items-center flex-col pt-4">
              <input
                class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="Código da festa"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <button
                onClick={handleJoinParty}
                class=" mt-3 w-28 py-2 px-2 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Entre na festa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
