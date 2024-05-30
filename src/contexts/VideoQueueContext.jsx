import React, { createContext, useContext, useState } from "react";

// Criação do contexto
const VideoQueueContext = createContext(null);

// Provedor do contexto
export const VideoQueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);

  const addVideoToQueue = (video, user) => {
    console.log(video, user);
    
    setQueue([...queue, { ...video, user }]);
  };

  const removeVideoFromQueue = (index) => {
    setQueue(queue.filter((_, i) => i !== index));
  };

  const moveVideo = (from, to) => {
    const updatedQueue = [...queue];
    const [movedVideo] = updatedQueue.splice(from, 1);
    updatedQueue.splice(to, 0, movedVideo);
    setQueue(updatedQueue);
  };

  return (
    <VideoQueueContext.Provider
      value={{ queue, addVideoToQueue, removeVideoFromQueue, moveVideo }}
    >
      {children}
    </VideoQueueContext.Provider>
  );
};

// Hook para usar o contexto
export const useVideoQueue = () => useContext(VideoQueueContext);
