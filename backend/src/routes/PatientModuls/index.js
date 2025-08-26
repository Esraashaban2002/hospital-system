const  onlineConsultationRoutes = require('./OnlineConsultationRoutes');
const  bookAppointmentRoutes = require('./bookAppointmentRoutes');
const prescriptionRoutes = require('./prescriptionRoutes')
const notification = require('./notificationRoutes')
const labResult = require('./labResultRoutes')

module.exports ={
    onlineConsultationRoutes,
    bookAppointmentRoutes ,
    prescriptionRoutes,
    notification,
    labResult
}
