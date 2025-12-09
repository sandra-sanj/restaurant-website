import {useState} from 'react';
import LoginForm from '../components/profile/LoginForm';
import RegisterForm from '../components/profile/RegisterForm';
import {useLanguage} from '../hooks/useLanguage';
import {Outlet} from 'react-router';

//TODO: kun menee etusvun linkstä tulee myös, että voi sittenkin kirjautua

const Login = () => {
  const [showForm, setShowForm] = useState(true);
  const {strings} = useLanguage();
  //const [buttonText, setButtonText] = useState('Rekisteröidy!');
  //const [pText, setPtext] = useState('Eikö vielä tiliä?');

  const handleButton = () => {
    setShowForm((current) => !current);
    //setPtext(showForm ? 'Oletko jo jäsen?' : 'Eikö vielä tiliä?');
    //setButtonText(showForm ? 'Kirjaudu sisään!' : 'Rekisteröidy!');
  };

  return (
    <>
      {showForm ? <LoginForm /> : <RegisterForm />}
      <Outlet></Outlet>
      <p>{showForm ? strings.auth.noAccount : strings.auth.hasAccount}</p>
      <button
        onClick={() => {
          handleButton();
        }}
      >
        {showForm ? strings.auth.register : strings.auth.login}
      </button>
    </>
  );
};

export default Login;
