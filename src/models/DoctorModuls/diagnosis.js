const mongoose = require('mongoose')

const diagnosisSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patients",
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
        required: true,
    },
    diagnosis: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  prescription: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  date: {
    type: Date,
    default : Date.now,
  },

})

module.exports = mongoose.model('Diagnosis' , diagnosisSchema)