const mongoose = require("mongoose");

const pharmacySchema = mongoose.Schema({
  PharmacyID: {
    type: Number,
    required: true,
    unique: [
      true,
      "Pharmacy ID must be unique. This Pharmacy ID is already taken.",
    ],
    minlength: [/^\d{5,10}$/, "Pharmacy ID must be 5 to 10 digits"],
  },
  pharmacyName: {
    type: String,
    required: [true, "pharmacyName is required"],
    unique: [
      true,
      "pharmacyName must be unique. This pharmacyName is already taken.",
    ],
    minlength: [2, "pharmacyName must be at least 2 characters"],
  },
  pharmacyType: {
    type: String,
    required: [true, "Pharmacy Type is required"],
    enum: {
      values: ["Indoor", "Outdoor", "Emergency", "Stock"],
      message: "{VALUE} is not a valid Pharmacy Typ",
    },
  },
  workingHours: {
    type: String,
    required: [true, "Working hours are required"],
    trim: true,
    match: [
      /^\d{2}:\d{2} - \d{2}:\d{2}$/,
      "Working hours must be in format HH:MM - HH:MM",
    ],
  },
  supervisor: {
    type: String,
    required: [true, "Supervisor is required"],
    minlength: [2, "Supervisor must be at least 2 characters"],
  },
});

module.exports = mongoose.model("Pharmacies", pharmacySchema);
