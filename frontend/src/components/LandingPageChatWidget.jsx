import React, { useState, useContext } from 'react';
  import { ColorContext } from '../context/ColorContext';

import axios from 'axios';

const LandingPageChatWidget = () => {
  const { color, colorOfChat ,welcomeText1, welcomeText2 } = useContext(ColorContext);
  
  const [userMessage, setUserMessage] = useState('');


  const [messages, setMessages] = useState([
    { sender: 'bot', text: welcomeText1},
    { sender: 'bot', text: welcomeText2},
  ]);
  const [inputText, setInputText] = useState('');
  
  // New states for form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isTicketCreated, setIsTicketCreated] = useState(false);  // Track ticket creation

  const handleSendMessage = () => {
  if (inputText.trim() === '') return;

  const newMessages = [
    ...messages,
    { sender: 'user', text: inputText },
    { sender: 'bot', type: 'form' }
  ];
  setMessages(newMessages);
  setUserMessage(inputText);  // ✅ Save the user's first message
  setInputText('');
};


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !phone || !email) {
      alert("Please fill out all fields.");
      return;
    }

    const ticketData = {
      name,
      phone,
      email,
      message: userMessage,  // Include the user's message with the form data
    };

    try {
      // Send the data to the backend
      await axios.post('http://localhost:8000/api/landinguser/submit', ticketData);
      setMessages([
        ...messages,
        { sender: 'bot', text: 'Thank you! Your ticket has been created successfully.' }
      ]);
      setIsTicketCreated(true);  // Mark ticket as created
      setName('');
      setPhone('');
      setEmail('');
      setInputText('');
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket');
    }
  };

  return (
    <div className='landing-chat-widget-container mobile-visible' style={{ height: 450, width: 300, backgroundColor: colorOfChat, padding: 20, position: 'relative' }}>
      {/* Header */}
      <div style={{ position: 'sticky', display: 'flex', gap: 20, alignItems: 'center', backgroundColor: color, width: 338, height: 50, margin: '-20px' }}>
        <img src="./IconStatus.png" alt="" style={{ height: 30, width: 30, marginLeft: 20 }} />
        <h5 style={{ color: 'white' }}>Hubly</h5>
      </div>

      {/* Messages */}
      <div style={{ height: 300, overflowY: 'auto', padding: '8px 0' }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              marginTop: 20,
              fontSize: 10,
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 10
            }}
          >
            {msg.type === 'form' && !isTicketCreated ? (  // Show form only if ticket is not created
              <div style={{ backgroundColor: 'white', borderRadius: 10, padding: 10, width: 190, fontSize: 10 }}>
                <p>Introduce Yourself</p>
                <form onSubmit={handleFormSubmit}>
                  <label style={{ color: '#C3C3C3', fontSize: 8 }}>Your Name</label><br />
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    style={{ border: 'none', fontSize: 10, width: '100%' }} 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                  <hr />

                  <label style={{ color: '#C3C3C3', fontSize: 8 }}>Your Phone</label><br />
                  <input 
                    type="number" 
                    placeholder="+91 987654321" 
                    style={{ border: 'none', fontSize: 10, width: '100%' }} 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                  />
                  <hr />

                  <label style={{ color: '#C3C3C3', fontSize: 8 }}>Your Email</label><br />
                  <input 
                    type="email" 
                    placeholder="example@gmail.com" 
                    style={{ border: 'none', fontSize: 10, width: '100%' }} 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                  <hr />

                  {/* Submit Button */}
                  <button 
                    style={{ marginTop: 5, marginLeft: 10, backgroundColor: '#184E7F', color: 'white', fontSize: 10, border: 'none', borderRadius: 5, padding: '5px 10px', width: 150, cursor: 'pointer' }}
                    type="submit"
                  >
                    Thank You!
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ backgroundColor: msg.sender === 'user' ? '#184E7F' : 'white', color: msg.sender === 'user' ? 'white' : 'black', padding: 10, borderRadius: 10, maxWidth: '70%' }}>
                {msg.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Text input and send button */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, position: 'relative' }}>
        <textarea
          placeholder="Write a message here..."
          style={{ border: 'none', fontSize: 10, width: 320, height: 28, padding: 5, marginLeft: -16, marginRight: -15 }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <img
          src="./Send.png"
          alt=""
          style={{ height: 35, width: 35, marginLeft: 10, cursor: 'pointer', position: 'absolute', bottom: 5, right: 30 }}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default LandingPageChatWidget;
