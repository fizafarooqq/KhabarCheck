import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  fullName: string
  email: string
  password: string       // stored as bcrypt hash
  role: "user" | "admin"
  status: "active" | "blocked"
  createdAt: Date
}

const UserSchema = new Schema<IUser>({
  fullName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },
  role:      { type: String, enum: ["user", "admin"], default: "user" },
  status:    { type: String, enum: ["active", "blocked"], default: "active" },
  createdAt: { type: Date, default: Date.now },
})

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)