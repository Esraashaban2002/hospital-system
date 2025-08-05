const express = require("express");

const Nurse = require("../../models/Admin/Nurse");
const router = express.Router();


// to create new nurse
router.post("/nurses/add", async (req, res) => {
  const newNurse = new Nurse(req.body);
  try {
    const saveNurse = await newNurse.save();
    res.status(200).json({
      message: "Nurse info has been added successfully.!",
      data: saveNurse,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// to get All Nurses
router.get("/nurses/all", async (req, res) => {
  try {
    const nurses = await Nurse.find();
    if (!nurses) {
      return res.status(500).send("sorry, there is no find any nurse");
    }
    res.json({
      message: "Get all nurses successfully!",
      data: nurses,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to get some nurses
router.get("/nurse/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const nurse = await Nurse.findById({ _id });
    if (!nurse) {
      return res.status(500).send("sorry, this nurse unavailable");
    }
    res.json({
      message: "Get Some nurse successfully!",
      data: nurse,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// to update some Nurse
router.patch("/nurse/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const nurse = await Nurse.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!nurse) {
      return res.status(404).send("no nurse is finding");
    }
    res.status(200).json({
      message: "Nurse updated successfully!",
      data: nurse,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// to delete some Nurse
router.delete("/nurse/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const nurse = await Nurse.findByIdAndDelete(_id);

    if (!nurse) {
      res.status(404).send("No nurse is founded");
    }
    res.status(200).json({
      message: "Nurse deleted successfully!",
      data: nurse,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to get count of all nurses
router.get("/nurses/count", async (req, res) => {
  try {
    const nursesCount = await Nurse.countDocuments({});

    res.status(200).json({
      message: "Total number of nurses retrieved successfully.",
      count: nursesCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve nurse count.",
      error: error.message,
      stack: error.stack,
    });
  }
});


// filter for all element in doctor table
router.get("/nurses", async (req, res) => {
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

    const nurses = await Nurse.find(filter);

    if (!nurses || nurses.length === 0) {
      return res.status(404).json({ message: "No nurse found matching the criteria." });
    }

    res.status(200).json({
      message: "Filtered nurse results:",
      data: nurses,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;