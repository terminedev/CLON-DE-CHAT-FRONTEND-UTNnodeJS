import React, { useState, useEffect } from 'react';
import { getUsers } from './api/api.js';
import Login from './components/Login';
import ChatDashboard from './components/ChatDashboard';
import './styles/styles.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const users = await getUsers();
      setAllUsers(users.data);
    } catch (error) {
      alert("Error al cargar usuarios: " + error.message);
    }
  };

  // Si no hay usuario logueado, mostramos la pantalla de Login
  if (!currentUser) {
    return (
      <Login
        allUsers={allUsers}
        setCurrentUser={setCurrentUser}
        reloadUsers={loadUsers}
      />
    );
  }

  // Si hay usuario logueado, mostramos el Dashboard del chat
  return (
    <ChatDashboard
      currentUser={currentUser}
      allUsers={allUsers}
      setCurrentUser={setCurrentUser}
    />
  );
}

export default App;