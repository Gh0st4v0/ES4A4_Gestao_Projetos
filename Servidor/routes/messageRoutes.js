const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route to store a new message
router.post('/messages/upload', messageController.storeMessage);

// Route to get all messages
router.get('/messages', messageController.getAllMessages);

module.exports = router;