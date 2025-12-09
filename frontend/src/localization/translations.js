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
      contacts: 'YHTEYSTIEDOT',
      openingHours: 'Aukioloajat:',
      maPe: 'ma-pe:',
      la: 'la:',
      su: 'su:',
      closed: 'suljettu',
      address: 'Osoite',
      email: 'Sähköposti',
      phone: 'Puhelinnumero',

      // Weather
      weather: 'Sää',
      loading: 'Ladataan säätietoja...',
      humidity: 'Kosteus',
      wind: 'Tuuli',
      visibility: 'Näkyvyys',
      updated: 'Päivitetty',
      feelsLike: 'Tuntuu kuin',
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

    //Login/Register forms
    auth: {
      loginTitle: 'Kirjaudu sisään!',
      registerTitle: 'Luo käyttäjä',
      username: 'Käyttäjänimi',
      email: 'Sähköposti',
      password: 'Salasana',
      phone: 'Puhelinnumero',
      phoneFormat: 'Puhelinnumero (muoto: +358)',
      loginButton: 'Kirjaudu',
      register: 'Rekisteröidy!',
      registerButton: 'Luo käyttäjä',
      noAcoount: 'Eikö vielä tiliä?',
      hasAccount: 'Oletko jo jäsen?',
      saveButton: 'Tallenna',
      loginButton2: 'Kirjaudu sisään!',
      editTitle: 'Muokkaa käyttäjä',
    },

    profile: {
      title: 'Profiili',
      welcome: 'Moi',
      editProfile: 'Muokkaa profiilia',
      name: 'Nimi',
      email: 'Sähköposti',
      phone: 'Puhelinnumero',
      role: 'Rooli',
      customer: 'asiakas',
      admin: 'ylläpitäjä',
      history: 'Historia',
      payment: 'Maksu',
      paymentMethods: 'Maksutavat',
      noHistory: 'ei vielä historiaa',
      back: 'Takaisin',
      deleteAccount: 'Poista käyttäjä',
      deleteConfirm: 'Halutko varmasti poistaa käyttäjän?',
      logout: 'Kirjaudu ulos',
      save: 'Tallenna',
      cancel: 'Peruuta',
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

    //Login/Register forms
    auth: {
      loginTitle: 'Login!',
      registerTitle: 'Create Account',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      phone: 'Phone Number',
      phoneFormat: 'Phone Number (format: +358)',
      loginButton: 'Login',
      registerButton: 'Create Account',
      register: 'Register!',
      noAcoount: "Don't have an account yet",
      hasAccount: 'Already have an account?',
      saveButton: 'Save',
      loginButton2: 'Sign In!',
      editTitle: 'Edit User',
    },

    // Profile
    profile: {
      title: 'Profile',
      welcome: 'Hi',
      editProfile: 'Edit Profile',
      name: 'Name',
      email: 'Email',
      phone: 'Phone Number',
      role: 'Role',
      customer: 'customer',
      admin: 'admin',
      history: 'History',
      payment: 'Payment',
      paymentMethods: 'Payment Methods',
      noHistory: 'No history yet',
      back: 'Back',
      deleteAccount: 'Delete Account',
      deleteConfirm: 'Do you really want to delete your account?',
      logout: 'Logout',
      save: 'Save',
      cancel: 'Cancel',
    },
  },
});

export default strings;
