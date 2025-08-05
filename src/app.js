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
const {DoctorShift , Appointment } = require("./routes/DoctorModuls");
// import Patient Modutes 
const {bookAppointmentRoutes , onlineConsultationRoutes} = require("./routes/PatientModuls")

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

// //patient Module
app.use("/api/patient" , bookAppointmentRoutes)
app.use("/api/patient" , onlineConsultationRoutes)

module.exports = app;
