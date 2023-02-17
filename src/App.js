import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminViewUserOrderDetailsModal from './component/admin_component/AdminViewUserFullOrderDetails';
import OrderPlacedFail from './component/customer_component/OrderPlacedFailed';
import OrderPlacedSuccessfully from './component/customer_component/OrderPlacedSuccessfully';
import AdminDashBoardPage from './pages/admin_pages/AdminDashBoardPage';
import AdminMenuPage from './pages/admin_pages/AdminMenuPage';
import AdminRestaurantPage from './pages/admin_pages/AdminRestaurantPage';
import AllOrderPage from './pages/admin_pages/AllOrderPage';
import BillingPage from './pages/customer_pages/BillingPage';
import CartPage from './pages/customer_pages/CartPage';
import HomePage from './pages/customer_pages/HomePage';
import LogInPage from './pages/customer_pages/LogInPage';
import MenuPage from './pages/customer_pages/MenuPage';
import OrderTrackingPage from './pages/customer_pages/OrderTrackingPage';
import ProfilePage from './pages/customer_pages/ProfilePage';
import RegisterPage from './pages/customer_pages/RegisterPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/registeruser' element={<RegisterPage />} />
          <Route exact path='/loginuser' element={<LogInPage />} />
          <Route exact path='/profile' element={<ProfilePage />} />
          <Route exact path='/admin' element={<AdminDashBoardPage />} />
          <Route exact path='/adminrestaurants' element={<AdminRestaurantPage />} />
          <Route exact path='/menu/:id' element={<MenuPage />} />
          <Route exact path='/cart' element={<CartPage />} />
          <Route exact path='/billing' element={<BillingPage />} />
          <Route exact path='/orderplacedsuccess' element={<OrderPlacedSuccessfully />} />
          <Route exact path='/orderplacedfail' element={<OrderPlacedFail />} />
          <Route exact path='/adminmenus/:id' element={<AdminMenuPage />} />
          <Route exact path='/trackorder' element={<OrderTrackingPage />} />
          <Route exact path="/allorders" element={<AllOrderPage/>} />
          <Route exact path='/vieworderdetail/:id' element={<AdminViewUserOrderDetailsModal/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
