import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Interview from "./components/interview/Interview";
import Live from "./components/live/live";
import GenerateReport from "./components/report/Report";
import Dynamic from "./components/dynamic/dynamic";
import { GameMain } from "./components/gamification/GameMain";
import Login from "./pages/login";
import Signup from "./pages/signup";


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
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/interview",
    element:<Interview/>
  },
  {
    path:"/live",
    element:<Live/>
  },
  {
    path:"/report",
    element:<GenerateReport/>
  },
  {
    path:"/dynamic",
    element:<Dynamic/>
  },
  {
    path:"/game/modes",
    element:<GameMain/>
  },
  {
    path: "*",
    element: null,
  },
  
])

export default router;