import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

interface Message {
  roomId: string;
  author: string;
  message: string;
  time: string;
}

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
    socket.join(data);
  });

  socket.on('send_message', (data: Message) => {
    console.log(data);
    socket.to(data.roomId).emit('receive_message', data);
  });
});

httpServer.listen(8080, () => {
  console.log('listening on port 8080');
});
