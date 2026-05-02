const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

interface AnalysisRequest {
  url?: string
  text?: string
}

interface AnalysisResponse {
  predictionId: string
  bias_label: "left" | "center" | "right"
  confidence: number
  explanation: string
  extractedText: string
}

export const apiClient = {
  async analyzeText(text: string): Promise<AnalysisResponse> {
    const response = await fetch(`${API_BASE}/analyze/text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
    return response.json()
  },

  async analyzeUrl(url: string): Promise<AnalysisResponse> {
    const response = await fetch(`${API_BASE}/analyze/url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
    return response.json()
  },

  async getResults(id: string): Promise<AnalysisResponse> {
    const response = await fetch(`${API_BASE}/results/${id}`)
    return response.json()
  },
}
