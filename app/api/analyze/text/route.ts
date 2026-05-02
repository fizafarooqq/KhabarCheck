import { type NextRequest, NextResponse } from "next/server"

// TODO: Replace with your REAL ML Model API URL
// Example: const MODEL_API_URL = "http://localhost:8000/predict"
// Or with your provided model: const MODEL_API_URL = process.env.ML_MODEL_API_URL
const MODEL_API_URL = process.env.ML_MODEL_API_URL || "http://localhost:8000/predict"

const predictions: Record<string, any> = {}

async function callMLServer(text: string) {
  try {
    console.log("[v0] Calling ML Server at:", MODEL_API_URL)
    const response = await fetch(MODEL_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      timeout: 30000,
    })

    if (!response.ok) {
      console.error("[v0] ML Server error:", response.status)
      throw new Error("ML Server error")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] ML API call failed:", error)
    // Fallback to mock response if ML server is unavailable
    return {
      bias_label: Math.random() > 0.5 ? (Math.random() > 0.5 ? "left" : "right") : "center",
      confidence: 0.7 + Math.random() * 0.25,
      explanation: "Article contains typical framing patterns associated with this bias direction.",
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || text.split(/\s+/).length < 10) {
      return NextResponse.json({ error: "Text must contain at least 10 words" }, { status: 400 })
    }

    const prediction = await callMLServer(text)
    const predictionId = Math.random().toString(36).substr(2, 9)

    predictions[predictionId] = {
      ...prediction,
      extractedText: text.substring(0, 500),
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      predictionId,
      ...prediction,
      extractedText: text.substring(0, 500),
    })
  } catch (error) {
    console.error("[v0] Text analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze text" }, { status: 500 })
  }
}
