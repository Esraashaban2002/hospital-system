const express = require('express')
const auth = require('../../middleware/auth');
const Diagnosis  = require('../../models/DoctorModuls/diagnosis');
const AppointmentModel = require('../../models/DoctorModuls/Appointment');
const InitialLabResultModel = require('../../models/NurseModuls/InitialLabResult');
const router = express.Router()

router.get('/doctor//my-patients-lab-results' , auth.isDoctor, async (req , res) =>{
  try{
    const doctorId = req.user._id;
    const Appointment = AppointmentModel.find({doctorId}).select("patientId")
    const patientIds = (await Appointment).map((App) => {App.patientId})

    const result = await InitialLabResultModel.find({patientId : {$in :patientIds} })
    .populate("patientId", "fullName  gender")
    .populate("nurseId", "fullName")

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Error fetching lab results for doctor's patients" });
  }
})

module.exports = router