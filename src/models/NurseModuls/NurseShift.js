const mongoose = require("mongoose");
const NurseShift = new mongoose.Schema({
  nurseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurses",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
});
const NurseShiftModel = mongoose.model("NurseShift", NurseShift);
module.exports = NurseShiftModel;