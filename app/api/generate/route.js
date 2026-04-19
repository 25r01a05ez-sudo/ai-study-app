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

    // Using Hugging Face API (free tier)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("HF Error:", result);
      return Response.json(
        { error: result.error?.[0] || "Failed to generate material" },
        { status: response.status }
      );
    }

    const text = result[0]?.generated_text || "No response";

    return Response.json({ content: text });
  } catch (error) {
    console.error("🔴 API Error:", error.message);
    return Response.json(
      { error: error.message || "Failed to generate material" },
      { status: 500 }
    );
  }
}