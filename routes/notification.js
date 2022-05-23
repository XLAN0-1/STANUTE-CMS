const express = require('express');
const auth = require('../controllers/auth');
const notification = require('../controllers/notificationController');

const router = express.Router();


router.get('/notifications', auth.verifyUser, notification.getNotifications);


router.post('/add-notification', notification.addNotification);
router.post('/delete-notifications', auth.verifyUser, notification.deleteNotification);
router.post('/update-notification', auth.verifyUser, notification.updateNotification);

module.exports = router;