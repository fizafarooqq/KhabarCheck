import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/lib/models/User"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    if (!email || !password)
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })

    await connectDB()

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    if (user.status === "blocked")
      return NextResponse.json({ error: "Account is blocked" }, { status: 403 })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    const response = NextResponse.json({
      success: true,
      user: { email: user.email, fullName: user.fullName, role: user.role },
    })

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}