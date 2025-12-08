import {useNavigate} from 'react-router';
import Login from './Login';
import {Button} from '@/components/ui/button';
import WeatherWidget from '../components/WeatherWidget';
import Contacts from '../components/home/Contacts';

//TODO: varmista että navigaatio oikeaan osoitteeseen
// sitten ehkä oma funktio
function Home() {
  const navigate = useNavigate();

  const imgSrc = '/images/';

  return (
    <>
      <div>
        <h1 className='p-5'>Taqueria 21</h1>
        <p className='mb-3'>Pieni pala Meksikoa keskellä Helsinkiä</p>
      </div>
      <div>
        <button onClick={() => navigate('/login')}>Kirjaudu</button>
        <button onClick={() => navigate('/login/register')}>
          Rekisteröidy
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
          <p>PÄÄRUOAT</p>
        </div>
        <div>
          <img
            src={imgSrc + '/home/snacks.jpg'}
            alt=""
            onClick={() => navigate('/menu/snacks')}
          />
          <p>SNACKS</p>
        </div>
        <div>
          <img
            src={imgSrc + '/home/desserts.jpg'}
            alt=""
            onClick={() => navigate('/menu/desserts')}
          />
          <p>JÄLKIRUOAT</p>
        </div>
        <div>
          <img
            src={imgSrc + '/home/drinks.jpg'}
            alt=""
            onClick={() => navigate('/menu/drinks')}
          />
          <p>JUOMAT</p>
        </div>
      </div>
      
    </>
  );
}
export default Home;
