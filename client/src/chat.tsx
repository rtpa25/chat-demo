import { FC, useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Socket } from 'socket.io-client';

interface ChatPageProps {
  roomId: string;
  socket: Socket;
  currentUser: string;
}

interface Message {
  roomId: string;
  author: string;
  message: string;
  time: string;
}

const Chat: FC<ChatPageProps> = ({ roomId, socket, currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>('');

  const sendMessageHadnler = async () => {
    if (messageText !== '') {
      const messageData: Message = {
        roomId: roomId,
        author: currentUser,
        message: messageText,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessageText('');
    }
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  console.log(messages);

  return (
    <div className='chat-window bg-slate-50 flex flex-col justify-center items-center'>
      <div className='chat-header h-full'>{`
        Chat Room ${roomId}
      `}</div>
      <div className='chat-body'>
        <ScrollToBottom>
          {messages.map((messageContent) => {
            return (
              <div
                className='message'
                id={currentUser === messageContent.author ? 'you' : 'other'}>
                <div>
                  <div className='message-content'>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className='message-meta'>
                    <p id='time'>{messageContent.time}</p>
                    <p id='author'>{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessageHadnler();
          }}
        />
        <button onClick={sendMessageHadnler}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
