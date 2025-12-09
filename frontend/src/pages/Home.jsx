import {useNavigate} from 'react-router';
import {useLanguage} from '../hooks/useLanguage';

//TODO: varmista että navigaatio oikeaan osoitteeseen
// sitten ehkä oma funktio
function Home() {
  const navigate = useNavigate();

  const {strings} = useLanguage();

  const imgSrc = '/images/';

  return (
    <div className="flex flex-col self-auto">
      <div className="flex flex-col justify-center items-center w-[100%]">
        <h1 className="p-5">Taqueria 21</h1>
        <p className="mb-5 text-lg">{strings.home.tagline}</p>
      </div>

      <div className="flex flex-row items-center w-[100%] justify-center">
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

      <div className="ad-div w-screen flex items-center justify-center gap-2 bg-[#982A2A]">
        {/*
        <div className=''>
          <img
            src={imgSrc + '/home/home1.jpg'}
            alt=""
            width="200"
            height="500"
            onClick={() => navigate('/menu')}
            className="overflow-hidden h-full rounded-sm hover:brightness-50"
          />
          <p>Menu</p>
        </div>
        */}

        <div className="flex flex-row p-5 gap-4">
          <div>
            <img
              src={imgSrc + '/home/home2.jpg'}
              alt="Shrimp taco"
              width="200"
              height="500"
              onClick={() => navigate('/menu')}
              className="overflow-hidden h-[265px] rounded-sm cursor-pointer outline-1 outline-zinc-300 hover:brightness-85"
            />
            <p className='text-white mt-2'>Uutuus:</p>
            <p className='text-white'>Katkaraputaco</p>
          </div>

          <div>
            <p className='text-white'>Kokin suosikki:</p>
            <p className='text-white mb-2'>Burrito bowl</p>
            <img
              src={imgSrc + '/home/home3.jpg'}
              alt="Burrito bowl"
              width="200"
              height="500"
              onClick={() => navigate('/menu')}
              className="overflow-hidden h-[265px] rounded-sm cursor-pointer outline-1 outline-zinc-300 hover:brightness-85"
            />
          </div>
        </div>
      </div>

      <div className='mt-6 flex flex-col items-center justify-center'>
        <h3 
        className='mb-6 text-xl font-bold cursor-pointer'
        onClick={() => navigate('/menu')}
        >MENU</h3>
        <div className="container-home mb-15 grid grid-cols-3 content-center justify-items-center max-w-[1000px]">
          <div className='flex flex-col justify-center items-center'>
            <img
              src={imgSrc + '/home/mains.jpg'}
              alt="Tacos"
              onClick={() => navigate('/menu/mains')}
              className="rounded-sm cursor-pointer outline-1 outline-zinc-300 hover:brightness-85"
            />
            <p className='mt-2 text-md'>{strings.menu.mains.toUpperCase()}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={imgSrc + '/home/snacks.jpg'}
              alt="Corn chips"
              onClick={() => navigate('/menu/snacks')}
              className="rounded-sm cursor-pointer outline-1 outline-zinc-300 hover:brightness-85"
            />
            <p className='mt-2 text-md'>{strings.menu.snacks.toUpperCase()}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={imgSrc + '/home/desserts.jpg'}
              alt="Mexican caramel pudding"
              onClick={() => navigate('/menu/desserts')}
              className="rounded-sm cursor-pointer outline-1 outline-zinc-300 hover:brightness-85"
            />
            <p className='mt-2 text-md'>{strings.menu.desserts.toUpperCase()}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={imgSrc + '/home/drinks.jpg'}
              alt="Jarritos bottles"
              onClick={() => navigate('/menu/drinks')}
              className="rounded-sm cursor-pointer outline-1 outline-zinc-300 hover:brightness-85"
            />
            <p className='mt-2 text-md'>{strings.menu.drinks.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
