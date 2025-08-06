const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const VitalSign = require("../../models/NurseModuls/VitalSign");

router.post("/nurse/vitals/:patientId",auth.auth , auth.isNurse,async(req,res)=>{
    const nurseId = req.user._id
    const {patientId} = req.params
    const {temperature,bloodPressure,heartRate,respiratoryRate}= req.body
    try{
        const VitalSignResult = await VitalSign.create({
            patientId,
            nurseId,
            temperature,
            bloodPressure,
            heartRate,
            respiratoryRate
        })
        res.status(200).json({
            message: "Vital signs recorded successfully",
            data: VitalSignResult
        })
    }
    catch(e){
        res.status(500).json({
            message: "Failed to record vital signs",
            error: e.message
        })
    }
})
module.exports = router;