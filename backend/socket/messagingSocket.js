const Message = require('../models/Message');
const User = require('../models/User');
module.exports = (io, socket) => {
  socket.on('sendMessage', async (data) => {

    try {
       // Retrieve the sender's full info (especially username)
       const senderUser = await User.findById(socket.user.id).select('username');
       if (!senderUser) throw new Error("User not found");
      //  Creating new message in DB
      let message = new Message({
        chatRoom: data.chatRoom,
        sender: socket.user.id,
        content: data.content
      });

      await message.save();

      // Populating sender's username
      message = await message.populate('sender', 'username');

      // new message with populated sender info
      io.to(data.chatRoom).emit('newMessage', message);
    } catch (error) {
      
      console.error(error);
    }
  });
};