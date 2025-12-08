import {HashLink} from 'react-router-hash-link';
import Contacts from './home/Contacts';
import WeatherWidget from './WeatherWidget';

function Footer() {
  return (
    <footer className="w-full h-[420px] bg-[#2A4B11] text-white overflow-hidden bottom-0">
      <div className="flex flex-row">
        <HashLink smooth to="/#contacts">
          Contacts
        </HashLink>
        <Contacts />
        <WeatherWidget />
      </div>
    </footer>
  );
}
export default Footer;
