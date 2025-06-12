import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      messages: [
        {
          role: "system",
          content: `You are a warm, empathetic love and relationship advisor AI assistant. Your name is "Love Advisor AI" and you specialize in:

- Relationship advice and guidance
- Dating tips and strategies  
- Love compatibility insights
- Communication improvement
- Conflict resolution
- Emotional support during breakups
- Marriage and commitment guidance
- Self-love and personal growth

Always respond with:
- Empathy and understanding
- Practical, actionable advice
- Positive and encouraging tone
- Relevant questions to help users reflect
- Appropriate use of heart emojis (💕, 💖, 💝, ✨, 🌹)

Keep responses conversational, supportive, and focused on love and relationships. If asked about topics outside relationships, gently redirect back to love and relationship matters.`,
        },
        ...messages,
      ],
      temperature: 0.7,
      maxTokens: 500,
    })

    return result.toAIStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(
      JSON.stringify({
        error: "I apologize, but I'm having trouble connecting right now. Please try again in a moment! 💕",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
