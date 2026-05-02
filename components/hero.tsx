"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie
      setIsLoggedIn(cookies.includes("auth_token"))
    }

    checkAuth()
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
            AI-Powered Political Bias Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Analyze news articles instantly to detect left, center, or right-wing bias. Get confidence scores and
            detailed explanations powered by advanced AI.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          {isLoggedIn ? (
            <>
              <Button asChild size="lg">
                <Link href="/analyze?tab=url">Analyze via URL</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/analyze?tab=text">Paste Text</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild size="lg">
                <Link href="/auth/signup">Create Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </>
          )}
          <Button asChild variant="ghost" size="lg">
            <Link href="/docs">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
