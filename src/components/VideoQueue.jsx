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
      <Droppable droppableId="droppable-video">
        {(provided) => (
          <div
            {...provided.droppableProps}
            className="divide-y divide-gray-600 max-w-2xl"
            ref={provided.innerRef}
          >
            {videos.map((video, index) => (
              <Draggable key={video.id} draggableId={video.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className=" px-2 py-1 flex items-center justify-center pt-2 my-1"
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
                    <div className="flex grow text-sm">
                      {video.title} ({video.user})
                    </div>
                    <button
                      className="py-1 px-2 items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      onClick={() => removeVideo(video.videoId)}
                    >
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
