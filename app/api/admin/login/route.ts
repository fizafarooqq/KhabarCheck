import { type NextRequest, NextResponse } from "next/server"

const users: Map<
  string,
  {
    fullName: string
    email: string
    password: string
    createdAt: string
  }
> = new Map()

// Seed with demo admin
users.set("admin@example.com", {
  fullName: "Admin User",
  email: "admin@example.com",
  password: "password123",
  createdAt: new Date().toISOString(),
})

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const user = users.get(email)
    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Set auth cookie (in production, use secure session management)
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
        fullName: user.fullName,
      },
    })

    response.cookies.set("admin_token", `user_${user.email}`, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ message: "Login failed" }, { status: 500 })
  }
}
