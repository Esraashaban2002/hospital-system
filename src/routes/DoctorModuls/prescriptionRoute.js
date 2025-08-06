const express = require("express");
const Prescription = require("../../models/DoctorModuls/prescription.js");
const Doctor = require("../../models/Admin/Doctor.js");
const Patient = require("../../models/Admin/Patient.js");
const { auth, isDoctor } = require("../../middleware/auth");

const router = express.Router();



// To add a prescription from a doctor
router.post("/prescriptions/add", auth, isDoctor, async (req, res) => {
  const { doctorId, patientId, medications, notes } = req.body;

  try {
    const doctorExists = await Doctor.exists({ _id: doctorId });
    if (!doctorExists) {
      return res.status(400).json({ error: "Invalid doctor ID." });
    }

    const patientExists = await Patient.exists({ _id: patientId });
    if (!patientExists) {
      return res.status(400).json({ error: "Invalid patient ID." });
    }

    const prescription = new Prescription({
      doctorId,
      patientId,
      medications,
      notes,
    });

    const savedPrescription = await prescription.save();

    res.status(201).json({
      message: "Prescription created successfully",
      data: savedPrescription,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
