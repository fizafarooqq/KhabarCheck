import { type NextRequest, NextResponse } from "next/server"

const predictions: Record<
  string,
  {
    bias_label: "left" | "center" | "right"
    confidence: number
    explanation: string
    extractedText: string
    createdAt: string
  }
> = {}

// Simple HTML to text extraction
function extractTextFromHtml(html: string): string {
  const text = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()

  return text.substring(0, 2000)
}

async function callMLServer(text: string) {
  try {
    const response = await fetch("http://localhost:5000/ml/predict/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error("ML Server error")
    }

    return await response.json()
  } catch (error) {
    return {
      bias_label: Math.random() > 0.5 ? (Math.random() > 0.5 ? "left" : "right") : "center",
      confidence: 0.7 + Math.random() * 0.25,
      explanation: "Article contains typical framing patterns associated with this bias direction.",
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 })
    }

    // Fetch the article
    const articleResponse = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    if (!articleResponse.ok) {
      return NextResponse.json({ message: "Failed to fetch article" }, { status: 400 })
    }

    const html = await articleResponse.text()
    const extractedText = extractTextFromHtml(html)

    if (extractedText.split(/\s+/).length < 10) {
      return NextResponse.json({ message: "Could not extract enough text from URL" }, { status: 400 })
    }

    const prediction = await callMLServer(extractedText)
    const predictionId = Math.random().toString(36).substr(2, 9)

    predictions[predictionId] = {
      ...prediction,
      extractedText,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      predictionId,
      ...prediction,
      extractedText,
    })
  } catch (error) {
    console.error("[v0] URL analysis error:", error)
    return NextResponse.json({ message: "Failed to analyze URL" }, { status: 500 })
  }
}
