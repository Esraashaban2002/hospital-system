const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const DoctorShift = require("../../models/DoctorModuls/DoctorShift");
router.get("/doctor/shift",auth.auth , auth.isDoctor, async (req, res) => {
  try {
    const doctorId = req.user._id;
    const shift = await DoctorShift.find({ doctorId }).sort({ startTime: 1 });
    res.status(200).json({
      message: "Doctor shifts retrieved successfully.",
      data: shifts,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error retrieving doctor shifts.",
      error: err.message,
    });
  }
});

module.exports = router;
