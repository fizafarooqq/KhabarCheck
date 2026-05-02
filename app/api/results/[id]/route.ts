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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  if (predictions[id]) {
    return NextResponse.json(predictions[id])
  }

  // Return mock data for any ID in demo
  return NextResponse.json({
    bias_label: Math.random() > 0.5 ? (Math.random() > 0.5 ? "left" : "right") : "center",
    confidence: 0.7 + Math.random() * 0.25,
    explanation: "Article contains political framing patterns typical of this bias direction.",
    extractedText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  })
}
