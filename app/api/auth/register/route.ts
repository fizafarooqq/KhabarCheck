import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/lib/models/User"

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password, confirmPassword } = await request.json()

    if (!fullName || !email || !password || !confirmPassword)
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    if (password !== confirmPassword)
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
    if (password.length < 8)
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })

    await connectDB()

    const exists = await User.findOne({ email: email.toLowerCase() })
    if (exists)
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })

    const hashedPassword = await bcrypt.hash(password, 12)
    await User.create({ fullName, email: email.toLowerCase(), password: hashedPassword })

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}