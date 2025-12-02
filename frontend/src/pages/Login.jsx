import { useState } from 'react';
import LoginForm from '../components/profile/LoginForm';
import RegisterForm from '../components/profile/RegisterForm';



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
    <p>{pText}</p>
    <button onClick={() => {handleButton()} }>{buttonText}</button>
  </>
  );
};

export default Login;