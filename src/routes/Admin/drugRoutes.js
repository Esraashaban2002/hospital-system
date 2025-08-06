const express = require("express");

const Drug = require("../../models/Admin/Drug");
const { auth, isAdmin } = require("../../middleware/auth")
const router = express.Router();

// to create new drug
router.post("/drugs/add",auth, isAdmin, async (req, res) => {
  const newDrug = new Drug(req.body);
  try {
    const saveDrug = await newDrug.save();
    res.status(200).json({
      message: "Drug info has been added successfully.!",
      data: saveDrug,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// to get All Drugs
router.get("/drugs/all", auth, isAdmin,async (req, res) => {
  try {
    const drugs = await Drug.find();
    if (!drugs) {
      return res.status(500).send("sorry, there is no find any drug");
    }
    res.json({
      message: "Get all drugs successfully!",
      data: drugs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to get some drugs
router.get("/drug/:id", auth, isAdmin,async (req, res) => {
  try {
    const _id = req.params.id;
    const drug = await Drug.findById({ _id });
    if (!drug) {
      return res.status(500).send("sorry, this drug unavailable");
    }
    res.json({
      message: "Get Some drug successfully!",
      data: drug,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to update some Drug
router.patch("/drug/update/:id",auth, isAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    const drug = await Drug.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!drug) {
      return res.status(404).send("no drug is finding");
    }
    res.status(200).json({
      message: "Drug updated successfully!",
      data: drug,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// to delete some Drug
router.delete("/drug/delete/:id",auth, isAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    const drug = await Drug.findByIdAndDelete(_id);

    if (!drug) {
      res.status(404).send("No drug is founded");
    }
    res.status(200).json({
      message: "Drug deleted successfully!",
      data: drug,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to get count of all drugs
router.get("/drugs/count",auth, isAdmin, async (req, res) => {
  try {
    const drugsCount = await Drug.countDocuments({});

    res.status(200).json({
      message: "Total number of drugs retrieved successfully.",
      count: drugsCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve drug count.",
      error: error.message,
      stack: error.stack,
    });
  }
});

// filter for all element in drug table
router.get("/drugs",auth, isAdmin, async (req, res) => {
  try {
    const filter = {};

    // Build filter dynamically based on query parameters
    if (req.query.drugName) filter.drugName = req.query.drugName;
    if (req.query.scientificName)
      filter.scientificName = req.query.scientificName;
    if (req.query.code) filter.code = req.query.code;
    if (req.query.quantity) filter.quantity = req.query.quantity;
    if (req.query.expirationDate) filter.expirationDate = req.query.expirationDate;
    if (req.query.Manufacturer) filter.Manufacturer = req.query.Manufacturer;
    if (req.query.price) filter.price = req.query.price;
    

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }

    if (req.query.startDate || req.query.endDate) {
      filter.expirationDate = {};
      if (req.query.startDate)
        filter.expirationDate.$gte = new Date(req.query.startDate);
      if (req.query.endDate)
        filter.expirationDate.$lte = new Date(req.query.endDate);
    }

    const drugs = await Drug.find(filter);

    if (!drugs || drugs.length === 0) {
      return res
        .status(404)
        .json({ message: "No drug found matching the criteria." });
    }

    res.status(200).json({
      message: "Filtered drug results:",
      data: drugs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
