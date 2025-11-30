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

const App = () => {
  return (
    <>
      <div>
        <NavBar />
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/menu' element={<Menu />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/admin' element={<Admin />}/>
            <Route path='/history' element={<AdminHistory />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/Cart' element={<Cart />}/>
          </Routes>
        </main>
      </div>
    </>
  );
};
export default App;
