import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const VideoQueue = ({ videos, removeVideo, updateVideoOrder, admin }) => {
  const moveVideoUp = (index) => {
    if (index === 0) return;
    const newQueue = [...videos];
    [newQueue[index - 1], newQueue[index]] = [
      newQueue[index],
      newQueue[index - 1],
    ];
    updateVideoOrder(newQueue);
  };

  const moveVideoDown = (index) => {
    if (index === videos.length - 1) return;
    const newQueue = [...videos];
    [newQueue[index], newQueue[index + 1]] = [
      newQueue[index + 1],
      newQueue[index],
    ];
    updateVideoOrder(newQueue);
  };

  return (
    <>
      {videos.map((video, index) => {
        return (
          <div
            key={video.videoId}
            className="px-2 py-1 flex items-center justify-center pt-2 my-1"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              style={{
                width: "50px",
                height: "auto",
                marginRight: "10px",
              }}
            />
            <div className="flex grow text-sm flex-col">
              <p>{video.title}</p>
              <p className="text-gray-400">{video.user}</p>
            </div>
            {admin && (
              <>
                <button
                  className="py-1 px-2 items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => removeVideo(video.videoId)}
                >
                  Remover
                </button>
                <div className="ml-2 flex flex-row border border-gray-400 rounded divide-x">
                  <button
                    className="px-0.5 py-1"
                    onClick={() => moveVideoUp(index)}
                  >
                    <FaArrowUp className="text-sm" />
                  </button>
                  <button className="p-0.5">
                    <FaArrowDown
                      className="text-sm"
                      onClick={() => moveVideoDown(index)}
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default VideoQueue;
