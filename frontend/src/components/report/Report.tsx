import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { questions } from '@/recoil';

type QuestionType = {
  question: string;
  idealPoints?: string[];
};

type ReportItem = {
  question: string;
  userAnswer: string;
  feedback: string;
};

export default function GenerateReport() {
  const questionList = useRecoilValue(questions);
  const [report, setReport] = useState<ReportItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerateReport() {
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

    try {
      setLoading(true);
      setError('');
      const res = await fetch('http://localhost:2001/api/interview/generateReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (Array.isArray(data.report)) {
        setReport(data.report);
      } else {
        setError('Unexpected response format from the server.');
      }
    } catch (err) {
      console.error('Failed to generate report:', err);
      setError('Failed to generate report.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <Button onClick={handleGenerateReport} disabled={loading}>
        {loading ? 'Generating Report...' : 'Generate Interview Report'}
      </Button>

      {error && (
        <p className="mt-4 text-red-600 text-sm">{error}</p>
      )}

      {report && report.length > 0 && (
        <div className="mt-6 space-y-6">
          {report.map((item, index) => (
            <Card key={index} className=" shadow-md rounded-lg">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Q{index + 1}: {item.question}</h3>
                <p className="mb-2"><span className="font-medium">Your Answer:</span> {item.userAnswer}</p>
                <p className="text-green-700 whitespace-pre-wrap"><span className="font-medium">Feedback:</span> {item.feedback}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
