const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const InitialLabResult = require("../../models/NurseModuls/InitialLabResult");
const Notification = require("../../models/Notification");
router.post("/nurse/lab/:patientId", auth.isNurse, async (req, res) => {
  const { patientId } = req.params;
  const { testType, value, notes } = req.body;
  const nurseId = req.user._id;
  try {
    const LabResult = await InitialLabResult.create({
      patientId,
      nurseId,
      testType,
      value,
      notes,
    });
    await Notification.create({
      patientId,
      title: 'نتيجة تحليل جديدة',
      message: 'تم رفع نتيجة تحليل جديدة، يمكنك مشاهدتها الآن.',
      type: 'lab_result'
    });

    res.status(200).json({
      message: "Initial lab result recorded successfully",
      data: LabResult,
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to record initial lab result",
      error: e.message,
    });
  }
});

module.exports = router;