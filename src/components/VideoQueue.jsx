import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const VideoQueue = ({ videos, removeVideo, updateVideoOrder }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedVideos = Array.from(videos);
    const [removed] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, removed);

    updateVideoOrder(reorderedVideos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="videos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {videos.map((video, index) => (
              <Draggable key={video.id} draggableId={video.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px",
                      margin: "5px 0",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                    }}
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
                    <div style={{ flex: 1 }}>
                      {video.title} ({video.user})
                    </div>
                    <button onClick={() => removeVideo(video.id)}>
                      Remover
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default VideoQueue;
