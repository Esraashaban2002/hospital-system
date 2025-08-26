const mongoose = require("mongoose");
const CriticalAlertSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
    required: true,
  },
  nurseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurses",
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["high", "medium", "low"],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("CriticalAlert", CriticalAlertSchema);