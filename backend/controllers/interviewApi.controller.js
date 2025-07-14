// ---- Imports (top of file) ----
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generationConfig = {
    stopSequences: ["\n\n"],
    maxOutputTokens: 512,
    temperature: 1,
    topP: 0.9,
    topK: 40,
};

const generateQuestions = async (req, res) => {
    console.log("Received SpeakAI request:", req.body);

    const { title,  description, mode } = req.body;

    if (!title || !description || !mode) {
        return res.status(400).json({ error: 'All fields are required (name, role, company, interviewType)' });
    }

    const text = `
Generate a set of personalized ${mode} interview questions for a candidate named ${title},
applying for the role description/topics:${description}

The questions should:
- Be relevant to both HR and technical interviews
- Include a variety of behavioral, technical, and communication-based questions
- Output format should be JSON like:
[
  {
    "question": "Tell me about yourself.",
    "idealPoints": ["Mention background", "Highlight skills", "Explain motivation"]
  },
  ...
]
Only return the JSON array of 5–7 questions.
`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }, generationConfig);
        const result = await model.generateContent(text);
        const response = await result.response;
        const textOutput = response.text();
        console.log(response+" "+textOutput);
        
        // Try to parse the JSON response
        const cleanText = textOutput
        .replace(/^```json/, '')  // remove leading ```json
        .replace(/^```/, '')      // fallback if no json lang specified
        .replace(/```$/, '')      // remove trailing ```
        .trim();
        const questions = JSON.parse(cleanText);
        res.json({ questions });
    } catch (error) {
        console.error('❌ Error generating questions:', error);
        res.status(500).json({ error: 'Failed to generate questions' });
    }
};

const generateReport = async (req, res) => {
  console.log("Received SpeakAI request:", req.body);

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  const text = `
You're an experienced interviewer analyzing candidate answers.

For each entry, generate feedback:
- If userAnswer is empty or says "(No valid answer recorded)", clearly note that the question was skipped.
- If answered, provide feedback on quality, depth, clarity, and relevance.
- Mention missing key points.
- Output JSON only in format:

[
  {
    "question": "Tell me about yourself",
    "userAnswer": "Hi I'm Nikash...",
    "feedback": "Good structure, but missed discussing your motivation..."
  }
]

Q&A Data:
${prompt}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }, generationConfig);
    const result = await model.generateContent(text);
    const response = await result.response;
    const textOutput = response.text();

    const cleanText = textOutput
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    const report = JSON.parse(cleanText);
    res.json({ report });
  } catch (error) {
    console.error('❌ Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};



export {generateQuestions,generateReport}
