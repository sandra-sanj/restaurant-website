import './App.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import {Routes, Route, useLocation} from 'react-router';
import NavBar from './components/NavBar';
import Admin from './pages/Admin';
import AdminHistory from './pages/AdminHistory';
import Login from './pages/Login';
import Footer from './components/Footer';
import Mains from './components/menu/sections/Mains';
import Snacks from './components/menu/sections/Snacks';
import Desserts from './components/menu/sections/Desserts';
import Drinks from './components/menu/sections/Drinks';
import LoginForm from './components/profile/LoginForm';
import RegisterForm from './components/profile/RegisterForm';
import CartPage from './pages/CartPage';
import Cart from './components/shoppingcart/Cart';
import Order from './components/shoppingcart/Order';
import All from './components/menu/sections/All';
import {UserProvider} from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import {OrderProvider} from './context/OrderContext';

const App = () => {
  const location = useLocation();
  const hideMainFooter = ['/admin', '/history'].includes(location.pathname);

  return (
    <>
      <UserProvider>
        <OrderProvider>
          <div className="flex flex-col bg-[#fdf8f8] self-auto w-screen">
            <NavBar />
            
            {/* Fixed min height to make nav top and footer bottom */}
            <main className="main-content w-screen min-h-[calc(100vh-420px-64px)] flex flex-col justify-center items-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu/" element={<Menu />}>
                  <Route path="/menu/" element={<All />} />
                  <Route path="/menu/snacks" element={<Snacks />} />
                  <Route path="/menu/mains" element={<Mains />} />
                  <Route path="/menu/desserts" element={<Desserts />} />
                  <Route path="/menu/drinks" element={<Drinks />} />
                </Route>
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/admin" element={<Admin />} />
                <Route path="/history" element={<AdminHistory />} />
                <Route path="/login/" element={<Login />} />
                <Route path="/login/login" element={<LoginForm />}></Route>
                <Route
                  path="/login/register"
                  element={<RegisterForm />}
                ></Route>
                <Route path="/cart" element={<CartPage />}>
                  <Route path="/cart/cart" element={<Cart />} />
                  <Route path="/cart/order" element={<Order />} />
                </Route>
              </Routes>
            </main>
          </div>
          {!hideMainFooter && <Footer />}
        </OrderProvider>
      </UserProvider>
    </>
  );
};
export default App;
