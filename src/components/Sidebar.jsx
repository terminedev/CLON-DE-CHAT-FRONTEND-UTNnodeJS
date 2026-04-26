import React, { useState } from 'react';

function Sidebar({ currentUser, allUsers, chats, currentChat, selectChat, handleCreateChat, onLogout }) {
    const [newChatUserId, setNewChatUserId] = useState('');

    // Helper para obtener el nombre del otro participante en la lista
    const getChatName = (chat) => {
        const otherParticipant = chat.participants.find(p => p._id !== currentUser._id);
        return otherParticipant ? otherParticipant.username : 'Chat sin nombre';
    };

    const onCreateClick = () => {
        handleCreateChat(newChatUserId);
        setNewChatUserId(''); // Limpiar el select después de crear
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Hola, {currentUser.username}</h3>
                <button onClick={onLogout}>Salir</button>
            </div>

            <div className="chat-list">
                {chats.map(chat => (
                    <div
                        key={chat._id}
                        className={`chat-item ${currentChat?._id === chat._id ? 'active' : ''}`}
                        onClick={() => selectChat(chat)}
                    >
                        <strong>{getChatName(chat)}</strong>
                    </div>
                ))}
            </div>

            <div className="new-chat-section">
                <h4>Iniciar nuevo chat</h4>
                <select value={newChatUserId} onChange={(e) => setNewChatUserId(e.target.value)}>
                    <option value="">Seleccionar contacto...</option>
                    {allUsers.filter(u => u._id !== currentUser._id).map(u => (
                        <option key={u._id} value={u._id}>{u.username}</option>
                    ))}
                </select>
                <button
                    onClick={onCreateClick}
                    style={{ padding: '8px', cursor: 'pointer', background: '#00a884', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                    Crear Chat
                </button>
            </div>
        </div>
    );
}

export default Sidebar;