import React from 'react';
import {useLanguage} from '../../hooks/useLanguage';

const Contacts = () => {
  const {strings} = useLanguage();
  return (
    <div>
      <div className="mt-4 mb-4">
        <h3>{strings.home.contacts}</h3>
        <p>{strings.home.openingHours}:</p>
        <p>{strings.home.maPe}: 11-22</p>
        <p>{strings.home.la}: 12-22</p>
        <p>
          {strings.home.su}: {strings.home.closed}
        </p>
        <p>{strings.home.address}: Kalevankatu 21, 00100 Helsinki</p>
        <p>{strings.home.email}: info@taqueria21.fi</p>
        <p>{strings.home.phone}: +358 7776669</p>
      </div>
    </div>
  );
};

export default Contacts;
