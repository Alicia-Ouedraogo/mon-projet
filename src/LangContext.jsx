import React, { createContext, useState, useContext } from 'react';

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('fr');

  const toggleLang = () => {
    setLang(prev => (prev === 'fr' ? 'en' : 'fr'));
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
