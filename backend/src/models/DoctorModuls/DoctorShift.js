const mongoose = require("mongoose");

const DoctorShift = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctors",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: { type: Date, required: true },
  location: {
    type: String,
  },
});

const DoctorShiftModel = mongoose.model("DoctorShift", DoctorShift);
module.exports = DoctorShiftModel;
