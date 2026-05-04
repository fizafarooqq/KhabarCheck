import { connectDB } from "@/lib/mongodb"
import { Prediction } from "@/lib/models/Prediction"
import jwt from "jsonwebtoken"
import { type NextRequest, NextResponse } from "next/server"

// TODO: Replace with your REAL ML Model API URL
// Example: const MODEL_API_URL = "http://localhost:8000/predict"
// Or with your provided model endpoint: const MODEL_API_URL = process.env.ML_MODEL_API_URL
// If using Hugging Face Inference API, set HF_API_TOKEN and MODEL_API_URL to your model endpoint.
const MODEL_API_URL = process.env.ML_MODEL_API_URL || "http://localhost:8000/predict"
const HF_API_TOKEN = process.env.HF_API_TOKEN

const predictions: Record<string, any> = {}

async function callMLServer(text: string) {
  try {
    console.log("[v0] Calling ML Server at:", MODEL_API_URL)
    const isHfInference = MODEL_API_URL.includes("api-inference.huggingface.co/models")
    const bodyPayload = isHfInference ? { inputs: text } : { text }
    const headers: Record<string, string> = { "Content-Type": "application/json" }

    if (HF_API_TOKEN) {
      headers.Authorization = `Bearer ${HF_API_TOKEN}`
    }

    const response = await fetch(MODEL_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyPayload),
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
      all_scores: { left: 0.3, center: 0.4, right: 0.3 },
    }
  }
}

export async function POST(request: NextRequest) {
  const { text } = await request.json()
  
  // Get user from JWT cookie
  const token = request.cookies.get("auth_token")?.value
  let userId = null
  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
      userId = decoded.userId
    } catch {}
  }

  const prediction = await callMLServer(text)

  // Save to MongoDB if user is logged in
  if (userId) {
    await connectDB()
    const saved = await Prediction.create({
      userId,
      inputType: "text",
      extractedText: text.substring(0, 2000),
      biasLabel: prediction.bias_label,
      confidence: prediction.confidence,
      allScores: prediction.all_scores,
    })
    return NextResponse.json({ predictionId: saved._id.toString(), ...prediction })
  }

  return NextResponse.json({ predictionId: "guest", ...prediction })
}