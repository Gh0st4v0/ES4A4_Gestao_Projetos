import { useState } from 'react';
import '../routesStyles/Home.css';
import { useAuth } from '../../AuthContext';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        login(token);
        console.log('Login successful, token:', token);
        navigate('/nav/projects');
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <div id='loginPage'>
      <h1>Login</h1>
      <div id='loginSection'>
        <label id='loginLabel'>Username:</label>
        <input id='loginInput' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div id='loginSection'>
        <label id='loginLabel'>Password:</label>
        <input id='loginInput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button id='loginButton' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Home;
