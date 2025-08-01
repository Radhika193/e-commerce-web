import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'

import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function Login() {

    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');

    const navigate = useNavigate();

    const signInHandler= e =>{
        e.preventDefault();

        //firebase login enters
        signInWithEmailAndPassword(auth,email,password)
        .then(auth => {
          navigate('/')
        })
        .catch(error =>alert(error.message))
    }

    

    const registerHandler = (e) =>{
        e.preventDefault();

        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
          //it successfully created a new user with email and password
          console.log("User Created:",userCredential.user);
          if(userCredential){
            navigate('/')
          }
        })
        .catch(error => {alert(error.message)
        });

        //firebase register
    }

  return (
    <div className='login'>
      <Link to='/'>
        <img className='login_logo' src="/images/this_or.png" alt='ShopEase_logo' />

      </Link>

      <div className='login_container'>
        <h1>Sign In</h1>

        <form>
            <h5>E-mail</h5>
            <input type='text' value={email} onChange={e=> setEmail(e.target.value)} placeholder='Email' />

            <h5>Password</h5>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password'/>

            <button type='submit' onClick={signInHandler} className='login_signInButton'>Sign In</button>
        </form>

        <p>
            By signing-in you agree to our Coonditions of Use & Sale.
            Please see our Privacy Notice and our Cookies Notice.
        </p>

        <button onClick={registerHandler} className='login_registerButton'>Create your ShopEase Account</button>
      </div>
    </div>
  )
}

export default Login
