"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Suspense } from "react"
import { AnalyzeForm } from "@/components/analyze-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Loader2 } from "lucide-react"

export default function AnalyzePage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isAuth = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(isAuth)
    setLoading(false)

    if (!isAuth) {
      router.push("/auth/login")
    }
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Analyze Article</h1>
            <p className="text-lg text-muted-foreground">Paste a URL or text to detect political bias</p>
          </div>
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <AnalyzeForm />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  )
}
