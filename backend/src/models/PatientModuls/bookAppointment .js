const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
        required: true,
      },
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patients",
        required: true,
      },
      status: {
    type: String,
    enum: ["pending" , "confirmed" , "canceled" , "completed"],
    default: "pending",
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
})

module.exports = mongoose.model("Booking" , bookingSchema)