import React, { useEffect, useState } from 'react'
import Menubar from './components/Menubar/Menubar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact  from './pages/Contact/Contact';
import ExploreFood from './pages/ExploreFood/ExploreFood';
import FoodDetails from './pages/FoodDetails/FoodDetails';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { ToastContainer } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentSuccess from './pages/PlaceOrder/PaymentSuccess';
import MyOrders from './pages/MyOrders/MyOrders';
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';






const App = () => {
 const {token}=useContext(StoreContext);

  return (
 
  <div>
      <Menubar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/explore' element={<ExploreFood/>}/>
        <Route path='/food/:id' element={<FoodDetails/>}/>
         <Route path='/cart' element={token ? <Cart/> : <Login/>}/>
          <Route path='/order' element={token ? <PlaceOrder/> : <Login/>}/>
          <Route path='/register' element={token ? <Home/> : <Register/>}/>
          <Route path='/login' element={token ? <Home/> : <Login/> }/>
<Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/myorders" element={token ? <MyOrders/> : <Login/>} />
      </Routes>
  </div>

  )
}

export default App;