module.exports = (io, socket) => {

    //notification: example 'User joined the room' }
    socket.on('notify', (data) => {
      const { roomId, notification } = data;
  
      // Broadcasting the notification to everyone in the room chat
      io.to(roomId).emit('notification', notification);
    });
  
    //handling special notifications for joining/leaving rooms
    socket.on('joinedRoom', (data) => {
  
      const { roomId, username } = data;
      const msg = `${username} joined the room.`;
  
      io.to(roomId).emit('notification', msg);
    });
  
    socket.on('leftRoom', (data) => {
  
      const { roomId, username } = data;
      const msg = `${username} left the room.`;
      
      io.to(roomId).emit('notification', msg);
    });
  };