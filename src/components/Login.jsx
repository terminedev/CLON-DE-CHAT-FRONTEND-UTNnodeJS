import React, { useState } from 'react';
import { createUser, deleteUser } from '../api/api.js'; // Importamos deleteUser

function Login({ allUsers, setCurrentUser, reloadUsers }) {
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const user = allUsers.find(u => u._id === selectedUserId);
        if (user) setCurrentUser(user);
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const user = await createUser(newUsername, newEmail);
            setCurrentUser(user.data);
            reloadUsers(); // Refrescar lista global
        } catch (error) {
            alert("Error al crear usuario. Revisa que el email o nombre no estén duplicados.");
        }
    };

    // NUEVA FUNCIÓN: Manejar la eliminación del usuario
    const handleDeleteUser = async () => {
        if (!selectedUserId) {
            alert("Por favor, selecciona un usuario de la lista primero.");
            return;
        }

        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmDelete) {
            try {
                await deleteUser(selectedUserId);
                setSelectedUserId(''); // Limpiar la selección
                reloadUsers(); // Refrescar lista global para que desaparezca
                alert("Usuario eliminado con éxito.");
            } catch (error) {
                alert("Error al eliminar el usuario: " + error.message);
            }
        }
    };

    return (
        <div className="app-container login-screen">
            <div className="login-box">
                <h2>Simulador de Login</h2>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} required>
                        <option value="" disabled>Selecciona un usuario existente</option>
                        {allUsers.map(u => <option key={u._id} value={u._id}>{u.username} ({u.email})</option>)}
                    </select>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" style={{ flex: 1 }}>Ingresar</button>
                        {/* NUEVO BOTÓN: Eliminar usuario */}
                        <button
                            type="button"
                            onClick={handleDeleteUser}
                            style={{ flex: 1, background: '#dc3545', color: 'white' }}
                        >
                            Eliminar
                        </button>
                    </div>
                </form>

                <hr style={{ margin: '15px 0' }} />

                <h3>O crea uno nuevo</h3>
                <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input type="text" placeholder="Username" value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
                    <input type="email" placeholder="Email" value={newEmail} onChange={e => setNewEmail(e.target.value)} required />
                    <button type="submit">Crear y Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;