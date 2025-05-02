import React, { useContext, useState } from 'react';
import { ColorContext } from '../context/ColorContext';
import '../App.css'

const ChatBotWidget = () => {
  const { color, colorOfChat, welcomeText1, welcomeText2 } = useContext(ColorContext);

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]); // No welcomeText1/2 here


  const handleSend = () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);

    // Optional: Simulated bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Thanks for your message!", sender: 'bot' }]);
    }, 600);

    setInputMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='chat-widget-container' style={{ height: 500, width: 300, marginTop: 100, marginLeft: 150, backgroundColor: colorOfChat, padding: 20, position: 'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', backgroundColor: color, width: 338, height: 50, margin: '-20px' }}>
        <img src="./IconStatus.png" alt="" style={{ height: 30, width: 30, marginLeft: 20 }} />
        <h5 style={{ color: 'white' }}>Hubly</h5>
        
      </div>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center',  maxHeight: 150, // Adjust based on your layout
    overflowY: 'auto',
    marginTop: 10,
    paddingRight: 10,}}>
        <img src="./IconStatus.png" alt="" style={{ height: 30, width: 30, marginTop: 5 }} />
        <div style={{ marginTop: 40 }}>
          <p style={{ backgroundColor: 'white', fontSize: 10, borderRadius: 5, padding: 10, width: 150 }}>
            {welcomeText1}
          </p>
          <p style={{ backgroundColor: 'white', fontSize: 10, borderRadius: 5, padding: 10, width: 150 }}>
            {welcomeText2}
          </p>
        </div>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: 10, padding: 10, width: 190, height: 210, marginTop: 15, marginLeft: 90, fontSize: 10 }}>
        <p>Introduce Yourself</p>
        <form>
          <label style={{ color: '#C3C3C3', fontSize: 8 }}>Your Name</label><br />
          <input type="text" placeholder="Your name" style={{ border: 'none', fontSize: 10 }} />
          <hr style={{ marginTop: 5, marginBottom: 10 }} />

          <label style={{ color: '#C3C3C3', fontSize: 8 }}>Your Phone</label><br />
          <input type="number" placeholder="+91 987654321" style={{ border: 'none', fontSize: 10 }} />
          <hr style={{ marginBottom: 10 }} />

          <label style={{ color: '#C3C3C3', fontSize: 8 }}>Your Email</label><br />
          <input type="email" placeholder="example@gmail.com" style={{ border: 'none', fontSize: 10 }} />
          <hr style={{ marginBottom: 10 }} />
        </form>

        <button style={{ backgroundColor: '#184E7F', color: 'white', border: 'none', borderRadius: 5, width: 150, marginLeft: 10, height: 20, fontSize: 10, cursor: 'pointer' }}>
          Thank You!
        </button>
      </div>

      {/* Message list */}
 {/* Message list */}
<div style={{
  height: 120,
  overflowY: 'auto',
  marginTop: 10,
  paddingRight: 10,
  borderRadius: 5,
  padding: 5
}}>
  {messages.map((msg, idx) => (
    <div
      key={idx}
      style={{
        display: 'flex',
        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
        marginTop: 5,
      }}
    >
      <p style={{
        backgroundColor: msg.sender === 'user' ? '#D1E7FF' : '#F0F0F0',
        fontSize: 10,
        borderRadius: 5,
        padding: 10,
        maxWidth: 180,
        wordWrap: 'break-word',
      }}>
        {msg.text}
      </p>
    </div>
  ))}
</div>


      

      {/* Message input */}
     <div style={{ display: 'flex', marginTop: -15 ,width:340,marginLeft:-17,position:'relative'}}>
  <textarea
    value={inputMessage}
    onChange={(e) => setInputMessage(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder="Write a message here..."
    style={{ border: 'none', fontSize: 10, flex: 1, height: 40, padding: 5 }}
  />
  <img
    onClick={handleSend}
    src="./Send.png"
    alt="Send"
    style={{ height: 30, width: 30, cursor: 'pointer',position:'absolute',right:0 }}
  />
</div>
    </div>
  );
};

export default ChatBotWidget;
