import { createBrowserRouter } from "react-router-dom"
import App from "./App"


 const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { index: true, element: null }, //Not ready
      { path: "docs", element: null }, //Not ready
    ],
  },
  {
    path: "*",
    element: null,
  },
])

export default router;