import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { audioSchema, audioStats } from "@/recoil"; // ← include audioStats
import { useRecoilValue } from "recoil";

interface AudioCardProps {
  id: string;
}

export default function AudioCard({ id }: AudioCardProps) {
  const info = useRecoilValue(audioSchema(id));
  const stats = useRecoilValue(audioStats(id));



  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Speech Analysis</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="transcript" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          {/* Transcript Tab */}
          <TabsContent value="transcript">
            <p className="text-muted-foreground text-sm italic">
              "{info.transcript || 'No transcript available.'}"
            </p>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span>Duration:</span>
              <span>{stats.totalDuration}</span>
              <span>WPM:</span>
              <span>{stats.wordsPerMinute}</span>
              <span>Filler Words:</span>
              <span>{stats.fillerWordCount}</span>
              <span>Confidence:</span>
              <span>
                {(stats.confidence * 100).toFixed(1)}%
                <Progress value={stats.confidence * 100} className="mt-1" />
              </span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
