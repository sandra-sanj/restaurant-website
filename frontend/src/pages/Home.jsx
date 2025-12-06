import {useNavigate} from 'react-router';
import Login from './Login';
import { Button } from "@/components/ui/button"

//TODO: varmista että navigaatio oikeaan osoitteeseen
// sitten ehkä oma funktio
function Home() {
  const navigate = useNavigate();

  const imgSrc = '/images/';

  return (
    <>
      <div>
        <h1>Taqueria 21</h1>
        
        <Button className="bg-primary text-primary-foreground hover:bg-[#7A2020]">Testi1</Button>
        <p>Pieni pala Meksikoa keskellä Helsinkiä</p>
      </div>
      <div>
        <button onClick={() => navigate('/login/login')}>Kirjaudu</button>
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
      <div className="container-home">
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
      <h3>YHTEYSTIEDOT</h3>
      <div className="contacts" id="contacts">
        <p>Aukioloajat: </p>
        <p>ma-pe: 11-22</p>
        <p>la: 12-22</p>
        <p>su: suljettu</p>
        <p>Osoite: Kalevankatu 21, 00100 Helsinki</p>
        <p>Sähköposti: info@taqueria21.fi</p>
        <p>Puhelinnumero: +358 7776669</p>
      </div>
    </>
  );
}
export default Home;
