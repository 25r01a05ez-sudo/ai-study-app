export async function POST(req) {
  try {
    if (!process.env.FEATHERLESS_API_KEY) {
      console.error("❌ FEATHERLESS_API_KEY is not set in environment variables");
      return Response.json(
        { error: "Server configuration error: FEATHERLESS_API_KEY is missing. Please add it to your .env.local file." },
        { status: 500 }
      );
    }

    const { topic, materialType } = await req.json();

    if (!topic || !materialType) {
      return Response.json(
        { error: "Missing topic or materialType" },
        { status: 400 }
      );
    }

    const prompts = {
      summary: `Create a detailed study summary about "${topic}" with 10-15 key points. Format with clear sections and bullet points.`,
      quiz: `Create 10 challenging quiz questions about "${topic}" with detailed answers. Format: Q: [question]\nA: [answer]`,
      notes: `Create comprehensive study notes for "${topic}" with 10-15 main topics and subtopics. Use clear formatting with headers and bullet points.`,
      flashcards: `Create 10 flashcard Q&A pairs about "${topic}". Format each as:\nQ: [question]\nA: [answer]\n`,
    };

    const prompt = prompts[materialType] || prompts.summary;

    console.log("📤 Calling Featherless AI API with prompt:", prompt);

    const response = await fetch("https://api.featherless.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.FEATHERLESS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "system",
            content: "You are an expert study material generator. Provide detailed, well-formatted content.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    console.log("📥 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Featherless AI Error Response:", errorText);
      return Response.json(
        { error: `API Error (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("✅ Featherless AI Response:", result);

    const content = result.choices?.[0]?.message?.content || "No response generated";

    return Response.json({ content });
  } catch (error) {
    console.error("🔴 API Error:", error.message);
    return Response.json(
      { error: `Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}