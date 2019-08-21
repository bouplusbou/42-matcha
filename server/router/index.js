const express = require('express');
const router = express.Router();
 
router.use('/users', require('./routes/userRoutes'));
router.use('/tags', require('./routes/tagRoutes'));
router.use('/auth', require('./routes/authRoutes'));
router.use('/notifications', require('./routes/notificationsRoutes'));

module.exports = router;