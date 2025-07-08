import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Interview from "./components/interview/Interview";


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
    path:"/interview",
    element:<Interview/>
  },
  {
    path: "*",
    element: null,
  },
  
])

export default router;