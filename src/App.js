import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Landingpage from './Landing Page/landingpage';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import Jordan from './Shoes Categories/jordan';
import Slides from './Shoes Categories/slides';
import Dunks from './Shoes Categories/dunks';
import AirMax from './Shoes Categories/airmax';
import AF1 from './Shoes Categories/AF1';
import Footwear from './Shoes Categories/footwear';
import SS24 from './Shoes Categories/ss24';
import Login from './Login and Signup/login';
import Cart from './Cart Page/cart';
import Profilepage from './Profile Page/profilepage';
import ProductDetails from './Product Details/productdetails';
import Orderpage from './Order Page/orderpage';
import Orderdetailspage from './Order Page/orderdetailspage';
import Sleeveless from './T-Shirts Categories/sleeveless';
import TShirtProductDetails from './Product Details/tshirtproductdetails';
import ComingSoonProductDetails from './Product Details/comingsoonproductpage';
import Returnorder from './Return Page/returnorder';
import Returnorderdetails from './Return Page/returnorderdetails';
import TermCondition from './Terms and Condition/terms-condition';
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Landingpage />} />
      </Routes>
      <Routes>
        <Route path="/jordan" element={<Jordan />} />
      </Routes>
      <Routes>
        <Route path="/slides" element={<Slides />} />
      </Routes>
      <Routes>
        <Route path="/dunks" element={<Dunks />} />
      </Routes>
      <Routes>
        <Route path="/airmax" element={<AirMax />} />
      </Routes>
      <Routes>
        <Route path="/AF1" element={<AF1 />} />
      </Routes>
      <Routes>
        <Route path="/footwear" element={<Footwear />} />
      </Routes>
      <Routes>
        <Route path="/ss24" element={<SS24 />} />
      </Routes>
      <Routes>
        <Route path="/account/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/account/viewcart" element={<Cart />} />
      </Routes>
      <Routes>
        <Route path="/account/profile" element={<Profilepage />} />
      </Routes>
      <Routes>
        <Route path="/product" element={<ProductDetails />} />
      </Routes>
      <Routes>
        <Route path="/account/order" element={<Orderpage />} />
      </Routes>
      <Routes>
        <Route path="/account/orderdetails" element={<Orderdetailspage />} />
      </Routes>
      <Routes>
        <Route path="/sleveless" element={<Sleeveless />} />
      </Routes>
      <Routes>
        <Route path="/products/tshirts" element={<TShirtProductDetails />} />
      </Routes>
      <Routes>
        <Route path="/products/comingsoon" element={<ComingSoonProductDetails />} />
      </Routes>
      <Routes>
        <Route path="/apps/search_order" element={<Returnorder />} />
      </Routes>
      <Routes>
        <Route path="/apps/search_order_details" element={<Returnorderdetails />} />
      </Routes>
      <Routes>
        <Route path="/pages/terms-condition" element={<TermCondition />} />
      </Routes>
      <SpeedInsights />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
