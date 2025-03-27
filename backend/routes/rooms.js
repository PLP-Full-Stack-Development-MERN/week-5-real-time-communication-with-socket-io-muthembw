const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/ChatRoom');

// listing all chat rooms
router.get('/', async (req, res) => {
  
  try {
    const rooms = await ChatRoom.find().sort({ createdAt: -1 });
    res.json(rooms);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;