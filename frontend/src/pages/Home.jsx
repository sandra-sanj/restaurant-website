import {useNavigate} from 'react-router';
import {useLanguage} from '../hooks/useLanguage';
import Login from './Login';
import {Button} from '@/components/ui/button';
import WeatherWidget from '../components/WeatherWidget';
import Contacts from '../components/home/Contacts';

//TODO: varmista että navigaatio oikeaan osoitteeseen
// sitten ehkä oma funktio
function Home() {
  const navigate = useNavigate();

  const {strings} = useLanguage();

  const imgSrc = '/images/';

  return (
    <>
      <div>
        <h1 className="p-5">Taqueria 21</h1>
        <p className="mb-5 text-lg">{strings.home.tagline}</p>
      </div>
      <div>
        <button
          onClick={() => navigate('/login')}
          className="bg-[#982A2A]! text-white hover:bg-[#792121]!"
        >
          {strings.nav.login}
        </button>
        <button
          onClick={() => navigate('/login/register')}
          className="bg-[#982A2A]! text-white hover:bg-[#792121]!"
        >
          {strings.home.register}
        </button>
      </div>
      <div className="ad-div">
        <div>
          <img
            src={imgSrc + '/home/home1.jpg'}
            alt=""
            width="200"
            height="500"
            onClick={() => navigate('/menu')}
          />
          <p>Lounasmenu</p>
        </div>
        <div>
          <img
            src={imgSrc + '/home/home2.jpg'}
            alt=""
            width="200"
            height="500"
            onClick={() => navigate('/menu')}
          />
          <p>Uutuus: katkaraputaco</p>
        </div>
        <div>
          <img
            src={imgSrc + '/home/home3.jpg'}
            alt=""
            width="200"
            height="500"
            onClick={() => navigate('/menu')}
          />
          <p>Joku teksti</p>
        </div>
      </div>
      <h3>MENU</h3>
      <div className="container-home mb-15">
        <div>
          <img
            src={imgSrc + '/home/mains.jpg'}
            alt=""
            onClick={() => navigate('/menu/mains')}
          />
          <p>{strings.menu.mains.toUpperCase()}</p>
        </div>
        <div>
          <img
            src={imgSrc + '/home/snacks.jpg'}
            alt=""
            onClick={() => navigate('/menu/snacks')}
          />
          <p>{strings.menu.snacks.toUpperCase()}</p>
        </div>
        <div>
          <img
            src={imgSrc + '/home/desserts.jpg'}
            alt=""
            onClick={() => navigate('/menu/desserts')}
          />
          <p>{strings.menu.desserts.toUpperCase()}</p>
        </div>
        <div>
          <img
            src={imgSrc + '/home/drinks.jpg'}
            alt=""
            onClick={() => navigate('/menu/drinks')}
          />
          <p>{strings.menu.drinks.toUpperCase()}</p>
        </div>
      </div>
    </>
  );
}
export default Home;
