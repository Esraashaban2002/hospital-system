require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
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

module.exports = app;
