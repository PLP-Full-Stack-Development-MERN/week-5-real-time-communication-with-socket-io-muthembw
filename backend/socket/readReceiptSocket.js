module.exports = (io, socket) => {
    socket.on('readMessage', (data) => {
    
      io.to(data.chatRoom).emit('messageRead', {
        messageId: data.messageId,
        userId: socket.user.id
      });
    });
  };
  