import { FC, useState } from 'react';
import { connect } from 'socket.io-client';
import Chat from './chat';

const socket = connect('http://localhost:8080');

const App: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [isInChatRoom, setisInChatRoom] = useState<boolean>(false);

  const joinRoomHandler = () => {
    if (username !== '' && roomId !== '') {
      socket.emit('join_room', roomId);
      setisInChatRoom(true);
    }
  };

  const joiningFormTsx = (
    <>
      <h1 className='uppercase text-4xl text-green-700 my-3'>Join A Chat</h1>
      <input
        className='my-3 shadow appearance-none border rounded w-1/4 min-w-max  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id='username'
        type='text'
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder='Username'
      />
      <input
        className='my-3 shadow appearance-none border rounded w-1/4 py-2 px-3 min-w-max  text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        type='text'
        id='roomId'
        value={roomId}
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
        placeholder='RoomId'
      />
      <button
        type='button'
        className='text-white bg-gradient-to-br from-green-700 to-blue-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-700 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-3'
        onClick={joinRoomHandler}>
        JOIN ROOM
      </button>
    </>
  );

  return (
    <div className='flex flex-col justify-center items-center bg-green-100 w-auton h-screen'>
      {!isInChatRoom ? joiningFormTsx : <Chat />}
    </div>
  );
};

export default App;
