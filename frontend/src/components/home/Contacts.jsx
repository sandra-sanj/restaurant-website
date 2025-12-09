import React from 'react';
import {useLanguage} from '../../hooks/useLanguage';

const Contacts = () => {
  const {strings} = useLanguage();
  return (
    <div>
      <div className="mt-4 mb-4 text-md leading-9">
        <h3 className="font-bold text-lg mb-4">{strings.home.contacts}</h3>
        <div className="mb-4">
          <p className="font-bold">{strings.home.openingHours}</p>
          <p>{strings.home.maPe} 11-22</p>
          <p>{strings.home.la} 12-22</p>
          <p>
            {strings.home.su} {strings.home.closed}
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <div className="flex flex-row gap-2">
            <p className="font-bold">{strings.home.address}:</p>
            <p> Kalevankatu 21, 00100 Helsinki</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-bold">{strings.home.email}:</p>
            <p>info@taqueria21.fi</p>
          </div>

          <div className="flex flex-row gap-2">
            <p className="font-bold">{strings.home.phone}:</p>
            <p> +358 7776669</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
