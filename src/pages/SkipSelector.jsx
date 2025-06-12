import React, { useEffect, useState } from 'react';
import SkipCard from '../components/SkipCard';
import { MapPin, Trash2, Box, CheckCircle, Calendar, CreditCard, Globe } from 'lucide-react';

const texts = {
  fr: {
    title: "Choisis la taille de ma benne",
    subtitle: "Sélectionnez la taille de la benne qui correspond le mieux à vos besoins",
    headersColored: ["Code postal", "Type de déchets", "Choisir la benne"],
    headersGrey: ["Vérification du permis", "Choisir la date", "Paiement"],
    btnContinue: "Continuer",
    btnBack: "← Retour",
    toggleLang: "English",
    resumeTitle: "Résumé de la benne sélectionnée",
    size: "Taille",
    duration: "Durée",
    price: "Prix TTC"
  },
  en: {
    title: "Select your skip size",
    subtitle: "Select the skip size that best suits your needs",
    headersColored: ["Postcode", "Waste type", "Select skip"],
    headersGrey: ["Permit check", "Choose date", "Payment"],
    btnContinue: "Continue",
    btnBack: "← Back",
    toggleLang: "Français",
    resumeTitle: "Selected Skip Summary",
    size: "Size",
    duration: "Hire Duration",
    price: "Total Price"
  }
};

const iconColored = [MapPin, Trash2, Box];
const iconGrey = [CheckCircle, Calendar, CreditCard];

const SkipSelector = () => {
  const [skips, setSkips] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [language, setLanguage] = useState("fr");

  useEffect(() => {
    fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft")
      .then(res => res.json())
      .then(data => {
        setSkips(data);
      });
  }, []);

  const selectedSkip = skips.find((s) => s.id === selectedId);
  const t = texts[language];

  return (
    <div className="min-h-screen bg-grayLight p-6">
      {/* Lang switch */}
      <button
        onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
        className="mb-4 px-3 py-1 border rounded text-sm hover:bg-gray-200"
        aria-label="Changer la langue"
      >
        <Globe className="inline mr-2" size={16} /> {t.toggleLang}
      </button>

      {/* Étapes avec icônes */}
      <div className="mb-6 grid grid-cols-6 gap-4 text-center font-semibold">
        {t.headersColored.map((label, i) => {
          const Icon = iconColored[i];
          return (
            <div key={label} className="flex flex-col items-center text-primary">
              <Icon size={24} />
              <span>{label}</span>
            </div>
          );
        })}
        {t.headersGrey.map((label, i) => {
          const Icon = iconGrey[i];
          return (
            <div key={label} className="flex flex-col items-center text-gray-400">
              <Icon size={24} />
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      {/* Titres */}
      <h1 className="text-2xl font-bold text-grayDark mb-1">{t.title}</h1>
      <p className="text-gray-600 mb-6">{t.subtitle}</p>

      {/* Liste de bennes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skips.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            isSelected={selectedId === skip.id}
            onSelect={() => setSelectedId(skip.id)}
            language={language}
          />
        ))}
      </div>

      {/* Résumé sélection */}
      {selectedSkip && (
        <div className="mt-6 p-4 bg-white rounded shadow text-sm border border-primary/20">
          <h2 className="font-bold mb-3 text-primary text-base flex items-center gap-2">
            <CheckCircle className="text-primary" size={18} /> {t.resumeTitle}
          </h2>
          <p><strong>{t.size}:</strong> {selectedSkip.size} yards</p>
          <p><strong>{t.duration}:</strong> {selectedSkip.hire_period_days} {language === "fr" ? "jours" : "days"}</p>
          <p><strong>{t.price}:</strong> £{(selectedSkip.price_before_vat * 1.2).toFixed(2)}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button className="text-primary underline" onClick={() => window.history.back()}>{t.btnBack}</button>
        <button
          disabled={!selectedId}
          aria-disabled={!selectedId}
          title={!selectedId ? (language === 'fr' ? 'Veuillez sélectionner une benne' : 'Please select a skip') : ''}
          className={`px-4 py-2 rounded text-white transition ${
            selectedId ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {t.btnContinue}
        </button>
      </div>
    </div>
  );
};

export default SkipSelector;
