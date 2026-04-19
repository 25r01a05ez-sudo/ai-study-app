export async function POST(req) {
  try {
    const { topic, materialType } = await req.json();

    if (!topic || !materialType) {
      return Response.json(
        { error: "Missing topic or materialType" },
        { status: 400 }
      );
    }

    const prompts = {
      summary: `Create a study summary about "${topic}" in 150 words.`,
      quiz: `Create 3 quiz questions about "${topic}" with answers.`,
      notes: `Create study notes for "${topic}".`,
      flashcards: `Create 5 flashcard Q&A about "${topic}".`,
    };

    const prompt = prompts[materialType] || prompts.summary;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: prompt,
        stream: false,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Ollama Error:", result);
      return Response.json(
        { error: result.error || "Failed to generate material" },
        { status: response.status }
      );
    }

    const text = result.response || "No response";

    return Response.json({ content: text });
  } catch (error) {
    console.error("🔴 API Error:", error.message);
    return Response.json(
      { error: "Make sure Ollama is running: ollama serve" },
      { status: 500 }
    );
  }
}