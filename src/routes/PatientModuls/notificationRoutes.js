const express = require('express')
const router = express.Router()
const Notification = require('../../models/Notification');
const auth = require('../../middleware/auth');

router.get('/patient/notifications', auth.auth ,auth.isPatient , async (req, res) => {
  try {

    const notifications = await Notification.find({ patientId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).send(notifications);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching notifications', err });
  }
});

router.patch('/patient/notifications/:id/read',auth.auth , auth.isPatient, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.status(200).send(notification);
  } catch (err) {
    res.status(500).send({ message: 'Error updating notification', err });
  }
});

module.exports = router