import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';


//add conditional rendering to show either login or register and add button
const Login = () => {
  return (
    <>
      <LoginForm/>
      <RegisterForm />
    </>
  );
};


export default Login;