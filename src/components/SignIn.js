import React from "react";
import {signInWithPopup } from "firebase/auth";
import { signInWithGooglePopup } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './signIn.css';

function SignIn(){

   const navigate = useNavigate();

   const logGoogleUser=async()=>{
    try{
      const response=await signInWithGooglePopup();
      console.log(response);
      //console.log((await response).user.displayName)
      if (response.user.displayName) {
        navigate('/');
      }
    }catch (error) {
       console.error("Google Sign-In Error:", error);
    }

   }

   return(
      <>
        <button onClick={logGoogleUser} className="signInWithGoogle">SignIn With Google <img src="/images/google-icon.png" alt="google-icon" width="25px" height="25px"></img></button>
      </>
   )
}

export default SignIn;

