import { useNavigate } from "react-router";
import Login from "./Login";


//TODO: varmista että navigaatio oikeaan osoitteeseen
// sitten ehkä oma funktio 
function Home() {
  const navigate = useNavigate();

  const handleLoginBtn = () => {
    handleButton();
    navigate('/login');
  }

    return (
        <>
          <div>
            <h1>Ravintolan nimi</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum veritatis suscipit quos dolorum </p>
          </div>
          <div>
            <button onClick={() => navigate('/login/login')}>Kirjaudu</button>
            <button onClick={() => navigate('/login/register')}>Rekisteröidy</button>
          </div>
          <div className="ad-div">
            <div>
              <img
                src="../src/assets/img/paaruoat/tacoja.jpg"
                alt=""
                width="200" height='500'
                onClick={() => navigate('/menu')}
                />
              <p>Lounasmenu</p>
            </div>  
            <div>
              <img
                src="../src/assets/img/paaruoat/tacohand.jpg"
                alt=""
                width="200" height='500'
                onClick={() => navigate('/menu')}
                />
              <p>Uutuus: katkaraputaco</p>  
            </div>    
            <div>
              <img
                src="../src/assets/img/paaruoat/bowlkasa.jpg"
                alt=""
                width="200" height='500'
                onClick={() => navigate('/menu')}
                />
              <p>Joku teksti</p>  
            </div>
          </div>
          <h3>MENU</h3>
          <div className="container-home">
            <div>
              <img
              src="../src/assets/img/home/taco2.jpg"
              alt=""
              onClick={() => navigate('/menu')}
              />
              <p>PÄÄRUOAT</p>
            </div>
            <div>
              <img
              src="../src/assets/img/home/nacho3.jpg"
              alt=""
              onClick={() => navigate('/menu')}
              />
              <p>SNACKS</p>
            </div>
            <div>
              <img
              src="../src/assets/img/home/flan2.jpg"
              alt=""
              onClick={() => navigate('/menu')}
              />
              <p>JÄLKIRUOAT</p>
            </div>
            <div>
              <img
              src="../src/assets/img/home/drinks.jpg"
              alt=""
              onClick={() => navigate('/menu')}
              />
              <p>JUOMAT</p>
            </div>
          </div>
          <h3>YHTEYSTIEDOT</h3>
          <div className="contacts" id="contacts">
            <p>Aukiolo ajat: </p>
            <p>ma-pe: 11-22</p>
            <p>la: 12-22</p>
            <p>su: suljettu</p>
            <p>Osoite: jokuosoite 8 a</p>
            <p>Sähköposti: ravintolannimi@gmail.com</p>
            <p>Puhelinnumero: +358 7776669</p>
          </div>
        </>
    )
}
export default Home;