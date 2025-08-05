const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "FullName is required"],
    unique: [true, "FullName must be unique. This fullName is already taken."],
    minlength: [2, "FullName must be at least 2 characters"],
  },
  identityNumber: {
    type: Number,
    required: true,
    unique: [
      true,
      "Identity Number must be unique. This Identity Number is already taken.",
    ],
    minlength: [/^\d{9,15}$/, "Identity number must be 9 to 15 digits"],
  },
  birthDate: {
    type: Date,
    required: [true, "Birth Date is required"],
    validate: {
      validator: function (value) {
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 15); // subtract 15 years

        return value <= minDate;
      },
      message: "Birth Date must be at least 15 years before today",
    },
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: {
      values: ["male", "female"],
      message: "{VALUE} is not a valid gender",
    },
  },
  maritalStatus: {
    type: String,
    required: [true, "Marital status is required"],
    enum: {
      values: ["single", "married"],
      message: "{VALUE} is not a valid marital status",
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{9,15}$/, "Phone number must be 9 to 15 digits"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique. This email is already taken."],
    match: [/\S+@\S+\.\S+/, "Email format is invalid"],
  },
});

module.exports = mongoose.model("Nurses", nurseSchema);
