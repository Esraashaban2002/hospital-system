const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const NurseShift = require("../../models/NurseModuls/NurseShift");
// Get all nurse shifts
router.get("/nurse/shifts",auth.isNurse,async (req,res)=>{
    const nurseId = req.user._id;
    try{
        const shifts = await NurseShift.find({nurseId}).sort({startTime:1}) ;
        res.status(200).json({
        message: "Nurse shifts retrieved successfully.",
        data: shifts,
        })
    }
    catch(err){
        res.status(400).json({
            message: "Error retrieving nurse shifts.",
            error: err.message,
        });
    }
})

// export the router
module.exports = router;