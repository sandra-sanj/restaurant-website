import {createContext, useState} from 'react';
import strings from '../localization/translations';

const LanguageContext = createContext();

const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language') || 'fi';
    strings.setLanguage(saved);
    return saved;
  });

  const toggleLanguage = () => {
    const newLang = language === 'fi' ? 'en' : 'fi';
    strings.setLanguage(newLang);
    localStorage.setItem('language', newLang);
    setLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{language, toggleLanguage, strings}}>
      {children}
    </LanguageContext.Provider>
  );
};

export {LanguageContext, LanguageProvider};
