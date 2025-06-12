import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI("AIzaSyB2lp7pL5zc2sUGKBdrkZQSeMGFMzbcfHA")

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `You are a warm, empathetic love and relationship advisor AI assistant for the "Tush Love Calculator" website. Your expertise includes:

- Relationship advice and guidance
- Dating tips and strategies  
- Love compatibility insights
- Communication improvement
- Conflict resolution in relationships
- Emotional support during breakups
- Marriage and commitment guidance
- Self-love and personal growth
- Understanding love languages
- Building healthy relationships

Context: This is a romantic website that helps people calculate love compatibility, provides relationship challenges, love horoscopes, and relationship tools. Users come here seeking love advice and relationship guidance.

Always respond with:
- Empathy and understanding
- Practical, actionable relationship advice
- Positive and encouraging tone
- Relevant questions to help users reflect on their relationships
- Appropriate use of heart emojis (💕, 💖, 💝, ✨, 🌹) but don't overuse them
- Keep responses conversational and supportive
- Focus on love, relationships, dating, and emotional well-being

If asked about topics completely unrelated to love/relationships, gently redirect back to relationship matters while being helpful.

User message: ${message}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Gemini AI error:", error)
    return NextResponse.json(
      {
        error:
          "I'm having trouble connecting right now, but I'm here for you! 💕 Please try asking your relationship question again in a moment.",
      },
      { status: 500 },
    )
  }
}
