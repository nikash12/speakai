import { atomFamily, selectorFamily } from "recoil";

export type Word = {
  word: string;
  start: number;
  end: number;
  confidence: number;
};
const audioSchema = atomFamily({
  key: "audioSchema",
  default: (id) => ({
    id,
    transcript: "",
    confidence: 0,
    duration: 0,       
    words: [] as Word[],
    raw: null,
  }),
});


const audioStats = selectorFamily({
  key: "audioStats",
  get: (id) => ({ get }) => {
    const audio = get(audioSchema(id));
    const { transcript, duration } = audio;

    const safeTranscript = transcript || "";
    const wordCount = safeTranscript.trim().split(/\s+/).length || 0;

    const wordsPerMinute =
      typeof duration === "number" && duration > 0
        ? (wordCount / duration) * 60
        : 0;

    const fillerWords = [
      "um", "uh", "like", "you know", "so",
      "actually", "basically", "right", "I mean"
    ];

    const fillerWordCount = fillerWords.reduce((count, filler) => {
      const regex = new RegExp(`\\b${filler}\\b`, "gi");
      return count + (safeTranscript.match(regex)?.length || 0);
    }, 0);

    const totalDuration =
      typeof duration === "number" && !isNaN(duration)
        ? `${duration.toFixed(2)}s`
        : "0.00s";

    return {
      wordsPerMinute: Math.round(wordsPerMinute),
      fillerWordCount,
      totalDuration,
      confidence: audio.confidence || 0,
    };
  },
});

export { audioSchema, audioStats };
