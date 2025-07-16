import { useRef, useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

export default function CameraUtil() {
  const previewRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // Trigger webcam + mic permission + live preview
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (previewRef.current) {
          previewRef.current.srcObject = mediaStream;
        }
      })
      .catch((err) => {
        console.error("Permission error:", err);
      });

    return () => {
      // Clean up camera stream when component unmounts
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* 👀 Live Preview */}
      <video
        ref={previewRef}
        autoPlay
        muted
        playsInline
        className="w-[80%] h-[240px] rounded-md border"
      />

      {/* 🎥 Actual Recording */}
      <ReactMediaRecorder
        video
        audio
        blobPropertyBag={{ type: 'video/webm' }}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-500">Status: {status}</p>

            <div className="flex gap-2">
              <button
                onClick={startRecording}
                className="bg-green-500 px-4 py-2 rounded text-white"
              >
                Start Recording
              </button>
              <button
                onClick={stopRecording}
                className="bg-red-500 px-4 py-2 rounded text-white"
              >
                Stop Recording
              </button>
            </div>

            {mediaBlobUrl && (
              <video
                src={mediaBlobUrl}
                controls
                autoPlay
                loop
                className="w-[320px] h-[240px] rounded-md border mt-2"
              />
            )}
          </div>
        )}
      />
    </div>
  );
}
