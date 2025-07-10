const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "lawyer", "client"],
      default: "client",
    },
    name: { type: String },
    username: { type: String, unique: true, sparse: true },
    status: {
      type: String,
      enum: ["active", "hold"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
