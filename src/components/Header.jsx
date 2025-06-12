import React from 'react';
import { useLang } from '../LangContext';
import { translations } from '../translations';
import { FaMapMarkerAlt, FaTrashAlt, FaBoxOpen, FaCheck, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';

const Header = () => {
  const { lang, toggleLang } = useLang();
  const t = translations[lang];

  return (
    <header className="flex flex-col gap-3 p-4 border-b">
      <button onClick={toggleLang} className="self-end px-3 py-1 border rounded">
        {lang === 'fr' ? 'English' : 'Français'}
      </button>

      <div className="flex gap-6 text-lg font-semibold items-center">
        <div className="flex items-center gap-2 text-primary">
          <FaMapMarkerAlt color="blue" />
          {t.postcode}
        </div>
        <div className="flex items-center gap-2 text-primary">
          <FaTrashAlt color="green" />
          {t.wasteType}
        </div>
        <div className="flex items-center gap-2 text-primary">
          <FaBoxOpen color="orange" />
          {t.selectSkip}
        </div>
      </div>

      <div className="flex gap-6 text-lg font-semibold items-center text-gray-500">
        <div className="flex items-center gap-2">
          <FaCheck />
          {t.permitCheck}
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt />
          {t.chooseDate}
        </div>
        <div className="flex items-center gap-2">
          <FaCreditCard />
          {t.payment}
        </div>
      </div>
    </header>
  );
};

export default Header;
