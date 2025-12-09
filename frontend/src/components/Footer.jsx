import Contacts from './home/Contacts';
import WeatherWidget from './WeatherWidget';

function Footer() {
  return (
    <footer 
    className="w-full h-[420px] bg-[#2A4B11] text-white">
      <div className="flex flex-row justify-center items-center content-center px-5 mx-auto max-w-[900px] h-[420px]">
        <Contacts />
        <WeatherWidget />
      </div>
    </footer>
  );
}
export default Footer;
