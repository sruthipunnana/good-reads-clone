import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Login } from './components/Auth/Login/Login';
import { Register } from './components/Auth/Register/Register';
import UserRoute from './UserRoute';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { setUser } from './redux/actions';
import { Forgot } from './components/ForgotPassword/Forgot';
import { Genres } from './components/Genres/Genres';
import { BookItemDetails } from './components/BookItemDetails/BookItemDetails';
import { Cart } from './components/Cart/Cart';
import { Checkout } from './components/Checkout/Checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm/PaymentForm';
import { OrderHistory } from './components/OrderHistory/OrderHistory';


const stripePromise = loadStripe('pk_test_51ONvyQSD5IpHDNLH49tkCCNlFbQ2RTijpokT32FLN2b7A51M8oRe34o17n5XWUB806aa8fURXPRtlR3iHCsckW4z004x68iJPZ');

function App() {
   
  const dispatch= useDispatch()

  React.useEffect(()=>{
      auth.onAuthStateChanged((authUser)=>{
        if(authUser){
        dispatch(setUser(authUser))
        }else{
         dispatch(setUser(null))
        }
      })
   },[dispatch])
   

  return (
    <BrowserRouter>
    <Elements stripe={stripePromise}>
    <div className="App">
        <Routes>
          <Route element={<UserRoute />}>
            <Route index element={<Home />} />
             <Route path='/genres' element={<Genres/>}/>
             <Route path='/books/:id' element={<BookItemDetails/>}/>
             <Route path='/cart' element={<Cart/>}/>
             <Route path='/checkout' element={<Checkout/>}/>
             <Route path='/payment' element={<PaymentForm/>}/>
             <Route path='/order' element={<OrderHistory/>}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/reset-password' element={<Forgot/>}/>
        </Routes>
      </div>
    </Elements>
    </BrowserRouter>
  );
}

export default App;