import { useState, useRef, useEffect } from 'react';
import '../styles/Chat.css';
import io from 'socket.io-client';

const Chat = () => {
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if a socket is already in the state
    if (socket === null) {
      // Attempt to retrieve the socket information from localStorage
      const socketInfo = JSON.parse(localStorage.getItem('socketInfo'));
      if (socketInfo) {
        // Use the socket information to create a new socket
        const newSocket = io.connect('http://localhost:3001', {
          query: {
            id: socketInfo.id,
            username: socketInfo.username,
          },
        });

        setSocket(newSocket);

        // Set the username in the local state
        setUsername(socketInfo.username);
        console.log('Username set:', socketInfo.username); // Add this line
      }
    }

    // Listen for incoming messages
    if (socket) {
      socket.on('receive_message', (data) => {
        setMessageList((current) => [...current, data]);
      });

      // Listen for username updates
      socket.on('set_username', (newUsername) => {
        setUsername(newUsername);
        console.log('Username updated:', newUsername); // Add this line
      });
    }

    // Fetch messages when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3001/messages');
        const messages = await response.json();
    
        // Sort messages based on messageID in ascending order
        const sortedMessages = messages.sort((a, b) => a.messageID - b.messageID);
    
        setMessageList(sortedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error.message);
      }
    };
    

    fetchMessages();

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        socket.off('receive_message');
        socket.off('set_username');
        // Disconnect the socket if needed
        // socket.disconnect();
      }
    };
  }, [socket]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken')
    const user = JSON.parse(atob(token.split('.')[1]))
    const message = messageRef.current.value;
    if (!message.trim()) return;
  
    try {
      // Send the message to the server to store in the database
      const response = await fetch('http://localhost:3001/messages/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message,
          userID: user.userId
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to store message in the database');
      }
  
      // Emit the message to other clients through the socket
      if (socket) {
        console.log('Emitting message with username:', username);
        socket.emit('message', { text: message, author: username });
      }
  
      clearInput();
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };
  

  const clearInput = () => {
    messageRef.current.value = '';
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div id='chat-main'>
      <div id="chat-display-and-text-area">
        <div id="first-area">
          <div id="message-display-area">
            {messageList.map((message, index) => (
              <p id='message' key={index} className={message.author === username ? 'sent' : 'received'}>
                <div id="sender">{message.author}</div>
                {message.text}
              </p>
            ))}
          </div>
        </div>
        <div id="message-area-and-button">
          <textarea id='write-message-button' type='text' ref={messageRef} onKeyDown={(e) => handleKeyPress(e)} />
          <button id='send-message-button' onClick={handleSubmit}>Enviar Mensagem</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
