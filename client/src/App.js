
import CustomerHome from './customer/pages/customerHome.jsx';
import Login from './login.jsx';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import CustomerSearch from './customer/pages/customerSearch.jsx';
import CustomerCart from './customer/pages/customerCart.jsx';
import CustomerOrders from './customer/pages/customerOrders.jsx';
import SellerOrders from './seller/sellerOrders.jsx';

function App() {

  return (
    //<GlobalState/>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<CustomerHome />} />
          <Route exact path="/search" element={<CustomerSearch />} />
          <Route exact path="/cart" element={<CustomerCart />} />
          <Route exact path="/customer/orders" element={<CustomerOrders />} />
          <Route exact path="/seller/orders" element={<SellerOrders/>} />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
