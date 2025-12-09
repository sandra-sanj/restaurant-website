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

      //Contact info
      contacts: 'YHTEISTIEDOT',
      openingHours: 'Aukioloajat:',
      maPe: 'ma-pe:',
      la: 'la:',
      su: 'su:',
      closed: 'suljettu',
      address: 'Osoite',
      email: 'Sähköposti',
      phone: 'Puhelinnumero',

      // Weather
      weather: 'Weather',
      loading: 'Loading weather data...',
      humidity: 'Humidity',
      wind: 'Wind',
      visibility: 'Visibility',
      updated: 'Updated',
      feelsLike: 'Feels Like',
    },

    // Menu categories page
    menu: {
      all: 'Kaikki',
      mains: 'Pääruoat',
      snacks: 'Snacks',
      desserts: 'Jälkiruoat',
      drinks: 'Juomat',
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

  // English

  en: {
    // Navigation
    nav: {
      home: 'Home',
      menu: 'Menu',
      admin: 'Admin',
      history: 'History',
      profile: 'Profile',
      login: 'Login',
      cart: 'Cart',
    },

    // Home page
    home: {
      tagline: 'A little piece of Mexico in the heart of Helsinki',
      register: 'Register',

      //Contact info
      contacts: 'CONTACT INFORMATION',
      openingHours: 'Opening Hours:',
      maPe: 'Mon-Fri',
      la: 'Sat',
      su: 'Sun',
      closed: 'closed',
      address: 'Address',
      email: 'Email',
      phone: 'Phone',

      // Weather
      weather: 'Weather',
      loading: 'Loading weather data...',
      humidity: 'Humidity',
      wind: 'Wind',
      visibility: 'Visibility',
      updated: 'Updated',
      feelsLike: 'Feels Like',
    },

    // Menu categories page
    menu: {
      all: 'All',
      mains: 'Mains',
      snacks: 'Snacks',
      desserts: 'Desserts',
      drinks: 'Drinks',
    },

    // Common
    common: {
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
    },
  },
});

export default strings;
