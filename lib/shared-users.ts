// TODO: Replace this with MongoDB when you connect your database
// MongoDB connection string: process.env.MONGO_URI = "mongodb+srv://username:password@cluster.mongodb.net/khabarcheck"

interface User {
  fullName: string
  email: string
  password: string
  role: "user" | "admin"
  createdAt: string
}

export const users = new Map<string, User>()

// Seed with demo admin
users.set("admin@example.com", {
  fullName: "Admin User",
  email: "admin@example.com",
  password: "password123",
  role: "admin",
  createdAt: new Date().toISOString(),
})

export function findUserByEmail(email: string) {
  return users.get(email)
}

export function createUser(email: string, fullName: string, password: string) {
  users.set(email, {
    email,
    fullName,
    password,
    role: "user",
    createdAt: new Date().toISOString(),
  })
}

export function userExists(email: string) {
  return users.has(email)
}
