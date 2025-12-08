import {createContext, useState, useEffect} from 'react';
import strings from '../localization/translations';

export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'fi';
  });

  // Update strings when language changes
  useEffect(() => {
    strings.setLanguage(language);
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fi' ? 'en' : 'fi'));
  };

  return (
    <LanguageContext.Provider
      value={{language, setLanguage, toggleLanguage, strings}}
    >
      {children}
    </LanguageContext.Provider>
  );
};
