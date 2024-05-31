import api from "api/api";
import React, { useState } from "react";
import {
  FaRegTrashCan,
  FaPlus,
  FaCircleInfo,
  FaCircleCheck,
  FaXmark,
} from "react-icons/fa6";

import { VideoSearchItemsModal } from "./VideoSearchItemsModal";

const VideoSearch = ({ addVideo, username }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addedSucess, setAddedSucess] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    addedSucess && setAddedSucess(false);
    if (query) {
      setLoading(true);
      const response = await api.get(`/api/search`, {
        params: { q: query },
      });
      setLoading(false);
      setResults(response.data.items);
    }
  };

  const handleAddVideoToQueue = (video, user) => {
    addedSucess && setAddedSucess(false);
    addVideo(video, user);

    setAddedSucess(true);

    setTimeout(() => {
      setAddedSucess(false);
    }, 3000);
  };

  const closeSucess = () => {
    setAddedSucess(false);
  };

  return (
    <div className="flex justify-end md:justify-start">
      <label class="btn btn-primary mb-2 btn-sm" for="modal-1">
        Adicionar vídeo
      </label>
      <input class="modal-state" id="modal-1" type="checkbox" />

      <div class="modal">
        <label class="modal-overlay" for="modal-1"></label>
        <div class="modal-content flex flex-col gap-5 p-4">
          <label
            for="modal-1"
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 class="text-xl">Adicione uma música</h2>
          <form onSubmit={handleSearch}>
            <div class="max-w-sm flex flex-row mb-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Procure vídeos no YouTube"
                class="mr-4 py-1 px-2 block w-full border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              />
              <button
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                type="submit"
                data-hs-overlay="#hs-modal-upgrade-to-pro"
              >
                Procurar
              </button>
            </div>
          </form>
          <VideoSearchItemsModal videos={results} />
          <div>
            {loading ? (
              <div className="w-full flex items-center justify-center my-4">
                <div class="spinner-simple"></div>
              </div>
            ) : (
              <>
                {addedSucess && (
                  <div className="alert alert-success max-w-sm p-2">
                    <FaCircleCheck className="text-3xl" />
                    <div className="flex w-full justify-between">
                      <div className="flex flex-col">
                        <span>Música adicionada</span>
                      </div>
                      <FaXmark onClick={closeSucess} />
                    </div>
                  </div>
                )}
                {results.map((video) => (
                  <div
                    key={video.id.videoId}
                    className=" px-2 py-1 flex justify-center pt-2 my-1"
                  >
                    <img
                      src={video.snippet.thumbnails.default.url}
                      alt={video.snippet.title}
                      className="w-14 h-auto mr-3"
                    />
                    <div className="text-sm grow mr-2">
                      {video.snippet.title}
                    </div>
                    <button
                      class="btn btn-primary btn-sm text-sm"
                      onClick={() =>
                        handleAddVideoToQueue({
                          id: video.id.videoId,
                          title: video.snippet.title,
                          thumbnail: video.snippet.thumbnails.default.url,
                          user: username,
                        })
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
          <div class="flex gap-3">
            {results.length > 0 && (
              <button class="btn btn-primary" onClick={() => setResults([])}>
                <FaRegTrashCan className="mr-2" />
                Limpar
              </button>
            )}

            <label class="btn btn-block" for="modal-1">
              Voltar
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSearch;
