const mongoose = require('mongoose')

const onlineConsultationSchema = new mongoose.Schema({
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
    enum: ["pending" , "accepted" , "rejected" , "completed"],
    default: "pending",
  },
  createAt: {
    type: Date,
    default : Date.now
  },
  subject: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
})
module.exports = mongoose.model("OnlineConsultation" , onlineConsultationSchema)