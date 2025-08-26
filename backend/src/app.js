require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// import Admin Modules
const { doctorRoutes, patientRoutes, pharmacyRoutes, nurseRoutes,drugRoutes, userRoutes, shiftNurseRoutes } = require('./routes/Admin');
// import nurse Modules
const {  CriticalAlert0Routes, InitialLabResultRoutes, NurseShift,VitalSignRoutes} = require("./routes/NurseModuls");
// import Doctor Modules
const {DoctorShift , Appointment , Diagnosis , PatientsLabResults} = require("./routes/DoctorModuls");
// import Patient Modutes 
const {bookAppointmentRoutes , onlineConsultationRoutes , prescriptionRoutes , notification, labResult} = require("./routes/PatientModuls")
// import Patient Pharmacy 
const {prescriptionPharmacyRoutes} = require("./routes/Pharmacy")

// Admin Modules
app.use("/api", doctorRoutes);
app.use("/api", patientRoutes);
app.use("/api", pharmacyRoutes);
app.use("/api", nurseRoutes);
app.use("/api", drugRoutes);
app.use("/api", shiftNurseRoutes);
app.use("/api" , userRoutes);

// Nurse Module
app.use("/api", NurseShift);
app.use("/api", CriticalAlert0Routes);
app.use("/api",InitialLabResultRoutes);
app.use("/api",VitalSignRoutes);

// Doctor Module
app.use("/api", DoctorShift);
app.use("/api", Appointment);
app.use("/api", Diagnosis);
app.use("/api", PatientsLabResults);

// //patient Module
app.use("/api" , bookAppointmentRoutes)
app.use("/api" , onlineConsultationRoutes)
app.use("/api" , prescriptionRoutes)
app.use("/api" , notification)
app.use("/api" , labResult)


//Pharmacy Module
app.use("/api" , prescriptionPharmacyRoutes)

module.exports = app;
