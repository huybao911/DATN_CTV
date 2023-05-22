const mongoose = require("mongoose");

const JobEvent = new mongoose.Schema(
  {
    nameJob: {
      type: String,
      trim: true,
      required: [true, "NameJob is required"],
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    quantityRemaining: {
      type: Number,
    },
    unitPrice: {
      type: Number,
      required: [true, "UnitPrice is required"],
    },
    total: {
      type: Number,
    },
    jobDescription: {
      type: String,
      required: true,
      maxLength: [8000, "Must be no more than 8000 characters"],
    },
    jobRequest : {
      type: String,
      required: true,
      maxLength: [8000, "Must be no more than 8000 characters"],
    },
    benefit  : {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobEvent", JobEvent);
