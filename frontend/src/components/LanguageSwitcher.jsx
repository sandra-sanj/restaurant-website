import {useLanguage} from '../hooks/useLanguage';

const LanguageSwitcher = () => {
  const {language, toggleLanguage} = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-2 py-1 rounded hover:bg-stone-100! transition"
      title={language === 'fi' ? 'Switch to English' : 'Vaihda Suomeksi'}
    >
      {language === 'fi' ? (
        <>
          <span className="text-base">🇬🇧</span>
          <span className="text-md font-semibold">EN</span>
        </>
      ) : (
        <>
          <span className="text-base">🇫🇮</span>
          <span className="text-md font-semibold">FI</span>
        </>
      )}
    </button>
  );
};

export default LanguageSwitcher;
