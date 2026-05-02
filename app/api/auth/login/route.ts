import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail } from "@/lib/shared-users"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = findUserByEmail(email)
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // TODO: Use JWT tokens in production
    // import jwt from 'jsonwebtoken'
    // const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })

    const response = NextResponse.json(
      {
        success: true,
        user: {
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      },
      { status: 200 },
    )

    response.cookies.set("auth_token", `${user.email}:${user.role}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
