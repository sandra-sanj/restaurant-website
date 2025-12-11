import {useNavigate} from 'react-router';
import {useLanguage} from '../hooks/useLanguage';
import { useUserContext } from '../hooks/contextHook';

function Home() {
  const navigate = useNavigate();
  const {user} = useUserContext();

  const {strings} = useLanguage();

  const imgSrc = '/images/';

  return (
    <div className="flex flex-col self-auto overflow-x-hidden">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="p-5 lg:mt-5">Taqueria 21</h1>
        <p className="mb-5 text-lg">{strings.home.tagline}</p>
      </div>
       {!user && ( 
        <div className="flex flex-row items-center w-full justify-center">
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
        )}

      <div className="ad-div w-screen flex items-center justify-center gap-2 bg-[#982A2A] lg:mt-8">
        
        <div className="flex flex-row p-5 gap-4 lg:gap-15 lg:p-15 lg:text-lg">
          <div>
            <img
              src={imgSrc + '/home/home2.jpg'}
              alt="Shrimp taco"
              /*width="200"
              height="500"*/
              onClick={() => navigate('/menu')}
              className="overflow-hidden h-[265px] lg:h-[395px] max-w-[200px] lg:max-w-[300px] rounded-sm cursor-pointer outline-1 outline-zinc-300 transition-transform duration-300 hover:scale-102"
            />
            <p className="text-white mt-2">{strings.home.newItemLabel}:</p>
            <p className="text-white">{strings.home.newItemName}</p>
          </div>

          <div>
            <p className="text-white">{strings.home.chefFavoriteLabel}:</p>
            <p className="text-white mb-2">{strings.home.chefFavoriteName}</p>
            <img
              src={imgSrc + '/home/home3.jpg'}
              alt="Burrito bowl"
              /*width="200"
              height="500"*/
              onClick={() => navigate('/menu')}
              className="overflow-hidden h-[265px] lg:h-[395px] max-w-[200px] lg:max-w-[300px] rounded-sm cursor-pointer outline-1 outline-zinc-300 transition-transform duration-300 hover:scale-102"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center lg:p-10">
        <h2
          className="mb-6 text-xl lg:text-2xl lg:mb-12 font-bold cursor-pointer"
          onClick={() => navigate('/menu')}
        >
          {strings.home.menuTitle}
        </h2>
        <div className="container-home mb-15 grid grid-cols-2 md:grid-cols-4 gap-6 content-center justify-items-center max-w-[1000px] lg:gap-15 lg:text-lg">
          <div className="flex flex-col justify-center items-center">
            <img
              src={imgSrc + '/home/mains.jpg'}
              alt="Tacos"
              onClick={() => navigate('/menu/mains')}
              className="rounded-sm cursor-pointer outline-1 outline-zinc-300 h-40 w-40 object-cover lg:h-48 lg:w-48 transition-transform duration-300 hover:scale-104"
            />
            <p className="mt-2 text-md">{strings.menu.mains.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={imgSrc + '/home/snacks.jpg'}
              alt="Corn chips"
              onClick={() => navigate('/menu/snacks')}
              className="rounded-sm cursor-pointer outline-1 outline-zinc-300 h-40 w-40 object-cover lg:h-48 lg:w-48 transition-transform duration-300 hover:scale-104"
            />
            <p className="mt-2 text-md">{strings.menu.snacks.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={imgSrc + '/home/desserts.jpg'}
              alt="Mexican caramel pudding"
              onClick={() => navigate('/menu/desserts')}
              className="rounded-sm cursor-pointer outline-1 outline-zinc-300 h-40 w-40 object-cover lg:h-48 lg:w-48 transition-transform duration-300 hover:scale-104"
            />
            <p className="mt-2 text-md">
              {strings.menu.desserts.toUpperCase()}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={imgSrc + '/home/drinks.jpg'}
              alt="Jarritos bottles"
              onClick={() => navigate('/menu/drinks')}
              className="rounded-sm cursor-pointer outline-1 outline-zinc-300 h-40 w-40 object-cover lg:h-48 lg:w-48 transition-transform duration-300 hover:scale-104"
            />
            <p className="mt-2 text-md">{strings.menu.drinks.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
