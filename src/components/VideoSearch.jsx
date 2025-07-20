import api from "api/api";
import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaCircleCheck, FaXmark } from "react-icons/fa6";

import { VideoSearchItemsModal } from "./VideoSearchItemsModal";

const VideoSearch = ({ addVideo, username }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addedSucess, setAddedSucess] = useState(false);
  const [pageToken, setPageToken] = useState(""); // For pagination
  const [hasMore, setHasMore] = useState(true); // Track if more results are available

  const observerRef = useRef(); // For infinite scrolling
  const videoListRef = useRef(); // Reference for the scrollable container

  const handleSearch = async (e) => {
    e.preventDefault();
    addedSucess && setAddedSucess(false);
    if (query) {
      setLoading(true);
      setResults([]); // Clear previous results
      setPageToken(""); // Reset pagination
      setHasMore(true); // Reset pagination state

      const response = await api.get(`/api/search`, {
        params: { q: query },
      });
      setLoading(false);
      setResults(response.data.items);
      setPageToken(response.data.nextPageToken || ""); // Set the next page token
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

  // Infinite Scroll Effect for Scrollable Container
  useEffect(() => {
    const fetchMoreVideos = async () => {
      if (!query || !pageToken || !hasMore) return;

      setLoading(true);
      const response = await api.get(`/api/search`, {
        params: { q: query, pageToken },
      });
      setLoading(false);

      const newItems = response.data.items || [];
      setResults((prev) => [...prev, ...newItems]); // Append new items
      setPageToken(response.data.nextPageToken || ""); // Update page token
      setHasMore(!!response.data.nextPageToken); // Update "has more" status
    };

    const observerRefCurrent = observerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchMoreVideos(); // Fetch more videos when bottom is reached
        }
      },
      { root: videoListRef.current, threshold: 1.0 } // Observe within the scrollable container
    );

    if (observerRefCurrent) {
      observer.observe(observerRefCurrent);
    }

    return () => {
      if (observerRefCurrent) {
        observer.unobserve(observerRefCurrent);
      }
    };
  }, [loading, query, pageToken, hasMore]);

  return (
    <div className="flex justify-end md:justify-start">
      <label className="btn btn-primary mb-2 btn-sm" htmlFor="modal-1">
        Adicionar vídeo
      </label>
      <input className="modal-state" id="modal-1" type="checkbox" />

      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div className="modal-content w-full  sm:px-8 flex flex-col gap-5 !pr-4 !pl-4 !p-4">
          <label
            htmlFor="modal-1"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Adicione uma música</h2>
          <form onSubmit={handleSearch}>
            <div className="max-w-sm flex flex-row mb-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Procure vídeos no YouTube"
                className="mr-4 py-1 px-2 block w-full border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              />
              <button
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                type="submit"
                data-hs-overlay="#hs-modal-upgrade-to-pro"
              >
                Procurar
              </button>
            </div>
          </form>
          <VideoSearchItemsModal videos={results} />
          <div>
            {loading && results.length === 0 ? (
              <div className="w-full flex items-center justify-center my-4">
                <div className="spinner-simple"></div>
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
                <div
                  id="video-list"
                  ref={videoListRef}
                  className="overflow-y-auto h-80 border border-gray-300 p-2 rounded-lg"
                >
                  {results.map((video) => (
                    <div
                      key={video.id.videoId}
                      className="px-2 py-1 flex justify-center pt-2 my-1"
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
                        className="btn btn-primary btn-sm text-sm"
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
                  {loading && (
                    <div className="w-full flex items-center justify-center my-4">
                      <div className="spinner-simple"></div>
                    </div>
                  )}
                  <div ref={observerRef} className="h-10"></div>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <label className="btn btn-block" htmlFor="modal-1">
              Voltar
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSearch;
