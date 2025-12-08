import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
  fi: {
    // Navigation
    nav: {
      home: 'Koti',
      menu: 'Menu',
      admin: 'Ylläpito',
      history: 'Historia',
      profile: 'Profiili',
      login: 'Kirjaudu',
      cart: 'Ostoskori',
    },

    // Home page
    home: {
      tagline: 'Pieni pala Meksikoa keskellä Helsinkiä',
      register: 'Rekisteröidy',
    },

    // Menu categories page
    menu: {
      All: 'Kaikki',
      mains: 'Pääruoat',
      snacks: 'Snacks',
      desserts: 'Jälkiruoat',
      drinks: 'Juomat',
    },

    //Contact info
    contact: {
      openingHours: 'Aukioloajat',
      address: 'Osoite',
      email: 'Sähköposti',
      phone: 'Puhelinnumero',
    },

    // Weather
    weather: {
      weather: 'Sää',
      loading: 'Ladataan säätietoja...',
      humidity: 'Kosteus',
      wind: 'Tuuli',
      visibility: 'Näkyyvyys',
      updated: 'Päivitetty',
      feelsLike: 'Tuntuu kuin',
    },

    // Common
    common: {
      add: 'Lisää',
      edit: 'Muokkaa',
      delete: 'Poistaa',
      save: 'Tallenna',
      cancel: 'Peruuta',
      confirm: 'Vahvista',
    },
  },
});

export default strings;
