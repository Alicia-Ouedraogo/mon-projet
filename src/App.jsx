import React, { useState } from 'react';
import SkipSelector from './pages/SkipSelector';

function App() {
  const [language, setLanguage] = useState('fr'); // état langue

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fr' ? 'en' : 'fr'));
  };

  return (
    <div className="app-container">
      {/* Bouton switch langue */}
      <button
        onClick={toggleLanguage}
        className="p-2 rounded bg-blue-600 text-white fixed top-4 right-4 z-50"
        aria-label="Toggle language"
      >
        {language === 'fr' ? 'EN' : 'FR'}
      </button>

      {/* On passe la langue à SkipSelector */}
      <SkipSelector language={language} />
    </div>
  );
}

export default App;
