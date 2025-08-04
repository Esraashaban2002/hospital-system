const express = require("express");
const router = express.Router();
const Appointment = require("../../models/DoctorModuls/Appointment");
const auth = require("../../middleware/auth");

// get all appointments for a doctor
router.get("/doctor/appointments", auth(["Doctor"]), async (req, res) => {
  const doctorId = req.user._id;
  try {
    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "name email")
      .sort({ date: 1 });

    res.status(200).json({
      message: "Doctor's appointments retrieved successfully.",
      data: appointments,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error retrieving doctor's appointments.",
      error: err.message,
    });
  }
});

// update appointment status
router.put(
  "/doctor/appointment/:id/status",
  auth(["Doctor"]),
  async (req, res) => {
    const { status } = req.body;
    const id = req.params.id;
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value. Use 'accepted' or 'rejected'.",
      });
    }
    try {
      let appointment = await Appointment.findByIdAndUpdate(
        {
          _id: id,
          doctorId: req.params._id,
        },
        { status },
        { new: true, runValidators: true }
      );
      if (!appointment) {
        return res.status(404).json({
          message: "Appointment not found or does not belong to this doctor.",
        });
      }
      return res.status(200).json({
        message: "Appointment status updated successfully.",
        data: appointment,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error updating appointment status.",
        error: err.message,
      });
    }
  }
);

module.exports = router;
