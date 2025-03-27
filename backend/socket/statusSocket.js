module.exports = (io, socket) => {
    socket.broadcast.emit('userOnline', { userId: socket.user.id });

    socket.on('disconnect', () => {
      
      socket.broadcast.emit('userOffline', { userId: socket.user.id });
    });
  };
  