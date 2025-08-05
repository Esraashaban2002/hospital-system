const express = require('express')
const auth = require('../../middleware/auth')
const InitialLabResultModel = require('../../models/NurseModuls/InitialLabResult')
const router = express.Router()

router.get('/patient/labResult' , auth.isPatient ,async (req , res) =>{
    try {
        const result = await InitialLabResultModel.find({ patientId: req.user._id }).sort({ date: -1 })
        res.status(200).send(result)
    } catch (error) {
          res.status(500).send({ message: 'Error fetching lab results', error });
    }

})

module.exports = router