const express = require("express");

const shiftNurse = require("../models/shiftNurse");
const Nurses = require("../models/Nurse");
const router = express.Router();

// to create new shift nurse
router.post("/shiftNurse/add", async (req, res) => {
  try {
    const { nurseId, ...shiftData } = req.body;

    const nurseExists = await Nurses.findById(nurseId);
    if (!nurseExists) {
      return res.status(400).json({ error: "Nurse ID not found" });
    }

    const newShift = new shiftNurse({ nurseId, ...shiftData });
    const savedShift = await newShift.save();

    res.status(201).json({
      message: "Shift added successfully",
      data: savedShift,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to get All // to get All shift nurse
router.get("/shiftNurses/all", async (req, res) => {
  try {
    const shiftNurses = await shiftNurse.find();
    if (!shiftNurses) {
      return res
        .status(500)
        .send("sorry, there is no find any shift of Nurses");
    }
    res.json({
      message: "Get all shift Nurses successfully!",
      data: shiftNurses,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to get some All shift nurse
router.get("/shiftNurse/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getShiftNurse = await shiftNurse.findById({ _id });
    if (!getShiftNurse) {
      return res.status(500).send("sorry, this shift Nurse unavailable");
    }
    res.json({
      message: "Get Some shift Nurse successfully!",
      data: getShiftNurse,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to update some shift nurse
router.patch("/shiftNurse/update/:id", async (req, res) => {
  try {
    const shiftId = req.params.id;
    const { nurseId, ...updatedData } = req.body;

    // Validate nurse existence before update
    const nurseExists = await Nurses.findById(nurseId);
    if (!nurseExists) {
      return res.status(404).json({ error: "Nurse ID not found" });
    }

    const updatedShift = await ShiftNurse.findByIdAndUpdate(
      shiftId,
      { nurseId, ...updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedShift) {
      return res.status(404).json({ error: "Shift not found" });
    }

    res.status(200).json({
      message: "Shift updated successfully",
      data: updatedShift,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to delete some shiftNurse
router.delete("/shiftNurse/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const shiftNurseDelete = await shiftNurse.findByIdAndDelete(_id);

    if (!shiftNurseDelete) {
      res.status(404).send("No shiftNurse is founded");
    }
    res.status(200).json({
      message: "shiftNurse deleted successfully!",
      data: shiftNurse,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to get count of all shiftNurse
router.get("/shiftNurses/count", async (req, res) => {
  try {
    const shiftNursesCount = await shiftNurse.countDocuments({});

    res.status(200).json({
      message: "Total number of shiftNurses retrieved successfully.",
      count: shiftNursesCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve shiftNurses count.",
      error: error.message,
      stack: error.stack,
    });
  }
});

// filter for all element in shiftNurses table
router.get("/shiftNurses", async (req, res) => {
  try {
    const filter = {};

    // Build filter dynamically based on query parameters
    if (req.query.nurseId) filter.nurseId = req.query.nurseId;
    if (req.query.department) filter.department = req.query.department;
    if (req.query.date) filter.date = req.query.date;
    if (req.query.startTime) filter.startTime = req.query.startTime;

    if (req.query.endTime) filter.endTime = req.query.endTime;
    if (req.query.shiftType) filter.shiftType = req.query.shiftType;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.createdBy) filter.createdBy = req.query.createdBy;

    const results = await shiftNurse.find(filter);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No shiftNurses match the criteria." });
    }

    res.status(200).json({
      message: "Filtered shiftNurse results",
      data: results,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
