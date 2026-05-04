import mongoose, { Schema, Document } from "mongoose"

export interface IPrediction extends Document {
  userId:       mongoose.Types.ObjectId
  inputType:    "text" | "url"
  source:       string
  extractedText: string
  biasLabel:    "left" | "center" | "right"
  confidence:   number
  allScores:    { left: number; center: number; right: number }
  createdAt:    Date
}

const PredictionSchema = new Schema<IPrediction>({
  userId:       { type: Schema.Types.ObjectId, ref: "User", required: true },
  inputType:    { type: String, enum: ["text", "url"], required: true },
  source:       { type: String, default: "" },
  extractedText:{ type: String, required: true },
  biasLabel:    { type: String, enum: ["left", "center", "right"], required: true },
  confidence:   { type: Number, required: true },
  allScores:    { left: Number, center: Number, right: Number },
  createdAt:    { type: Date, default: Date.now },
})

export const Prediction = mongoose.models.Prediction || 
  mongoose.model<IPrediction>("Prediction", PredictionSchema)