import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "pages/Home";
import Party from "pages/Party";
import Admin from "pages/Admin";
import { VideoQueueProvider } from "contexts/VideoQueueContext";
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/party/:code",
      element: <Party/>,
    },
    {
      path: "/admin",
      element: <Admin/>,
    },
  ]);

  return (
    <VideoQueueProvider>
      <RouterProvider router={router} />
    </VideoQueueProvider>
  );
};

export default App;
