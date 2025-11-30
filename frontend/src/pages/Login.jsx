import LoginForm from '../components/profile/LoginForm';
import RegisterForm from '../components/profile/RegisterForm';


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