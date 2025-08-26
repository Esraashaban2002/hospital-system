const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const CriticalAlert = require("../../models/NurseModuls/CriticalAlert");

router.get("/nurse/alert",auth.auth , auth.isNurse, async (req, res) => {
  const nurseId = req.user._id;
  try {
    const alert = await CriticalAlert.find({
      $or: [{ nurseId: nurseId }, { nurseId: null }],
    })
      .populate("patientId", "name gender age")
      .sort({ startTime: 1 });
    res.status(200).json({
      message: "Critical alerts retrieved successfully",
      data: alert,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving alerts",
      error: err,
    });
  }
});
module.exports = router;
