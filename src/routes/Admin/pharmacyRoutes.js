const express = require("express");

const Pharmacy = require("../../models/Admin/Pharmacy");
const router = express.Router();





// to create new pharmacy
router.post("/pharmacies/add", async (req, res) => {
  const newPharmacy = new Pharmacy(req.body);
  try {
    const savePharmacy = await newPharmacy.save();
    res.status(200).json({
      message: "Pharmacy info has been added successfully.!",
      data: savePharmacy,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// to get All Pharmacies
router.get("/pharmacies/all", async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    if (!pharmacies) {
      return res.status(500).send("sorry, there is no find any pharmacy");
    }
    res.json({
      message: "Get all pharmacies successfully!",
      data: pharmacies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to get some pharmacies
router.get("/pharmacy/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const pharmacy = await Pharmacy.findById({ _id });
    if (!pharmacy) {
      return res.status(500).send("sorry, this pharmacy unavailable");
    }
    res.json({
      message: "Get Some pharmacy successfully!",
      data: pharmacy,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to update some pharmacy
router.patch("/pharmacy/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const pharmacy = await Pharmacy.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!pharmacy) {
      return res.status(404).send("no pharmacy is finding");
    }
    res.status(200).json({
      message: "Pharmacy updated successfully!",
      data: pharmacy,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// to delete some pharmacy
router.delete("/pharmacy/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const pharmacy = await Pharmacy.findByIdAndDelete(_id);

    if (!pharmacy) {
      res.status(404).send("No pharmacies is founded");
    }
    res.status(200).json({
      message: "Pharmacy deleted successfully!",
      data: pharmacy,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to get count of all pharmacies
router.get("/pharmacies/count", async (req, res) => {
  try {
    const pharmaciesCount = await Pharmacy.countDocuments({});

    res.status(200).json({
      message: "Total number of pharmacies retrieved successfully.",
      count: pharmaciesCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve pharmacy count.",
      error: error.message,
      stack: error.stack,
    });
  }
});

// filter for all element in doctor table
router.get("/pharmacies", async (req, res) => {
  try {
    const filter = {};

    // Build filter dynamically based on query parameters
    if (req.query.PharmacyID) filter.PharmacyID = req.query.PharmacyID;
    if (req.query.pharmacyName) filter.pharmacyName = req.query.pharmacyName;
    if (req.query.pharmacyType) filter.pharmacyType = req.query.pharmacyType;
    if (req.query.workingHours) filter.workingHours = req.query.workingHours;
    if (req.query.supervisor) filter.supervisor = req.query.supervisor;
    


    const pharmacies = await Pharmacy.find(filter);

    if (!pharmacies || pharmacies.length === 0) {
      return res.status(404).json({ message: "No pharmacy found matching the criteria." });
    }

    res.status(200).json({
      message: "Filtered pharmacy results:",
      data: pharmacies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});









module.exports = router;