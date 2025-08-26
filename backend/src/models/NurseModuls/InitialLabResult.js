const mongoose = require("mongoose");
const initialLabResultSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patients",
        required: true,
    },
    nurseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nurses",
        required: true,
    },
      testType: {
    type: String,
    required: true,
    enum: ["blood", "urine", "glucose", "pressure", "other"],
  },
  value: {
    type: String,
    required: true,
  },
  notes: String,
  recordedAt: {
    type: Date,
    default: Date.now,
  },
});
const InitialLabResultModel = mongoose.model("InitialLabResult", initialLabResultSchema);
module.exports = InitialLabResultModel;