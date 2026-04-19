export async function POST(req) {
  try {
    const { topic, materialType } = await req.json();

    if (!topic || !materialType) {
      return Response.json(
        { error: "Missing topic or materialType" },
        { status: 400 }
      );
    }

    // Mock data for testing - expanded content
    const mockResponses = {
      summary: `Study Summary: ${topic}\n\n${topic} is a fundamental concept that plays a crucial role in modern society. Understanding ${topic} requires a deep dive into its core principles and applications.\n\nKey Concepts:\n1. Definition: ${topic} refers to a broad field of study with multiple dimensions.\n2. Historical Context: The development of ${topic} has evolved significantly over time.\n3. Core Principles: The foundation of ${topic} is built on scientific methodologies.\n4. Practical Applications: ${topic} has numerous real-world uses across industries.\n5. Current Trends: Modern approaches to ${topic} emphasize innovation and efficiency.\n6. Future Prospects: ${topic} is expected to grow and evolve in the coming years.\n7. Interdisciplinary Nature: ${topic} intersects with multiple fields of study.\n8. Challenges: Understanding ${topic} presents unique obstacles and learning opportunities.\n9. Best Practices: Experts recommend certain approaches when studying ${topic}.\n10. Conclusion: Mastering ${topic} requires continuous learning and practical experience.`,
      
      quiz: `Quiz on ${topic}:\n\n1. What is the primary definition of ${topic}?\nAnswer: ${topic} is a comprehensive field that encompasses multiple related concepts and applications.\n\n2. How has ${topic} evolved historically?\nAnswer: ${topic} has undergone significant transformations due to technological and scientific advancements.\n\n3. What are the core principles of ${topic}?\nAnswer: The core principles include systematic analysis, practical application, and continuous improvement.\n\n4. What are the real-world applications of ${topic}?\nAnswer: ${topic} is applied across various industries including technology, science, and business.\n\n5. What challenges exist in studying ${topic}?\nAnswer: Key challenges include complexity, rapid changes, and the need for multidisciplinary knowledge.\n\n6. What are the current trends in ${topic}?\nAnswer: Current trends focus on automation, sustainability, and innovative solutions.\n\n7. How does ${topic} relate to other fields?\nAnswer: ${topic} intersects with multiple disciplines, creating opportunities for collaborative research.\n\n8. What future developments are expected in ${topic}?\nAnswer: Future developments include advanced technologies, improved methodologies, and broader applications.\n\n9. What skills are essential for mastering ${topic}?\nAnswer: Essential skills include critical thinking, technical knowledge, and practical experience.\n\n10. How can one stay updated with ${topic}?\nAnswer: Staying updated involves continuous learning through courses, research, and professional networks.`,
      
      notes: `Study Notes on ${topic}:\n\nIntroduction:\n- ${topic} is an important field of study\n- It combines theoretical knowledge with practical application\n- Understanding ${topic} is essential for modern professionals\n\nKey Concepts:\n1. Foundational Elements: The basics of ${topic} start with understanding core definitions\n2. Theoretical Framework: ${topic} is built on established scientific principles\n3. Practical Implementation: Real-world application of ${topic} concepts\n4. Advanced Topics: Deeper understanding of specialized areas within ${topic}\n\nApplications:\n- Industry Applications: How ${topic} is used in various sectors\n- Business Integration: Incorporating ${topic} into business strategies\n- Research Applications: Using ${topic} in academic research\n- Technology Integration: Digital tools and platforms for ${topic}\n\nBest Practices:\n- Always verify information from reliable sources\n- Apply critical thinking when analyzing ${topic}\n- Engage in continuous learning and skill development\n- Collaborate with experts and peers\n- Stay updated with latest developments\n\nConclusion:\n- ${topic} is an evolving field with continuous growth\n- Mastery requires dedication and ongoing education\n- Practical experience combined with theoretical knowledge is essential`,
      
      flashcards: `Flashcard Set on ${topic}:\n\nFlashcard 1:\nQ: What is the definition of ${topic}?\nA: ${topic} is a comprehensive concept that encompasses multiple related areas of study and practice.\n\nFlashcard 2:\nQ: Why is ${topic} important?\nA: ${topic} is important because it forms the foundation for understanding modern practices and technologies.\n\nFlashcard 3:\nQ: What are the main principles of ${topic}?\nA: The main principles include systematic approach, evidence-based reasoning, and practical application.\n\nFlashcard 4:\nQ: How is ${topic} applied in industry?\nA: ${topic} is applied through various methodologies, tools, and best practices specific to each sector.\n\nFlashcard 5:\nQ: What skills do you need to master ${topic}?\nA: Essential skills include analytical thinking, technical knowledge, communication, and practical experience.\n\nFlashcard 6:\nQ: What are current trends in ${topic}?\nA: Current trends include digitalization, automation, sustainability, and innovative problem-solving approaches.\n\nFlashcard 7:\nQ: How does ${topic} relate to other fields?\nA: ${topic} has interdisciplinary connections with science, technology, business, and social sciences.\n\nFlashcard 8:\nQ: What challenges exist in ${topic}?\nA: Challenges include rapid changes, complexity, need for continuous learning, and integration across disciplines.\n\nFlashcard 9:\nQ: What are future prospects for ${topic}?\nA: Future prospects include expansion of applications, new technological integrations, and deeper understanding.\n\nFlashcard 10:\nQ: How can you stay current with ${topic}?\nA: Stay current through professional development, research, networking, and engagement with expert communities.`,
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