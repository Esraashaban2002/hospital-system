const express = require("express");

const Patient = require("../../models/Admin/Patient");
const router = express.Router();



// to create new Patient
router.post("/patients/add", async (req, res) => {
  const newPatient = new Patient(req.body);
  try {
    const savePatient = await newPatient.save();
    res.status(200).json({
      message: "Patient info has been added successfully.!",
      data: savePatient,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// to get All Patients
router.get("/patients/all", async (req, res) => {
  try {
    const patients = await Patient.find();
    if (!patients) {
      return res.status(500).send("sorry, there is no find any patient");
    }
    res.json({
      message: "Get all patients successfully!",
      data: patients,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// to update some Patient
router.patch("/patient/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const patient = await Patient.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!patient) {
      return res.status(404).send("no patient is finding");
    }
    res.status(200).json({
      message: "Patient updated successfully!",
      data: patient,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// to delete some Patient
router.delete("/patient/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const patient = await Patient.findByIdAndDelete(_id);

    if (!patient) {
      res.status(404).send("No patient is founded");
    }
    res.status(200).json({
      message: "Patient deleted successfully!",
      data: patient,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to get count of all Patients
router.get("/patients/count", async (req, res) => {
  try {
    const patientsCount = await Patient.countDocuments({});

    res.status(200).json({
      message: "Total number of patients retrieved successfully.",
      count: patientsCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve patient count.",
      error: error.message,
      stack: error.stack,
    });
  }
});


// filter for all element in Patient table
router.get("/patients", async (req, res) => {
  try {
    const filter = {};

    // Build filter dynamically based on query parameters
    if (req.query.fullName) filter.fullName = req.query.fullName;
    if (req.query.identityNumber) filter.identityNumber = req.query.identityNumber;
    if (req.query.birthDate) filter.birthDate = req.query.birthDate;
    if (req.query.gender) filter.gender = req.query.gender;
    if (req.query.maritalStatus) filter.maritalStatus = req.query.maritalStatus;
    if (req.query.phone) filter.phone = req.query.phone;
    if (req.query.email) filter.email = req.query.email;


    // Age-based filtering from birthDate
    if (req.query.minAge || req.query.maxAge) {
      const today = new Date();

      let minDate = null;
      let maxDate = null;

      if (req.query.maxAge) {
        minDate = new Date(today);
        minDate.setFullYear(today.getFullYear() - parseInt(req.query.maxAge));
      }

      if (req.query.minAge) {
        maxDate = new Date(today);
        maxDate.setFullYear(today.getFullYear() - parseInt(req.query.minAge));
      }

      filter.birthDate = {};
      if (minDate) filter.birthDate.$lte = minDate;
      if (maxDate) filter.birthDate.$gte = maxDate;
    }

    const patients = await Patient.find(filter);

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No patient found matching the criteria." });
    }

    res.status(200).json({
      message: "Filtered patient results:",
      data: patients,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});










module.exports = router;



