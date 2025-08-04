import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BarChart3, Loader2 } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { questions, indexSchema, audioSchema } from '@/recoil';

interface MetricCardProps {
  title: string;
  score: number | string;
  subtitle: string;
  content: React.ReactNode;
  actionText?: string;
  isLoading?: boolean;
}

interface VideoData {
  title: string;
  level: string;
  achievement: string;
  rating: string;
  description: string;
  actionPlan: string;
}

interface MetricData {
  answerRelevance: {
    status: string;
    description: string;
  };
  paceOfSpeech: {
    score: number;
    average: number;
    description: string;
  };
  umCounter: {
    count: number;
    average: number;
    description: string;
    percentage: number;
  };
  vocabulary: {
    level: string;
    average: string;
    sophisticated: number;
    smartAccessible: number;
    simple: number;
  };
  powerWord: {
    count: number;
    average: number;
    description: string;
  };
  fillerWords: {
    count: number;
    average: number;
    description: string;
    percentage: number;
  };
}

interface DashboardResponse {
  video: VideoData;
  metrics: MetricData;
}

type QuestionType = {
  question: string;
  idealPoints?: string[];
};

// Transform API response to match component interface
const transformApiResponse = (apiData: any): DashboardResponse => {
  const report = apiData.report || {};
  
  return {
    video: {
      title: report.video?.title || "Interview Feedback Report",
      level: report.video?.level || "Analysis Complete",
      achievement: report.video?.achievement || "SILVER",
      rating: report.video?.rating || "GOOD",
      description: report.video?.description || "Your interview performance has been analyzed across multiple dimensions.",
      actionPlan: report.video?.actionPlan || "Review the detailed feedback below to improve your interview skills."
    },
    metrics: {
      answerRelevance: {
        status: report.metrics?.answerRelevance?.status || "Analyzed",
        description: report.metrics?.answerRelevance?.description || "Your answers have been evaluated for relevance."
      },
      paceOfSpeech: {
        score: report.metrics?.paceOfSpeech?.score || 150,
        average: report.metrics?.paceOfSpeech?.average || 160,
        description: report.metrics?.paceOfSpeech?.description || "Your speech pace has been analyzed."
      },
      umCounter: {
        count: report.metrics?.umCounter?.count || 2,
        average: report.metrics?.umCounter?.average || 3,
        description: report.metrics?.umCounter?.description || "Filler words and hesitations have been counted.",
        percentage: report.metrics?.umCounter?.percentage || 60
      },
      vocabulary: {
        level: report.metrics?.vocabulary?.level || "Professional",
        average: report.metrics?.vocabulary?.average || "Professional",
        sophisticated: report.metrics?.vocabulary?.sophisticated || 30,
        smartAccessible: report.metrics?.vocabulary?.smartAccessible || 60,
        simple: report.metrics?.vocabulary?.simple || 10
      },
      powerWord: {
        count: report.metrics?.powerWord?.count || 12,
        average: report.metrics?.powerWord?.average || 15,
        description: report.metrics?.powerWord?.description || "Your use of impactful language has been analyzed."
      },
      fillerWords: {
        count: report.metrics?.fillerWords?.count || 3,
        average: report.metrics?.fillerWords?.average || 5,
        description: report.metrics?.fillerWords?.description || "Filler word usage has been evaluated.",
        percentage: report.metrics?.fillerWords?.percentage || 50
      }
    }
  };
};

const VideoFeedbackDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get data from Recoil
  const questionList = useRecoilValue(questions);
  const currentIndex = useRecoilValue(indexSchema);

  // API call function
  const fetchDashboardData = async (): Promise<DashboardResponse> => {
    try {
      // Prepare the Q&A data from Recoil state
      const qnaList = questionList.map((q: QuestionType, idx: number) => {
        const raw = localStorage.getItem(`answer-${idx}`);
        let ans = null;

        try {
          if (raw) ans = JSON.parse(raw);
        } catch (e) {
          console.warn(`Invalid JSON for answer-${idx}:`, raw);
        }

        return {
          question: q.question,
          userAnswer: ans?.transcript || '(No valid answer recorded)',
        };
      });

      const prompt = JSON.stringify(qnaList, null, 2);

      // Prepare words data from all audio recordings
      const wordsData = questionList.map((_:any, idx:any) => {
        const raw = localStorage.getItem(`answer-${idx}`);
        let ans = null;

        try {
          if (raw) ans = JSON.parse(raw);
        } catch (e) {
          console.warn(`Invalid JSON for answer-${idx}:`, raw);
        }

        return {
          questionIndex: idx,
          words: ans?.words || [],
          transcript: ans?.transcript || '',
          duration: ans?.duration || 0,
          confidence: ans?.confidence || 0
        };
      });

      const response = await fetch('http://localhost:2001/api/interview/generateFullReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          words: JSON.stringify(wordsData, null, 2)
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData = await response.json();
      console.log('API Response:', apiData);
      
      // Transform the API response to match your component's expected format
      return transformApiResponse(apiData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check if we have questions and answers
        if (!questionList || questionList.length === 0) {
          throw new Error('No questions found');
        }

        const response = await fetchDashboardData();
        setData(response);
        
        // REMOVED: Clean up localStorage after successful report generation
        // Keeping the answers preserved in localStorage/Recoil
        
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRetry = () => {
    setError(null);
    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchDashboardData();
        setData(response);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  };

  const MetricCard: React.FC<MetricCardProps> = ({
    title,
    score,
    subtitle,
    content,
    actionText,
    isLoading = false
  }) => (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">
            {isLoading ? <Skeleton className="h-4 w-32" /> : title}
          </CardTitle>
          {isLoading ? (
            <Skeleton className="h-4 w-4 rounded" />
          ) : (
            <BarChart3 className="h-4 w-4 text-blue-500" />
          )}
        </div>
        <div className="text-xs text-gray-500">
          {isLoading ? <Skeleton className="h-3 w-24" /> : subtitle}
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-3">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ) : (
          <>
            {content}
            {actionText && (
              <Button variant="link" className="mt-4 p-0 h-auto text-blue-600 text-xs">
                {actionText} →
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );

  const CircularProgress: React.FC<{ value: number; size?: number; strokeWidth?: number }> = ({
    value,
    size = 80,
    strokeWidth = 8
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-yellow-500 transition-all duration-300"
          />
        </svg>
      </div>
    );
  };

  const SpeedGauge: React.FC<{ value: number; maxValue: number }> = ({ value, maxValue }) => {
    const percentage = (value / maxValue) * 100;
   
    return (
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-8 border-gray-200 relative">
          <div
            className="absolute inset-0 rounded-full border-8 border-yellow-500"
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${50 + (percentage / 100) * 50}% 0%, 50% 50%)`
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-8 bg-yellow-600 rounded-full transform origin-bottom rotate-45" />
          </div>
        </div>
        <div className="absolute -bottom-2 left-0 right-0 text-center">
          <div className="text-xs text-gray-500">LOW</div>
          <div className="text-xs text-gray-500 absolute right-0">HIGH</div>
        </div>
      </div>
    );
  };

  const LoadingSkeleton: React.FC = () => (
    <Card className="bg-blue-600 text-white">
      <CardContent className="p-6">
        <Skeleton className="h-6 w-3/4 mb-4 bg-white bg-opacity-20" />
        <Skeleton className="h-4 w-48 mb-4 bg-white bg-opacity-20" />
       
        <div className="relative bg-gray-800 rounded-lg mb-4 aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <Skeleton className="h-6 w-16 bg-white bg-opacity-20" />
            <Skeleton className="h-4 w-12 mt-1 bg-white bg-opacity-20" />
          </div>
        </div>

        <Skeleton className="h-4 w-full mb-2 bg-white bg-opacity-20" />
        <Skeleton className="h-4 w-4/5 mb-4 bg-white bg-opacity-20" />
        <Skeleton className="h-3 w-3/4 bg-white bg-opacity-20" />
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Card className="p-6 text-center">
          <CardContent>
            <p className="text-red-600 mb-4">Error: {error}</p>
            <Button onClick={handleRetry}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" className="mb-4 text-blue-600" disabled={isLoading}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Interview
          </Button>
         
          <div className="flex items-center space-x-6 mb-4">
            <Button variant="outline" className="text-blue-600 border-blue-600">
              A.I. Feedback
            </Button>
            <Button variant="ghost">Action Plan</Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Interview Summary */}
          <div className="lg:col-span-1">
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <Card className="bg-blue-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {data?.video.title}
                  </h3>
                  <div className="text-sm mb-4">{data?.video.level}</div>
                 
                  {/* Interview Icon */}
                  <div className="relative bg-gray-800 rounded-lg mb-4 aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <Badge className="bg-gray-300 text-gray-700">{data?.video.achievement}</Badge>
                      <div className="text-sm mt-1">{data?.video.rating}</div>
                    </div>
                  </div>

                  <div className="text-sm mb-4">{data?.video.description}</div>
                  <div className="text-xs">{data?.video.actionPlan}</div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Dashboard Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Answer Relevance */}
              <MetricCard
                title="ANSWER RELEVANCE"
                score=""
                subtitle={data?.metrics.answerRelevance.status || "Analyzing"}
                actionText="LEARN MORE"
                isLoading={isLoading}
                content={
                  <div className="flex flex-col items-center">
                    <BarChart3 className="h-12 w-12 text-blue-500 mb-4" />
                    <p className="text-sm text-center text-gray-600">
                      {data?.metrics.answerRelevance.description}
                    </p>
                  </div>
                }
              />

              {/* Pace of Speech */}
              <MetricCard
                title="PACE OF SPEECH"
                score={data?.metrics.paceOfSpeech.score.toString() || "150"}
                subtitle={`Average Score: ${data?.metrics.paceOfSpeech.average || 160}`}
                actionText="IMPROVE NOW"
                isLoading={isLoading}
                content={
                  <div className="flex flex-col items-center">
                    <SpeedGauge value={data?.metrics.paceOfSpeech.score || 150} maxValue={300} />
                    <div className="mt-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">{data?.metrics.paceOfSpeech.score}</div>
                      <div className="text-xs text-gray-500">WORDS PER MIN</div>
                    </div>
                    <p className="text-xs text-center text-gray-600 mt-2">
                      {data?.metrics.paceOfSpeech.description}
                    </p>
                  </div>
                }
              />

              {/* Um Counter */}
              <MetricCard
                title="UM COUNTER"
                score={data?.metrics.umCounter.count.toString() || "2"}
                subtitle={`Average Score: ${data?.metrics.umCounter.average || 3}`}
                actionText="IMPROVE NOW"
                isLoading={isLoading}
                content={
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <CircularProgress value={data?.metrics.umCounter.percentage || 60} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-yellow-600">{data?.metrics.umCounter.count}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">DISFLUENCIES / 100 WORDS</div>
                    <p className="text-xs text-center text-gray-600 mt-2">
                      {data?.metrics.umCounter.description}
                    </p>
                  </div>
                }
              />

              {/* Vocabulary */}
              <MetricCard
                title="VOCABULARY"
                score={data?.metrics.vocabulary.level || "Professional"}
                subtitle={`Average Score: ${data?.metrics.vocabulary.average || "Professional"}`}
                isLoading={isLoading}
                content={
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="mb-2">
                        <div className="text-xs text-gray-500 mb-1">Sophisticated</div>
                        <Progress value={data?.metrics.vocabulary.sophisticated || 30} className="h-2" />
                      </div>
                      <div className="mb-2">
                        <div className="text-xs text-blue-600 mb-1 font-medium">Smart Accessible Language</div>
                        <Progress value={data?.metrics.vocabulary.smartAccessible || 60} className="h-2" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Simple</div>
                        <Progress value={data?.metrics.vocabulary.simple || 10} className="h-2" />
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="text-2xl">💼</div>
                    </div>
                  </div>
                }
              />

              {/* Power Word */}
              <MetricCard
                title="POWER WORD"
                score={data?.metrics.powerWord.count.toString() || "12"}
                subtitle={`Average Score: ${data?.metrics.powerWord.average || 15}`}
                isLoading={isLoading}
                content={
                  <Card className="bg-blue-600 text-white">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="text-2xl">⚡</div>
                      </div>
                      <div className="text-3xl font-bold mb-1">{data?.metrics.powerWord.count}</div>
                      <div className="text-xs">POWER WORDS</div>
                      <p className="text-xs mt-4">
                        {data?.metrics.powerWord.description}
                      </p>
                    </CardContent>
                  </Card>
                }
              />

              {/* Filler Words */}
              <MetricCard
                title="FILLER WORDS"
                score={data?.metrics.fillerWords.count.toString() || "3"}
                subtitle={`Average Score: ${data?.metrics.fillerWords.average || 5}`}
                actionText="IMPROVE NOW"
                isLoading={isLoading}
                content={
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <CircularProgress value={data?.metrics.fillerWords.percentage || 50} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-yellow-600">{data?.metrics.fillerWords.count}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">FILLER WORDS / 100 WORDS</div>
                    <p className="text-xs text-center text-gray-600 mt-2">
                      {data?.metrics.fillerWords.description}
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoFeedbackDashboard;
