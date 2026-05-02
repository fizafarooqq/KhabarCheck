import { type NextRequest, NextResponse } from "next/server"

interface SignupBody {
  fullName: string
  email: string
  password: string
}

// Mock user storage - replace with database
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
    const body: SignupBody = await request.json()
    const { fullName, email, password } = body

    // Validation
    if (!fullName || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Check if user exists
    if (users.has(email)) {
      return NextResponse.json({ message: "Email already registered" }, { status: 409 })
    }

    // Create user (in production, hash password with bcrypt)
    users.set(email, {
      fullName,
      email,
      password, // In production: await bcrypt.hash(password, 10)
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
