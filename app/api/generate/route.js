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

    console.log("📤 Calling HF API with prompt:", prompt);
    console.log("🔑 API Key exists:", !!process.env.HUGGINGFACE_API_KEY);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        headers: { 
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    console.log("📥 Response status:", response.status);

    // Check response status BEFORE parsing JSON
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ HF Error Response:", errorText);
      return Response.json(
        { error: `API Error (${response.status}): ${errorText.substring(0, 100)}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("✅ HF Response:", result);

    const text = result[0]?.generated_text || "No response generated";

    return Response.json({ content: text });
  } catch (error) {
    console.error("🔴 API Error:", error.message);
    return Response.json(
      { error: `Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}