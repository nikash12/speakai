import { ThemeProvider } from "@/providers/theme-provider"
import Navbar from "./components/layout/navbar/Navbar"
import Recorder from "./components/recorder/Recorder"
import AudioCard from './components/recorder/card'
import WordFrequencyLineChart from "./components/charts/lineChart"
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Navbar/>
      <Recorder/>
      <AudioCard id="1"/>
      <WordFrequencyLineChart/>
    </ThemeProvider>
  )
}

export default App
