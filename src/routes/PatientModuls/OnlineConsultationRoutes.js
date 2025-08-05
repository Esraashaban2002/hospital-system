const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const OnlineConsultation = require('../../models/PatientModuls/OnlineConsultation') 
const Doctors = require('../../models/Admin/Doctor')

// online consultation
router.post("/online_consultation" , auth.isPatient , async (req , res) =>{
     try {
    const { doctorId, subject, description } = req.body;
    const patientId = req.user._id;
    if (!doctorId || !subject || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const doctor = await Doctors.findById(doctorId);
    if (!doctor) {
     return res.status(404).json({ message: 'Doctor not found' });
    }

    const consultation = new OnlineConsultation({
      doctorId,
      patientId,
      subject,
      description,
    });

    await consultation.save();

    res.status(201).json({ 
        message: 'Consultation request submitted', 
        consultationId: consultation._id,
        subject: consultation.subject,
        doctorId: consultation.doctorId  
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong, please try again later.' });
  }
})
module.exports = router