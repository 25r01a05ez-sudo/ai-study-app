export async function POST(req) {
  try {
    const { topic, materialType } = await req.json();

    if (!topic || !materialType) {
      return Response.json(
        { error: "Missing topic or materialType" },
        { status: 400 }
      );
    }

    // Mock data for testing
    const mockResponses = {
      summary: `Study Summary: ${topic}\n\nThis is a comprehensive overview of ${topic}. Key points include understanding the fundamentals, practical applications, and real-world examples. ${topic} is an important concept that plays a significant role in modern society.`,
      quiz: `Quiz on ${topic}:\n\n1. What is ${topic}?\nAnswer: ${topic} is a fundamental concept.\n\n2. How is ${topic} applied?\nAnswer: ${topic} has many practical applications.\n\n3. Why is ${topic} important?\nAnswer: Understanding ${topic} helps in problem-solving.`,
      notes: `Study Notes on ${topic}:\n- Introduction to ${topic}\n- Key concepts and definitions\n- Real-world applications\n- Practice problems\n- Conclusion`,
      flashcards: `Flashcard 1:\nQ: Define ${topic}\nA: ${topic} is a concept that...\n\nFlashcard 2:\nQ: Give an example of ${topic}\nA: An example would be...`,
    };

    const content = mockResponses[materialType] || mockResponses.summary;

    return Response.json({ content });
  } catch (error) {
    console.error("🔴 API Error:", error.message);
    return Response.json(
      { error: error.message || "Failed to generate material" },
      { status: 500 }
    );
  }
}