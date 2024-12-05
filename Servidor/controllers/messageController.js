// messageController.js
const messageModel = require('../models/messageModel');

const storeMessage = async (req, res) => {
  const { userID, text } = req.body;

  if (!userID || !text) {
    return res.status(400).json({ error: 'UserID and text are required' });
  }

  try {
    const messageID = await messageModel.storeMessage(req.db, userID, text);
    res.status(200).json({ messageID });
  } catch (error) {
    console.error('Error storing message:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllMessages = async (req, res) => {
    try {
      const messages = await messageModel.getAllMessages(req.db);
      res.json(messages);
    } catch (error) {
      console.error('Error getting all messages:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
  storeMessage,
  getAllMessages,
};
