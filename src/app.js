require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
// import nurse Modules
const nurseLabRoutes = require("./routes/NurseModuls/InitialLabResultRoutes");
const nurseVitalRoutes = require("./routes/NurseModuls/VitalSignRoutes");
const NurseShift = require("./routes/NurseModuls/NurseShift");
const CriticalCare = require("./routes/NurseModuls/CriticalCare");
// import Doctor Modules
const DoctorShift = require("./routes/DoctorModuls/DoctorShift");
const Appointment = require("./routes/DoctorModuls/Appointment");


const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const drugRoutes = require("./routes/drugRoutes");
const nurseRoutes = require("./routes/nurseRoutes");
const shiftNurseRoutes = require("./routes/shiftNurseRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRoutes);

app.use("/api", doctorRoutes);
app.use("/api", patientRoutes);
app.use("/api", pharmacyRoutes);
app.use("/api", drugRoutes);
app.use("/api", nurseRoutes);
app.use("/api", shiftNurseRoutes);
// Nurse Module
app.use("/api", nurseLabRoutes);
app.use("/api", nurseVitalRoutes);
app.use("/api",NurseShift);
app.use("/api",CriticalCare);
// Doctor Module
app.use("/api", DoctorShift);
app.use("/api", Appointment);


module.exports = app;
