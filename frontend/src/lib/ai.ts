import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateSubtodos(title: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

  const prompt = `
You are a task breakdown assistant.

Break the following goal into actionable subtasks.

Rules:
- Return ONLY valid JSON


Format:
{
  "subtasks": ["task1", "task2"]
}

Goal: ${title}
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch {
    return { subtasks: [] };
  }
}
