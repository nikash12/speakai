import { useAudioRecorder } from "../../hooks/useAudioRecorder.tsx";
import { Button } from "@/components/ui/button";
import { audioSchema } from "@/recoil.ts";
import { Mic, MicOff, Upload } from "lucide-react";
import {  useSetRecoilState } from "recoil";
import WaveformPlayer from "../ui/waveform.tsx";

export default function Recorder() {
  const { startRecording, stopRecording, isRecording, audioBlob } = useAudioRecorder();
  const setInfo = useSetRecoilState(audioSchema("1"));
  const handleUpload = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");

    const res = await fetch("http://192.168.xx.xx:2001/api/speech/analyze-speech", {
      method: "POST",
      body: formData,
    })
    const data = await res.json();
    console.log(data);
    
    setInfo({
        id: "1",
        transcript: data.results?.channels?.[0]?.alternatives?.[0]?.transcript || "No transcript",
        confidence: data.results?.channels?.[0]?.alternatives?.[0]?.confidence || 0,
        duration: data.metadata?.duration || 0,
        words: data.results?.channels?.[0]?.alternatives?.[0]?.words || [],
        raw: data, // store full for debug
      });
    // console.log(await res.json());
  };

  return (
    <div className="grid gap-6 p-6 rounded-xl shadow-md max-w-md mx-auto mt-10 place-items-center">
      <Button
        variant={isRecording ? "destructive" : "default"}
        size="icon"
        onClick={isRecording ? stopRecording : startRecording}
        className="w-16 h-16 rounded-full"
      >
        {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </Button>
      {isRecording&&<div>Listeninng</div>}
      {audioBlob && (
        <div className="flex flex-col items-center gap-4 w-full">
          {/* <audio controls src={URL.createObjectURL(audioBlob)} className="w-full rounded" /> */}
          <WaveformPlayer audioUrl={URL.createObjectURL(audioBlob)}/>
          <Button onClick={handleUpload} className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Analyze
          </Button>
        </div>
      )}
    </div>
  );
}
