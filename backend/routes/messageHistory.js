const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Retrieving message history for a room
router.get('/:roomId', async (req, res, next) => {

  try {
    const messages = await Message.find({ chatRoom: req.params.roomId })
      .populate('sender', 'username');
      
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;