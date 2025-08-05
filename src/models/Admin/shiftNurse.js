const mongoose = require("mongoose");

const shiftNurseSchema = new mongoose.Schema({
  nurseId: { type: mongoose.Schema.Types.ObjectId, ref: "Nurses" },
  department: {
    type: String,
    required: [true, "Department is required"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "Shift date is required"],
    validate: {
      validator: function (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Ignore time portion
        return value >= today;
      },
      message: "Shift date cannot be in the past",
    },
  },
  startTime: {
    type: String,
    required: [true, "Start time is required"],
    validate: {
      validator: function (value) {
        // Regex to match HH:mm format (24-hour clock)
        return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
      },
      message: "Start time must be in HH:mm format",
    },
  },

  endTime: {
    type: String,
    required: [true, "End time is required"],
    validate: {
      validator: function (value) {
        // Regex to match HH:mm format (24-hour clock)
        return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
      },
      message: "End time must be in HH:mm format",
    },
  },
  shiftType: {
    type: String,
    required: [true, "Shift type is required"],
    enum: {
      values: ["Morning", "Evening", "Night", "Long"],
      message: "Shift type must be one of: Morning, Evening, Night, or Long",
    },
  },

  status: {
    type: String,
    required: [true, "Marital status is required"],
    enum: {
      values: ["active", "completed", "cancelled"],
      message: "{VALUE} is not a valid marital status",
    },
  },
  notes: {
    type: String,
    minlength: [2, "notes must be at least 2 characters"],
  },
  createdBy: {
    type: String,
    required: [true, "createdBy is required"],
    minlength: [2, "createdBy must be at least 2 characters"],
  },
});

module.exports = mongoose.model("ShiftNurse", shiftNurseSchema);
