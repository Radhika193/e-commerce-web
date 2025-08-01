import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useStateValue } from './components/StateProvider';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';

const promise = loadStripe('pk_test_51Rklbc4cnDKyv5M0Y1zNwuidzCz9JXnzyC0poxkR9kKnKm9jb0Fw41Q3CGN5VKZ7BloaLGNwTi1o2CQ57kMHcbkC00FgcbvYJP');

function App() {

  const [,dispatch] =useStateValue();

  useEffect(()=>{
     onAuthStateChanged(auth,(authUser) =>{
      console.log('THE USER IS >>>' ,authUser);

      if(authUser){
        //the user just logged in / the user was logged in and refresh the page

        dispatch({
          type:'SET_USER',
          user:authUser
        });
      }else{
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user:null
        });
      }
     });
  },[dispatch])

  return (
    <Router>
    <div className="app">
      {/* header here means render the header regardless(always) and then based on the routes render other components too or 
      instead of writing header here write it everywhere you need in the routes , here we need header in all cases
       hence it makes the code more readable and concise */}
      <Routes> 
        <Route path="/orders"
          element={
            <>
              <Header></Header>
              <Orders />
            </>
          }
        />
        <Route path="/login"
            element={
              <>
                <Login></Login>
              </>
            }
        />
        <Route path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
        />
        <Route 
            path="/payment"
            element={
              <>
                <Header></Header>
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
        />
        <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
        />
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
