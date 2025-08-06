const express = require('express')
const auth = require('../../middleware/auth');
const Diagnosis  = require('../../models/DoctorModuls/diagnosis');
const router = express.Router()

router.get('/patient/prescriptions' ,auth.auth , auth.isPatient , async (req ,res) =>{
    try {
    const patientId = req.user._id;
    const prescriptions = await Diagnosis.find({ patientId })
      .select('prescription doctorId createdAt')
      .populate('doctorId', 'name');
  
    res.status(200).send(prescriptions);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching prescriptions', error });
  }
})

module.exports = router