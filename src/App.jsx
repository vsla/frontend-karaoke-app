import React from "react";
import { VideoQueueProvider } from "./contexts/VideoQueueContext";
import VideoSearch from "./components/VideoSearch";
import VideoQueue from "./components/VideoQueue";
// import { TouchBackend } from "react-dnd-touch-backend";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
  // const [width, setWidth] = useState(window.innerWidth);

  // function handleWindowSizeChange() {
  //   setWidth(window.innerWidth);
  // }

  // useEffect(() => {
  //   window.addEventListener("resize", handleWindowSizeChange);
  //   return () => {
  //     window.removeEventListener("resize", handleWindowSizeChange);
  //   };
  // }, []);

  // const isMobile = width <= 768;

  return (
    <VideoQueueProvider>
      <div>
        <h1>Karaokê</h1>
        <VideoSearch />
        <VideoQueue />
      </div>
    </VideoQueueProvider>
  );
};

export default App;
