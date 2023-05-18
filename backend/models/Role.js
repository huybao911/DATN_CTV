const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    nameRole: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Role is required"],
    },
    keyRole:{
      type: String,
      trim: true,
      required: [true, "Key is required"],
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);



module.exports = new mongoose.model("Role", roleSchema);
