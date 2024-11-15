/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "api/api";

import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL); // Adjust this URL as necessary

const VideoPlayer = () => {
  const { code } = useParams();
  const [party, setParty] = useState(null);

  let navigate = useNavigate();

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
    socket.on("updateQueue", (videos) => {
      setParty((prevParty) => ({ ...prevParty, videos }));
    });

    return () => {
      socket.off("updateQueue");
    };
  }, [code]);

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  useEffect(() => {
    // On mount, check to see if the API script is already loaded
    const createYoutubeVideo = () => {
      const currentVideo = party && party.videos[0];

      if (currentVideo) {
        // the Player object is created uniquely based on the id in props
        new window.YT.Player("karaoke-youtube-player", {
          height: window.innerHeight - 80,
          width: window.innerWidth - 50,
          videoId: currentVideo.id,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      }
    };

    const onPlayerStateChange = (event) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        setTimeout(() => {
          nextVideo();
        }, 3000);
      }
    };

    if (!window.YT) {
      // If not, load the script asynchronously
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = createYoutubeVideo;

      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      // If script is already there, load the video directly
      createYoutubeVideo();
    }
  }, [party]);

  const nextVideo = async () => {
    try {
      await api.post(`/api/party/${code}/next`);
      navigate(0);
    } catch (error) {
      console.error("Error moving to next video", error);
    }
  };

  if (!party) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      {party.videos && party.videos.length > 0 ? (
        <div className="p-2">
          <div id="karaoke-youtube-player" className="min-h-screen-"></div>
          {/* <button onClick={playVideo}>Play</button>
            <button onClick={pauseVideo}>Pause</button> */}
          <button
            className="btn btn-primary btn-sm text-sm mt-4"
            onClick={nextVideo}
          >
            Próximo vídeo
          </button>
        </div>
      ) : (
        <p>No videos in the queue</p>
      )}
    </div>
  );
};

export default VideoPlayer;
