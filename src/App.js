import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import UserPage from './UserPage'
import './App.css';


function App() {
  const [userId, setUserId] = useState(null);

  // Load userId from localStorage when the page is loaded
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogin = (id) => {
    // Save userId to localStorage when the user logs in
    localStorage.setItem('userId', id);
    setUserId(id);
  };

  const handleLogout = () => {
    // Remove userId from localStorage when the user logs out
    localStorage.removeItem('userId');
    setUserId(null);
  };

  return (
     <div className="App">
     {userId ? <UserPage userId={userId} onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />}
   </div>

  );
}

export default App;
