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
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    console.log("🔑 API Key Set?", !!apiKey);
    console.log("📝 Prompt:", prompt);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        headers: { 
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    console.log("📥 Response Status:", response.status);
    console.log("📥 Response Headers:", Object.fromEntries(response.headers));

    const errorText = await response.text();
    console.log("📥 Raw Response:", errorText.substring(0, 300));

    if (!response.ok) {
      return Response.json(
        { error: `API Error (${response.status}): ${errorText.substring(0, 100)}` },
        { status: response.status }
      );
    }

    // Try to parse as JSON
    try {
      const result = JSON.parse(errorText);
      const text = result[0]?.generated_text || "No response";
      return Response.json({ content: text });
    } catch (e) {
      return Response.json(
        { error: `Failed to parse response: ${e.message}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("🔴 API Error:", error.message);
    return Response.json(
      { error: error.message || "Failed to generate material" },
      { status: 500 }
    );
  }
}