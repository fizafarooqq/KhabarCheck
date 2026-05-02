"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2 } from "lucide-react"

interface BiasResult {
  bias_label: "left" | "center" | "right"
  confidence: number
  explanation: string
  extractedText: string
}

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [result, setResult] = useState<BiasResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) {
      setError("No prediction ID provided")
      setLoading(false)
      return
    }

    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/results/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch results")
        }
        const data = await response.json()
        setResult(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 py-12 px-4 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !result) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error || "No results found"}</AlertDescription>
            </Alert>
            <Button onClick={() => router.push("/analyze")}>Back to Analyzer</Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const getBiasColor = (bias: string) => {
    switch (bias) {
      case "left":
        return { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bias-badge-left" }
      case "right":
        return { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bias-badge-right" }
      default:
        return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", badge: "bias-badge-center" }
    }
  }

  const colors = getBiasColor(result.bias_label)

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <Button variant="ghost" onClick={() => router.push("/analyze")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Analyzer
          </Button>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Bias Classification */}
              <div className={`p-6 rounded-lg border ${colors.bg} ${colors.border}`}>
                <p className="text-sm font-medium text-muted-foreground mb-2">Detected Bias</p>
                <div className="flex items-center justify-between">
                  <h2 className={`text-4xl font-bold capitalize ${colors.text}`}>{result.bias_label}</h2>
                  <span className={`px-4 py-2 rounded-full font-semibold ${colors.badge}`}>
                    {result.bias_label.charAt(0).toUpperCase() + result.bias_label.slice(1)}-wing
                  </span>
                </div>
              </div>

              {/* Confidence Score */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-4">Confidence Score</p>
                <div className="space-y-3">
                  <div className="bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                    <span className="text-sm text-muted-foreground">
                      {result.confidence > 0.8
                        ? "High confidence"
                        : result.confidence > 0.6
                          ? "Medium confidence"
                          : "Low confidence"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Explanation</p>
                <Card className="bg-muted/50 border-border/50">
                  <CardContent className="pt-6">
                    <p className="text-foreground leading-relaxed">{result.explanation}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Extracted Text */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Analyzed Text</p>
                <Card className="bg-muted/50 border-border/50">
                  <CardContent className="pt-6">
                    <p className="text-foreground leading-relaxed line-clamp-6 overflow-y-auto max-h-40">
                      {result.extractedText}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button className="flex-1" onClick={() => router.push("/analyze")}>
                  Analyze Another
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Save Result
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
