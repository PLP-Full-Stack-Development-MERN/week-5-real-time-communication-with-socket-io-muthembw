const express = require('express');
const jwt = require('jsonwebtoken');

exports.authenticateSocket = (socket, next) => {
  const token = socket.handshake.query.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      
      if (err) return next(new Error('Authentication error'));
    }); 
  } 
  else {
    next(new Error('Authentication error'));
  }
};