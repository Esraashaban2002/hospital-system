import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import LayOut from "./LayOut/LayOut";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
