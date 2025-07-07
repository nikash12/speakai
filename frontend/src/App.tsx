import Navbar from "./components/layout/navbar/Navbar"
import Recorder from "./components/recorder/Recorder"
import AudioCard from './components/recorder/card'
import WordFrequencyLineChart from "./components/charts/lineChart"
import UnderBuild from "./components/interview/underBuild"
function App() {
  return (
    <>
      <Navbar/>
      <Recorder/>
      <AudioCard id="1"/>
      <WordFrequencyLineChart/>
      <UnderBuild/>
    </>
  )
}

export default App
