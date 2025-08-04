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

// In your controller file (e.g., interviewController.js)

const generateFullReport = async (req, res) => {
  console.log("Received Full Report request:", req.body);

  // Destructure the stringified JSON from the request body
  const { prompt, words } = req.body;

  if (!prompt || !words) {
    return res.status(400).json({ error: 'Missing prompt or words data' });
  }

  try {
    // 1. Parse the stringified JSON back into objects
    const qnaList = JSON.parse(prompt);
    const wordsData = JSON.parse(words);

    // 2. Combine the parsed data into a single, rich data structure
    const combinedData = qnaList.map((qnaItem, index) => {
      // Find the corresponding words data for the current question
      const correspondingWords = wordsData.find(w => w.questionIndex === index);
      return {
        question: qnaItem.question,
        transcript: correspondingWords?.transcript || qnaItem.userAnswer,
        duration: correspondingWords?.duration || 0,
        words: correspondingWords?.words || [],
      };
    });

    // 3. Dynamically build the input string for the AI from the combined data
    const inputDataString = combinedData.map((item, index) => `
--- Answer ${index + 1} ---
**Question:**
${item.question}

**User's Answer Transcript:**
${item.transcript}

**Speech-to-Text (STT) JSON for this answer:**
${JSON.stringify({ duration: item.duration, words: item.words }, null, 2)}
`).join('\n\n');

    // 4. Use the final prompt to ask for a holistic JSON report
    const text = `You are an expert AI Interview Coach. Your task is to analyze a user's complete set of interview answers and generate a single, detailed, holistic feedback report in JSON format.

You will be given a list of interview questions, the user's answer transcripts, and the detailed speech-to-text (STT) data for each answer.

**YOUR TASK:**
Based on ALL the provided data, generate a single JSON object that summarizes the entire performance. The JSON should have a structure similar to the example below. Analyze recurring strengths, consistent weaknesses, and provide overall scores and recommendations.

**INPUT DATA:**
${inputDataString}

**EXAMPLE JSON OUTPUT STRUCTURE:**
{
  "report": {
    "video": {
      "title": "Holistic Interview Analysis",
      "level": "Overall Performance Review",
      "achievement": "SILVER",
      "rating": "GOOD",
      "description": "A summary of recurring strengths and weaknesses.",
      "actionPlan": "A primary action to focus on."
    },
    "metrics": {
      "answerRelevance": { "status": "Mostly Relevant", "description": "..." },
      "paceOfSpeech": { "score": 155, "average": 160, "description": "Your pace was generally good but varied." },
      "umCounter": { "count": 2.5, "average": 3, "description": "...", "percentage": 70 },
      "vocabulary": { "level": "Smart Accessible", "average": "Smart Accessible", "sophisticated": 30, "smartAccessible": 60, "simple": 10 },
      "powerWord": { "count": 15, "average": 12, "description": "..." },
      "fillerWords": { "count": 3, "average": 4, "description": "...", "percentage": 65 }
    }
  }
}
`;

    // 5. Generate content and send the response
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(text);
    const response = await result.response;
    const textOutput = response.text();

    const cleanText = textOutput
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    const report = JSON.parse(cleanText);
    res.json(report); // Send the parsed report back

  } catch (error) {
    console.error('❌ Error generating report:', error);
    // Check for parsing errors specifically
    if (error instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid JSON format in prompt or words data.' });
    }
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

const generateGameQuestions = async (req, res) => {
    console.log("Received SpeakAI request:", req.body);

    const { mode } = req.body;

    if (!mode) {
        return res.status(400).json({ error: 'Mode is required (friendly, professional, etc.)' });
    }

    // Static default values for generalized hackathon demo
    const title = "a candidate";
    const description = "Core programming, communication, and problem-solving skills for a general software role.";

    let promptIntro = "";
    switch (mode.toLowerCase()) {
        case "friendly":
        case "friendly chat":
            promptIntro = `
Generate a set of EASY and FRIENDLY interview questions for ${title},
applying for a role with the description: ${description}.
The tone should be supportive, beginner-friendly, and encouraging.
Include light HR and soft-skills-based technical questions with basic hints.`;
            break;

        case "professional":
            promptIntro = `
Generate a set of REALISTIC and MODERATE-LEVEL professional interview questions for ${title},
applying for a role with the description: ${description}.
The questions should reflect common industry standards for HR and technical rounds.`;
            break;

        case "strict examiner":
            promptIntro = `
Generate a set of DIFFICULT and CHALLENGING interview questions for ${title},
applying for a role with the description: ${description}.
The questions should be tough and test deep understanding of both HR and technical concepts.`;
            break;

        case "boss level":
            promptIntro = `
Generate a set of EXPERT-LEVEL, FINAL-ROUND style interview questions for ${title},
applying for a role with the description: ${description}.
Questions should be intense, creative, and require critical thinking under pressure.`;
            break;

        default:
            promptIntro = `
Generate a set of generalized interview questions for ${title},
applying for a role with the description: ${description}.`;
            break;
    }

    const finalPrompt = `
${promptIntro}

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
        const result = await model.generateContent(finalPrompt);
        const response = await result.response;
        const textOutput = response.text();
        console.log("🔹 Raw Output:", textOutput);

        const cleanText = textOutput
            .replace(/^```json/, '')
            .replace(/^```/, '')
            .replace(/```$/, '')
            .trim();

        const questions = JSON.parse(cleanText);
        res.json({ questions });
    } catch (error) {
        console.error('❌ Error generating questions:', error);
        res.status(500).json({ error: 'Failed to generate questions' });
    }
};


const dynamicChatHandler = async (req, res) => {
    console.log("📩 SpeakAI request received:", req.body);
    const { title, description, mode, prompt } = req.body;

    if (!prompt || !Array.isArray(prompt)) {
        return res.status(400).json({ error: 'Invalid prompt format. Expected an array of Q&A.' });
    }

    if (mode === "realtime") {
        if (prompt.length >= 5) {
            return res.json({ done: true });
        }

        const contextText = `
You're an AI interviewer conducting a mock interview for the following role:
- **Title**: ${title}
- **Description**: ${description}

Based on the following Q&A history:
${JSON.stringify(prompt, null, 2)}

Your task:
- Ask a new, relevant technical or behavioral question based on the context.
- Don't repeat any previous questions.
- If 5 questions already asked, return { "done": true }

Output JSON format:
{
  "nextQuestion": "Your next tailored interview question here"
}
        `.trim();

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }, generationConfig);
            const result = await model.generateContent(contextText);
            const response = await result.response;
            const cleanText = response.text()
                .replace(/^```json/, '')
                .replace(/^```/, '')
                .replace(/```$/, '')
                .trim();

            const parsed = JSON.parse(cleanText);
            return res.json(parsed);
        } catch (error) {
            console.error('❌ Error generating dynamic question:', error);
            return res.status(500).json({ error: 'Failed to generate dynamic interview question' });
        }
    }

    return res.status(400).json({ error: 'Invalid mode' });
};


export {generateQuestions,generateReport,generateFullReport,dynamicChatHandler,generateGameQuestions}
