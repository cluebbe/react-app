import React, { useState } from 'react';
import useAuth from './useAuth';

const Dashboard = () => {
  const { isAuthenticated, userRole } = useAuth();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get credentials from localStorage
  const authToken = localStorage.getItem('authToken');

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${authToken}`,
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      if (response.ok && data.response) {
        setChatHistory([
          ...chatHistory,
          { role: 'user', content: message },
          { role: 'assistant', content: data.response.choices?.[0]?.message?.content || 'No response' },
        ]);
        setMessage('');
      } else {
        setError(data.error || 'Error sending message');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return <p className="message">Please log in to view the dashboard.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userRole}! This is your dashboard.</p>
      <div className="dashboard-chat">
        <h2>Chat</h2>
        <div className="chat-history" style={{ marginBottom: '1em', maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '1em' }}>
          {chatHistory.map((msg, idx) => (
            <div key={idx} style={{ marginBottom: '0.5em' }}>
              <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} style={{ display: 'flex', gap: '0.5em' }}>
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{ flex: 1 }}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !message}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
        {error && <div style={{ color: 'red', marginTop: '1em' }}>{error}</div>}
      </div>
    </div>
  );
};

export default Dashboard;