import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateResult = async (prompt) => {
  try {
    const chat = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ SUPPORTED
      messages: [
        {
          role: "system",
          content:
            "You are an expert MERN developer. Reply concisely and clearly.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return JSON.stringify({
      text: chat.choices[0].message.content,
      fileTree: null,
    });

  } catch (error) {
    console.error("Groq Error:", error.message);

    return JSON.stringify({
      text: "AI service temporarily unavailable. Please try again.",
      fileTree: null,
    });
  }
};
