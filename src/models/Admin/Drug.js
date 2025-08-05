const mongoose = require("mongoose");

const drugsSchema = mongoose.Schema({
  drugName: {
    type: String,
    required: [true, "drugName is required"],
    unique: [true, "drugName must be unique. This drugName is already taken."],
    minlength: [2, "drugName must be at least 2 characters"],
  },
  scientificName: {
    type: String,
    required: [true, "scientificName is required"],
    unique: [
      true,
      "scientificName must be unique. This scientificName is already taken.",
    ],
    minlength: [2, "scientificName must be at least 2 characters"],
  },
  code: {
    type: Number,
    required: true,
    unique: [true, "Code must be unique. This Code is already taken."],
    minlength: [/^\d{5,10}$/, "Code number must be 5 to 10 digits"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Quantity cannot be negative"],
  },
  expirationDate: {
    type: Date,
    required: [true, "Expiration Date is required"],
    validate: {
      validator: function (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Strip time for clean comparison
        return value >= today;
      },
      message: "Expiration Date must be today or in the future",
    },
  },
  Manufacturer: {
    type: String,
    required: [true, "Manufacturer is required"],
    minlength: [2, "Manufacturer must be at least 2 characters"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
});

module.exports = mongoose.model("Drugs", drugsSchema);
