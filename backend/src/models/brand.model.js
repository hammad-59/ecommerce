import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
  },
  { timestamps: true }
);

export const Brand = mongoose.model("Brand", brandSchema);
