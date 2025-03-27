module.exports = (io, socket) => {

    socket.on('typing', (data) => {
  
      // data should contain roomId, username 
      const { roomId, username } = data;
  
      // Broadcasting typing indicator event to others in the same room
      socket.to(roomId).emit('typing', { username });
    });
  };