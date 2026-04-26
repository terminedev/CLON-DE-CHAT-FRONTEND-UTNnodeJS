import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../api/api.js';

function ChatRoom({ currentUser, currentChat, messages, setMessages }) {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentChat) return;

        try {
            const msg = await sendMessage(currentChat._id, currentUser._id, newMessage);
            // Actualizamos el historial simulando populate
            const messageToState = {
                ...msg,
                senderId: { _id: currentUser._id, username: currentUser.username }
            };
            setMessages([...messages, messageToState]);
            setNewMessage('');
        } catch (error) {
            alert("Error al enviar mensaje");
        }
    };

    const getChatName = (chat) => {
        const otherParticipant = chat.participants.find(p => p._id !== currentUser._id);
        return otherParticipant ? otherParticipant.username : 'Chat sin nombre';
    };

    if (!currentChat) {
        return (
            <div className="chat-room" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#667781' }}>
                <h2>Selecciona un chat para empezar a enviar mensajes</h2>
            </div>
        );
    }

    return (
        <div className="chat-room">
            <div className="chat-header">
                Chat con {getChatName(currentChat)}
            </div>

            <div className="messages-container">
                {messages.map(msg => (
                    <div key={msg._id} className={`message ${msg.senderId?._id === currentUser._id ? 'mine' : ''}`}>
                        {msg.senderId?._id !== currentUser._id && (
                            <div className="message-sender">{msg.senderId?.username}</div>
                        )}
                        <div>{msg.content}</div>
                        <span className="message-time">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="input-area" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default ChatRoom;