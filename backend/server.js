require('dotenv').config(); // Ensure dotenv is loaded first

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require("mongoose");
const errorHandler = require('./middleware/errorHandler');

// Debugging: Check if .env variables are loading
console.log("🔍 DB_URL from .env:", process.env.DB_URL);
console.log("🔍 PORT from .env:", process.env.PORT);

// Ensure DB_URL is properly loaded
if (!process.env.DB_URL) {
  console.error("❌ DB_URL is missing in .env file!");
  process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/messageHistory'));
app.use('/api/rooms', require('./routes/rooms'));

// HTTP Server & WebSockets
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// Authenticate WebSocket connections
io.use(require('./socket/authSocket').authenticateSocket);

// Socket.io event handlers
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  require('./socket/messagingSocket')(io, socket);
  require('./socket/roomSocket')(io, socket);
  require('./socket/typingSocket')(io, socket);
  require('./socket/notificationSocket')(io, socket);
  require('./socket/statusSocket')(io, socket);
  require('./socket/readReceiptSocket')(io, socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
