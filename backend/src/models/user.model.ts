import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String },
    schoolId: { type: String },
    profilePicture: { type: String },
    address: { type: String },
    classSection: { type: String }
  },
  {
    timestamps: true,
    collection: "school-management"
  }
);

export const UserModel = model("User", userSchema);

