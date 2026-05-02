"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Loader2, BarChart3, History, FileText, LogOut } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isLoggedIn") === "true"
      const email = localStorage.getItem("userEmail") || ""

      setIsLoggedIn(isAuth)
      setUserEmail(email)
      setLoading(false)

      if (!isAuth) {
        router.push("/auth/login")
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userRole")
    router.push("/auth/login")
  }

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
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {userEmail}! Start analyzing articles for bias.</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Analyze Card */}
            <Card
              className="border-border/50 hover:border-border transition cursor-pointer"
              onClick={() => router.push("/analyze")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Analyze Article
                </CardTitle>
                <CardDescription>Check article bias with AI</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Paste a URL or text to instantly detect political bias
                </p>
                <Button className="w-full">Start Analyzing</Button>
              </CardContent>
            </Card>

            {/* History Card */}
            <Card className="border-border/50 hover:border-border transition cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Analysis History
                </CardTitle>
                <CardDescription>Your past analyses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View all your previous article analyses and results
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  View History
                </Button>
              </CardContent>
            </Card>

            {/* Documentation Card */}
            <Card className="border-border/50 hover:border-border transition cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Documentation
                </CardTitle>
                <CardDescription>Learn how it works</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Understand bias detection and how to use KhabarCheck effectively
                </p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/docs">Read Docs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
