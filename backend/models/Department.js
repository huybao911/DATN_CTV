const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nameDepartment: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Name Department is required"],
    },
    keyDepartment: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Key Department is required"],
    },
   
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Department", userSchema);
