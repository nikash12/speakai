import { ThemeProvider } from "@/providers/theme-provider"
import Navbar from "./components/layout/navbar/Navbar"
import Recorder from "./components/recorder/Recorder"


function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Navbar/>
      <Recorder/>
    </ThemeProvider>
  )
}

export default App
