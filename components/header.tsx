"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X } from "lucide-react"

export function Header() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ email: string; fullName: string; role: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const cookies = document.cookie
        if (cookies.includes("auth_token")) {
          // Parse user from cookie or fetch from API
          const authCookie = cookies
            .split("; ")
            .find((c) => c.startsWith("auth_token="))
            ?.split("=")[1]

          if (authCookie) {
            const [email, role] = authCookie.split(":")
            setIsLoggedIn(true)
            setUser({ email, fullName: email.split("@")[0], role })
          }
        }
      } catch (error) {
        console.error("[v0] Auth check error:", error)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setIsLoggedIn(false)
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">K</span>
          </div>
          <span className="font-bold text-xl">KhabarCheck</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {isLoggedIn && (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition">
                Dashboard
              </Link>
              <Link href="/analyze" className="text-sm font-medium hover:text-primary transition">
                Analyze
              </Link>
            </>
          )}
          <Link href="/docs" className="text-sm font-medium hover:text-primary transition">
            Documentation
          </Link>
          {user?.role === "admin" && (
            <Link href="/admin/dashboard" className="text-sm font-medium hover:text-primary transition">
              Admin
            </Link>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn && user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
              <Button size="sm" variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth/signup">Create Account</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden ml-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {menuOpen && (
        <div className="md:hidden border-t border-border p-4 space-y-2">
          {isLoggedIn && (
            <>
              <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                Dashboard
              </Link>
              <Link href="/analyze" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                Analyze
              </Link>
            </>
          )}
          <Link href="/docs" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
            Documentation
          </Link>
          {user?.role === "admin" && (
            <Link href="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
              Admin
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
