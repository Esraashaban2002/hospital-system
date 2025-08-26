const express = require("express");
const Prescription = require("../../models/DoctorModuls/prescription.js");
const { auth, isPharmacy } = require("../../middleware/auth.js");
const router = express.Router();

// to get all Prescription
router.get("/prescriptions/all", auth, isPharmacy, async (req, res) => {
  const available = await Prescription.find();
  res.status(200).json(available);
});


//to get all prescriptions which record in today date
router.get("/prescriptions/today", auth, isPharmacy, async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const prescriptionsToday = await Prescription.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    res.status(200).json({
      message: "Prescriptions created today",
      data: prescriptionsToday,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to get just available Prescription
router.get("/prescriptions/available", auth, isPharmacy, async (req, res) => {
  const available = await Prescription.find({
    status: "pending",
    pharmacyRef: null,
  });
  res.status(200).json(available);
});


//To receive the dispensed prescription
router.post("/prescriptions/claim/:id", auth, isPharmacy, async (req, res) => {
  const prescription = await Prescription.findOne({
    _id: req.params.id,
    status: "pending",
    pharmacyRef: null,
  });

  if (!prescription)
    return res
      .status(404)
      .json({
        error:
          "The prescription is not available or has already been received.",
      });

  prescription.pharmacyRef = req.user._id;
  prescription.status = "accepted";

  await prescription.save();
  res.json({ message: "Prescription received", data: prescription });
});


// To dispense the prescription
router.patch("/prescriptions/dispense/:id", auth, isPharmacy, async (req, res) => {
  const prescription = await Prescription.findOne({ _id: req.params.id, pharmacyRef: req.user._id });

  if (!prescription) return res.status(404).json({ error: "There is no prescription registered in the name of this pharmacy." });

  prescription.status = "dispensed";
  await prescription.save();

  res.json({ message: "The prescription was dispensed successfully.", data: prescription });
});


module.exports = router;
