// components/WaveformPlayer.tsx
import { useRef, useMemo, useCallback } from "react"
import { useWavesurfer } from "@wavesurfer/react"
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js"

export default function WaveformPlayer({ audioUrl }: { audioUrl: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    height: 100,
    url: audioUrl,
    plugins: useMemo(() => [Timeline.create()], []),
  })

  const togglePlay = useCallback(() => {
    wavesurfer?.playPause()
  }, [wavesurfer])

  return (
    <div className="w-full">
      <div ref={containerRef} />
      <div className="flex gap-4 mt-2">
        <button onClick={togglePlay} className="px-4 py-2 rounded bg-blue-500 text-white">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <span>{formatTime(currentTime)}</span>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60)
  const sec = Math.floor(seconds % 60)
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}
