import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "pages/Home";
import Party from "pages/Party";
import Admin from "pages/Admin";
import VideoPlayer from "components/VideoPlayer";

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
      element: <Home />,
    },
    {
      path: "/party/:code",
      element: <Party />,
    },
    {
      path: "/party/:code/player",
      element: <VideoPlayer />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
