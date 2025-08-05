const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true 
},
  title: { 
    type: String, 
    required: true 
},
  message: { 
    type: String, 
    required: true 
},
  isRead: { 
    type: Boolean, 
    default: false 
},
type: { 
  type: String, 
  enum: ['visit', 'lab_result'], 
  required: true 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
}
})

module.exports = mongoose.model('Notification' , notificationSchema)