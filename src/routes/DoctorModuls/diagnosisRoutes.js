const express = require('express')
const auth = require('../../middleware/auth');
const Diagnosis  = require('../../models/DoctorModuls/diagnosis');
const router = express.Router()

router.post('/doctor/diagnosis' , auth.isDoctor, async (req , res) =>{
  try{
    const { patientId, diagnosis, symptoms , prescription } = req.body;
    const doctorId = req.user._id;
 
     const newDiagnosis = new Diagnosis({
      doctorId,
      patientId,
      diagnosis, 
      symptoms , 
      prescription
    });
    
      await newDiagnosis.save();
  
      res.status(201).send({message: 'Diagnosis created successfully', newDiagnosis });
    } catch (error) {
      res.status(500).send({ message: 'Error : Failed to create diagnosis  ', error });
    }
})

router.get('/doctor/:patientId' , auth.isDoctor, async (req , res) =>{
  try{
    const { patientId} = req.params;
   const diagnoses = await Diagnosis.find({patientId }).populate('doctorId', 'name');

    res.status(200).send(diagnoses);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch diagnoses' });
  }
})

module.exports = router