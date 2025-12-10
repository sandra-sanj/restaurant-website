import Contacts from './home/Contacts';
import WeatherWidget from './WeatherWidget';

function Footer() {
  return (
    <footer 
    className="w-full bg-[#2A4B11] text-white"> {/* h-[420px]*/}
      <div className="flex flex-col sm:flex-row justify-center items-center content-center px-5 mx-auto max-w-[900px]"> {/* h-[420px]*/}
        <Contacts className="w-full sm:w-1/2" />
        <WeatherWidget className="w-full sm:w-1/2" />
      </div>
    </footer>
  );
}
export default Footer;
