import { type NextRequest, NextResponse } from "next/server"
import { createUser, userExists } from "@/lib/shared-users"

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password, confirmPassword } = await request.json()

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if user exists
    if (userExists(email)) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Create user
    createUser(email, fullName, password)

    // TODO: Add password hashing with bcrypt before deploying
    // import bcrypt from 'bcryptjs'
    // const hashedPassword = await bcrypt.hash(password, 10)

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
