"use client"

import { useState, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

type TabType = "url" | "text"

export function AnalyzeForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = (searchParams.get("tab") as TabType) || "url"

  const [activeTab, setActiveTab] = useState<TabType>(initialTab)
  const [url, setUrl] = useState("")
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const validateUrl = (urlString: string) => {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  const handleAnalyzeUrl = useCallback(async () => {
    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }
    if (!validateUrl(url)) {
      setError("Please enter a valid URL")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/analyze/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to analyze URL")
      }

      const data = await response.json()
      router.push(`/results?id=${data.predictionId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [url, router])

  const handleAnalyzeText = useCallback(async () => {
    if (!text.trim()) {
      setError("Please enter some text")
      return
    }
    if (text.split(/\s+/).length < 10) {
      setError("Please enter at least 10 words")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/analyze/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to analyze text")
      }

      const data = await response.json()
      router.push(`/results?id=${data.predictionId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [text, router])

  return (
    <Card className="border-border/50">
      <CardHeader className="border-b border-border/50">
        <CardTitle>Select Analysis Method</CardTitle>
        <CardDescription>Choose how you want to analyze the article</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("url")}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === "url"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            URL Input
          </button>
          <button
            onClick={() => setActiveTab("text")}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === "text"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Text Input
          </button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {activeTab === "url" ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Article URL</label>
                <Input
                  type="url"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                  className="bg-muted/50"
                />
              </div>
              <Button onClick={handleAnalyzeUrl} disabled={loading} className="w-full" size="lg">
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? "Analyzing..." : "Analyze Article"}
              </Button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Article Text</label>
                <Textarea
                  placeholder="Paste the article text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={loading}
                  className="min-h-[200px] bg-muted/50"
                />
                <p className="text-xs text-muted-foreground mt-2">{text.split(/\s+/).filter(Boolean).length} words</p>
              </div>
              <Button onClick={handleAnalyzeText} disabled={loading} className="w-full" size="lg">
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? "Analyzing..." : "Analyze Text"}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
