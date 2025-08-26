const mongoose = require("mongoose");

const VitalSignSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
    required: true,
  },
  nurseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurses",
    required: true,
  },
  temperature: {
    type: Number, // °C
    required: true,
  },
  bloodPressure: {
    systolic: Number,    
    diastolic: Number,   
  },
  heartRate: Number,       
  respiratoryRate: Number, 
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("VitalSign", VitalSignSchema);
