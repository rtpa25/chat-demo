import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    console.log(`User with id: ${socket.id} joined room: ${data}`);
  });
});

httpServer.listen(8080, () => {
  console.log('listening on port 8080');
});
