import './App.css';
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import {Routes, Route} from "react-router";
import NavBar from './components/NavBar';
import Admin from './pages/Admin';
import AdminHistory from './pages/AdminHistory';
import Login from './pages/Login';
import Footer from './components/Footer'
import Mains from './components/menu/Mains'
import Snacks from './components/menu/Snacks'
import Desserts from './components/menu/Desserts'
import Drinks from './components/menu/Drinks'
import LoginForm from './components/profile/LoginForm'
import RegisterForm from './components/profile/RegisterForm'

const App = () => {
  return (
    <>
      <div>
        <NavBar />
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/menu/' element={<Menu />}>
              <Route path='/menu/snacks' element={<Snacks />}/>
              <Route path='/menu/mains' element={<Mains />}/>
              <Route path='/menu/desserts' element={<Desserts />}/>
              <Route path='/menu/drinks' element={<Drinks />}/>
            </Route>  
            <Route path='/profile' element={<Profile />}/>
            <Route path='/admin' element={<Admin />}/>
            <Route path='/history' element={<AdminHistory />}/>
            <Route path='/login/' element={<Login />}/>
              <Route path='/login/login' element={<LoginForm/>}></Route>
              <Route path='/login/register' element={<RegisterForm/>}></Route>
            <Route path='/cart' element={<Cart />}/>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
};
export default App;
