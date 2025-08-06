const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctors",
    require: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
    require: true,
  },
  medications: [{ name: String, dosage: String, duration: String }],
  notes: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "dispensed"],
    default: "pending",
  },
  pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: "pharmacies" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
