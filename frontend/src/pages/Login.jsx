import { useState } from 'react';
import LoginForm from '../components/profile/LoginForm';
import RegisterForm from '../components/profile/RegisterForm';
import { Outlet } from 'react-router';

//TODO: kun menee etusvun linkstä tulee myös, että voi sittenkin kirjautua

const Login = () => {
  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState("Kirjaudu sisään!");
  const [pText, setPtext] = useState("Oletko jo jäsen?")

  const handleButton = () => {
    setShowForm(current => !current);
    setPtext(showForm ? 'Oletko jo jäsen?' : "Eikö vielä tiliä?");
    setButtonText(showForm ? "Kirjaudu sisään!" : 'Rekisteröidy!');
  }

  return(
  <>
    {showForm ? <LoginForm /> : <RegisterForm />}
    <Outlet></Outlet>
    <p>{pText}</p>
    <button onClick={() => {handleButton()} }>{buttonText}</button>
  </>
  );
};

export default Login;