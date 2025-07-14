import { Button } from "@/components/ui/button";
import { audioSchema, indexSchema } from "@/recoil.ts";
import { Mic, MicOff, Upload } from "lucide-react";
import {  useRecoilState } from "recoil";
import { useAudioRecorder } from "@/hooks/useAudioRecorder.tsx";
import { useEffect, useState } from "react";

export default function RecorderUtil() {
  const { startRecording, stopRecording, isRecording, audioBlob,setAudioBlob } = useAudioRecorder();
  const [index,setIndex] = useRecoilState(indexSchema)
  const [info,setInfo] = useRecoilState(audioSchema(String(index)));
  const [transcriptStatus,setTranscriptStatus] = useState(false)
  const handleUpload = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");

    const res = await fetch("http://192.168.29.237:2001/api/speech/analyze-speech", {
      method: "POST",
      body: formData,
    })
    
    setTranscriptStatus(true);
    const data = await res.json();
    console.log(info);
    
    setInfo({
        id: index,
        transcript: data.results?.channels?.[0]?.alternatives?.[0]?.transcript || "No transcript",
        confidence: data.results?.channels?.[0]?.alternatives?.[0]?.confidence || 0,
        duration: data.metadata?.duration || 0,
        words: data.results?.channels?.[0]?.alternatives?.[0]?.words || [],
      });
    // console.log(await res.json());
  };
  useEffect(() => {
    if (audioBlob) {
      handleUpload();
    }
  }, [audioBlob]);
  function handleRespond(){
    if(!info)return
    setIndex(index+1)
    setAudioBlob(null)
    setTranscriptStatus(false)
    //...
  }

  return (
    <div className="grid gap-6 p-6 rounded-xl shadow-md max-w-md mx-auto mt-10 place-items-center ">
      <Button
        variant={isRecording ? "destructive" : "default"}
        size="icon"
        onClick={() => {
          if (isRecording) {
            stopRecording();
            handleUpload();
          } else {
            startRecording();
          }
        }}
        className="w-16 h-16 rounded-full "
      >
        {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </Button>
      
      {isRecording&&<div>Listeninng</div>}
      <h1>{info.transcript}</h1>
      {transcriptStatus&&<Button onClick={handleRespond}>Respond</Button>}
    </div>
  );
}
