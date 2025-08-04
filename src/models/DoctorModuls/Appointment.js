const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
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
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  date: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
  },
});
const AppointmentModel = mongoose.model("Appointment", AppointmentSchema);
module.exports = AppointmentModel;
