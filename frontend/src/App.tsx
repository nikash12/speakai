import Navbar from "./components/layout/navbar/Navbar"
// import Recorder from "./components/recorder/Recorder"
// import AudioCard from './components/recorder/card'
// import WordFrequencyLineChart from "./components/charts/lineChart"
import UnderBuild from "./components/interview/underBuild"
import Hero from "./components/home/Hero"
function App() {
  return (
    <>
      <Navbar/>
      {/* <Recorder/>
      <AudioCard id="1"/>
      <WordFrequencyLineChart/> */}
      <Hero />

      <UnderBuild/>
    </>
  )
}

export default App
