import React, { createContext, useState } from 'react';

// Create Context
export const CustomizationContext = createContext();

export const CustomizationProvider = ({ children }) => {
  const [headerColor, setHeaderColor] = useState('#33475B');
  const [backgroundColor, setBackgroundColor] = useState('#EEEEEE');
  const [welcomeMessages, setWelcomeMessages] = useState({
    line1: 'How can I help you?',
    line2: 'Ask me anything!',
  });
  const [formLabels, setFormLabels] = useState({
    name: 'Your Name',
    phone: 'Your Phone',
    email: 'Your Email',
  });

  return (
    <CustomizationContext.Provider
      value={{
        headerColor,
        setHeaderColor,
        backgroundColor,
        setBackgroundColor,
        welcomeMessages,
        setWelcomeMessages,
        formLabels,
        setFormLabels,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};
