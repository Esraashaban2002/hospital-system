const express = require("express");

const Doctor = require("../../models/Admin/Doctor");
const { auth, isAdmin } = require("../../middleware/auth")


const router = express.Router();

// to create new doctor
router.post("/doctors/add",auth, isAdmin, async (req, res) => {
  const newDoctor = new Doctor(req.body);
  try {
    const saveDoctor = await newDoctor.save();
    res.status(200).json({
      message: "Doctor info has been added successfully.!",
      data: saveDoctor,
    }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// to get All Doctors
router.get("/doctors/all",auth, isAdmin, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    if (!doctors) {
      return res.status(500).send("sorry, there is no find any doctor");
    }
    res.json({
      message: "Get all doctors successfully!",
      data: doctors,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to get some Doctors
router.get("/doctor/:id", auth, isAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    const doctor = await Doctor.findById({ _id });
    if (!doctor) {
      return res.status(500).send("sorry, this doctor unavailable");
    }
    res.json({
      message: "Get Some doctor successfully!",
      data: doctor,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to update some Doctor
router.patch("/doctor/update/:id",auth, isAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    const doctor = await Doctor.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doctor) {
      return res.status(404).send("no doctor is finding");
    }
    res.status(200).json({
      message: "Doctor updated successfully!",
      data: doctor,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// to delete some Doctor
router.delete("/doctor/delete/:id",auth, isAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    const doctor = await Doctor.findByIdAndDelete(_id);

    if (!doctor) {
      res.status(404).send("No doctor is founded");
    }
    res.status(200).json({
      message: "Doctor deleted successfully!",
      data: doctor,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to get count of all Doctors
router.get("/doctors/count",auth, isAdmin, async (req, res) => {
  try {
    const doctorsCount = await Doctor.countDocuments({});

    res.status(200).json({
      message: "Total number of doctors retrieved successfully.",
      count: doctorsCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve doctor count.",
      error: error.message,
      stack: error.stack,
    });
  }
});

// filter for all element in doctor table
router.get("/doctors", auth, isAdmin, async (req, res) => {
  try {
    const filter = {};

    // Build filter dynamically based on query parameters
    if (req.query.fullName) filter.fullName = req.query.fullName;
    if (req.query.ID) filter.ID = req.query.ID;
    if (req.query.identityNumber) filter.identityNumber = req.query.identityNumber;
    if (req.query.birthDate) filter.birthDate = req.query.birthDate;
    if (req.query.gender) filter.gender = req.query.gender;
    if (req.query.maritalStatus) filter.maritalStatus = req.query.maritalStatus;
    if (req.query.phone) filter.phone = req.query.phone;
    if (req.query.email) filter.email = req.query.email;
    if (req.query.department) filter.department = req.query.department;
    if (req.query.academicDegree) filter.academicDegree = req.query.academicDegree;
    if (req.query.specialization) filter.specialization = req.query.specialization;

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

    const doctors = await Doctor.find(filter);

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: "No doctor found matching the criteria." });
    }

    res.status(200).json({
      message: "Filtered doctor results:",
      data: doctors,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
