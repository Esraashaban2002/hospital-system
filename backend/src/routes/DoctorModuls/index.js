const  Appointment = require('./AppointmentRoutes');
const  DoctorShift = require('./DoctorShiftRoutes');
const  Diagnosis = require('./diagnosisRoutes')
const  PatientsLabResults = require('./PatientsLabResults');
const  Prescription = require('./prescriptionRoute');

module.exports ={
   DoctorShift ,
   Appointment,
   Diagnosis,
   PatientsLabResults,
   Prescription
}
