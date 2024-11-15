import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "pages/Home";
import Party from "pages/Party";
import Admin from "pages/Admin";
import VideoPlayer from "components/VideoPlayer";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "admin/party/:code",
      element: <Party admin={true} />,
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
