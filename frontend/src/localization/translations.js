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

      newItemLabel: 'Uutuus',
      newItemName: 'Katkaraputaco',
      chefFavoriteLabel: 'Kokin suosikki',
      chefFavoriteName: 'Burrito bowl',
      menuTitle: 'MENU',
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
      noAccount: 'Eikö vielä tiliä?',
      hasAccount: 'Oletko jo jäsen?',
      saveButton: 'Tallenna',
      login: 'Kirjaudu sisään!',
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

    // Admin page
    admin: {
      title: 'Ylläpito',
      openOrders: 'Avoimet tilaukset',
      orderId: 'Tilauksen id',
      product: 'Tuote',
      details: 'Lisätiedot',
      quantity: 'Määrä',
      done: 'Tehty',
      editMenu: 'Muokkaa ruokalistaa',
      loadingOrders: 'Ladataan tilauksia...',

      // Admin History
      history: 'Tilaushistoria',
      todayOrders: 'Tämän päivän tilaukset',
      allOrders: 'Kaikki tilaukset',
      orderDate: 'Tilauspäivä',
      totalOrders: 'Tilauksia yhteensä',
      id: 'Id',
    },

    // Buttons/actions
    actions: {
      addItem: 'Lisää tuote',
      editItem: 'Muokkaa tuotetta',
      deleteItem: 'Poista tuote',
      close: 'Sulje',
      filter: 'Suodata',
      today: 'Tänään',
      all: 'Kaikki',
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

      newItemLabel: 'New item',
      newItemName: 'Shrimp Taco',
      chefFavoriteLabel: "Chef's Favorite",
      chefFavoriteName: 'Burrito bowl',
      menuTitle: 'MENU',
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
      noAccount: "Don't have an account yet",
      hasAccount: 'Already have an account?',
      saveButton: 'Save',
      login: 'Sign In!',
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

    // Admin page
    admin: {
      title: 'Admin',
      openOrders: 'Open Orders',
      orderId: 'Order ID',
      product: 'Product',
      details: 'Details',
      quantity: 'Quantity',
      done: 'Done',
      editMenu: 'Edit Menu',
      loadingOrders: 'Loading orders...',

      // Admin History
      history: 'Order History',
      todayOrders: "Today's Orders",
      allOrders: 'All Orders',
      orderDate: 'Order Date',
      totalOrders: 'Total Orders',
      id: 'ID',
    },

    // Buttons/actions
    actions: {
      addItem: 'Add Item',
      editItem: 'Edit Item',
      deleteItem: 'Delete Item',
      close: 'Close',
      filter: 'Filter',
      today: 'Today',
      all: 'All',
    },
  },
});

export default strings;
