import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { audioSchema } from "@/recoil";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WordFrequencyLineChart() {
  const info = useRecoilValue(audioSchema("1"));
  const words = info.words || [];

  const [chartData, setChartData] = useState<{ time: string; count: number }[]>([]);

  useEffect(() => {
    if (words.length === 0) return;

    // Count how many words occur in each second (rounded)
    const freqMap: Record<number, number> = {};

    words.forEach(({ start }) => {
      const second = Math.floor(start); // round to nearest second
      freqMap[second] = (freqMap[second] || 0) + 1;
    });

    const freqArray = Object.entries(freqMap)
      .map(([second, count]) => ({
        time: `${second}s`,
        count,
      }))
      .sort((a, b) => parseInt(a.time) - parseInt(b.time));

    setChartData(freqArray);
  }, [words]);

  if (chartData.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">Speaking Activity Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
