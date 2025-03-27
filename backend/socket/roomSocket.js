const ChatRoom = require('../models/ChatRoom');
module.exports = (io, socket) => {
  // user joining room
  socket.on('joinRoom', (roomId) => 
    {
    socket.join(roomId);
    console.log(`User ${socket.user.id} joined room ${roomId}`);
  });

  // Creating a new room 
  socket.on('createRoom', async (roomData) => {

    try {
      const newRoom = new ChatRoom({
        name: roomData.name,
        users: roomData.users ? roomData.users : [socket.user.id]
      });

      await newRoom.save();
      console.log('New room created:', newRoom);

      // Emiting event to the socket to confirm room creation.
      socket.emit('roomCreated', newRoom);

      io.emit('newRoom', newRoom);
    } 
    catch (error) {
      console.error('Room creation error:', error);
      socket.emit('error', { msg: 'Failed to create room' });
    }
  });
};