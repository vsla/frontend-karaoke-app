import React from "react";
import { useVideoQueue } from "../contexts/VideoQueueContext";
// import { useDrag, useDrop } from "react-dnd";
const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
  // opacity: isDragging ? 0.5 : 1,
};

const VideoQueueItem = ({ video, index, moveVideo, removeVideo }) => {
  const ref = React.useRef(null);
  // const [, drop] = useDrop({
  //   accept: "video",
  //   collect(monitor) {
  //     return {
  //       handlerId: monitor.getHandlerId(),
  //     };
  //   },
  //   hover(item) {
  //     if (!ref.current) {
  //       return;
  //     }
  //     if (item.index !== index) {
  //       moveVideo(item.index, index);
  //       item.index = index;
  //     }
  //   },
  // });

  // const [{ isDragging }, drag] = useDrag({
  //   type: "video",
  //   item: { index },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  // const opacity = isDragging ? 0 : 1;
  // drag(drop(ref));

  return (
    <div ref={ref} style={{...style}}>
      <img
        src={video.snippet.thumbnails.default.url}
        alt={video.snippet.title}
      />
      <p>{video.snippet.title}</p>
      <p>{video.user}</p>
      <button onClick={() => removeVideo(index)}>Remover</button>
    </div>
  );
};

const VideoQueue = () => {
  const { queue, moveVideo, removeVideoFromQueue } = useVideoQueue();

  return (
    <div>
      {queue.map((video, index) => (
        <VideoQueueItem
          key={video.id.videoId}
          index={index}
          video={video}
          moveVideo={moveVideo}
          removeVideo={removeVideoFromQueue}
        />
      ))}
    </div>
  );
};

export default VideoQueue;
