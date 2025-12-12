import {useLanguage} from '../hooks/useLanguage';

const LanguageSwitcher = () => {
  const {language, toggleLanguage} = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-2 py-1 max-sm:text-xs rounded bg-slate-100! hover:bg-stone-200! transition border-stone-400!"
      title={language === 'fi' ? 'Switch to English' : 'Vaihda Suomeksi'}
    >
      {language === 'fi' ? (
        <>
          <span className="text-md font-semibold">EN</span>
        </>
      ) : (
        <>
          <span className="text-md font-semibold">FI</span>
        </>
      )}
    </button>
  );
};

export default LanguageSwitcher;
