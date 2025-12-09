import { useState } from 'react';
import LoginForm from '../components/profile/LoginForm';
import RegisterForm from '../components/profile/RegisterForm';
import { Outlet } from 'react-router';

//TODO: kun menee etusvun linkstä tulee myös, että voi sittenkin kirjautua

const Login = () => {
  const [showForm, setShowForm] = useState(true);
  const [buttonText, setButtonText] = useState('Rekisteröidy!');
  const [pText, setPtext] = useState("Eikö vielä tiliä?")

  const handleButton = () => {
    setShowForm(current => !current);
    setPtext(showForm ? 'Oletko jo jäsen?' : "Eikö vielä tiliä?");
    setButtonText(showForm ? "Kirjaudu sisään!" : 'Rekisteröidy!');
  }

  return(
  <>
    {showForm ? <LoginForm /> : <RegisterForm />}
    <Outlet></Outlet>
    <p className='mt-5'>{pText}</p>
    <button className='bg-[#982A2a70]! text-black border-2 border-stone-300! hover:bg-[#982A2a90]!' onClick={() => {handleButton()} }>{buttonText}</button>
    
  </>
  );
};

export default Login;