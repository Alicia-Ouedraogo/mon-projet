import React from 'react';
import { CheckCircle } from 'lucide-react';

const texts = {
  fr: {
    select: "Sélectionner",
    selected: "Sélectionné",
    size: "Taille",
    duration: "Durée",
    price: "Prix"
  },
  en: {
    select: "Select",
    selected: "Selected",
    size: "Size",
    duration: "Hire Duration",
    price: "Price"
  }
};

const SkipCard = ({ skip, isSelected, onSelect, language }) => {
  const t = texts[language] || texts.en;
  const totalPrice = (skip.price_before_vat * 1.2).toFixed(2);

  return (
    <div
      className={`border rounded p-4 shadow-sm bg-white hover:shadow-md transition-all duration-200 ${
        isSelected ? "border-primary ring-2 ring-primary" : "border-gray-200"
      }`}
    >
      {/* ✅ Ajout de l’image */}
      <img
        src="/skip-image.jpg" // assure-toi que le fichier est bien dans /public
        alt="Image de benne"
        className="w-full h-32 object-contain mb-4"
      />

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-800">
          {skip.size} yards
        </h3>
        {isSelected && <CheckCircle size={20} className="text-primary" />}
      </div>

      <p className="text-sm text-gray-600">
        {t.duration} : {skip.hire_period_days} {language === 'fr' ? "jours" : "days"}
      </p>
      <p className="text-sm text-gray-600">
        {t.price} : £{totalPrice}
      </p>

      <button
        onClick={onSelect}
        className={`mt-4 w-full py-2 text-sm font-semibold rounded ${
          isSelected
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {isSelected ? t.selected : t.select}
      </button>
    </div>
  );
};

export default SkipCard;
