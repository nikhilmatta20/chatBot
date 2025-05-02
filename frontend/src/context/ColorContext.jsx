import React, { createContext, useState, useEffect } from 'react';

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState(() => {
    return localStorage.getItem('selectedColor') || '#33475B';
  });

  const [colorOfChat, setColorOfChat] = useState(() => {
    return localStorage.getItem('colorOfChat') || '#EEEEEE';
  });

  const [welcomeText1, setWelcomeText1] = useState(() => {
    return localStorage.getItem('welcomeText1') || 'How can I help you?';
 });

 const [welcomeText2, setWelcomeText2] = useState(() => {
    return localStorage.getItem('welcomeText2') || 'Ask me anything!';
  });

  const [welcomeText3, setWelcomeText3] = useState(() => {
  return (
    localStorage.getItem('welcomeText3') ||
    "👋 Want to chat about Hubly? I'm <br />an chatbot here to help you find <br />your way."
  );
});

  


  // Persist main color
  useEffect(() => {
    localStorage.setItem('selectedColor', color);
  }, [color]);

  // Persist chat background color
  useEffect(() => {
    localStorage.setItem('colorOfChat', colorOfChat);
  }, [colorOfChat]);

  // Persist welcome text
  useEffect(() => {
    localStorage.setItem('welcomeText1', welcomeText1);
    localStorage.setItem('welcomeText2', welcomeText2);
  }, [welcomeText1, welcomeText2]);

  useEffect(() => {
  localStorage.setItem('welcomeText3', welcomeText3);
}, [welcomeText3]);


  return (
    <ColorContext.Provider value={{ color, setColor, colorOfChat, setColorOfChat, welcomeText1, setWelcomeText1, welcomeText2, setWelcomeText2,welcomeText3, setWelcomeText3 }}>
      {children}
    </ColorContext.Provider>
  );
};
