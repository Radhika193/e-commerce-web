import React from 'react';
import "./header.css"
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from '../firebase';
import Product from './Product';
import Home from './Home';
import { useState } from 'react';

function Header({ searchVal, setSearchVal }) {

   const [{basket,user},dispatch] =useStateValue();

   const handleAuthentication=()=>{

      if(user){
        auth.signOut();
      }
   }


  return (
    <div className='header'>
      <Link to="/">
         <img
           className='header_logo'
           src="/images/this_or.png"
           alt='Website Logo' 
         />
      </Link>
      

      <div className='header_search'>
        {/* <input className='header_searchInput' type='text'>
         </input> */}
         <input
          className="header_searchInput"
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)} // updating search text
        />
        {/* Logo */}
        <img className='header_searchIcon' src='/images/search_icon2.png'></img>
      </div>

      <div className='header_nav'>
        <Link to={!user && '/login'}>
        <div onClick={handleAuthentication} className='header_option'>
           <span className='header_optionLineOne'>Hello {!user ? 'Guest' : user.email}</span>
            <span className='header_optionLineTwo'>{user ? 'Sign Out' :'SignIn'}</span>
        </div>
        </Link>
        <Link to='/orders'>
           <div className='header_option'>
           <span className='header_optionLineOne'>Returns</span>
           <span className='header_optionLineTwo'>& Orders</span>
        </div>
        </Link>

        <Link to='/YourPrime'>
        <div className='header_option'>
           <span className='header_optionLineOne'>Your</span>
           <span className='header_optionLineTwo'>Prime</span>
        </div>
        </Link>

        <Link to="/checkout">
          <div className='header_optionBasket'>
            <img src='/images/cart_icon1.png' alt='cart_icon1' height='40px' width='40px'></img>
            <span className='header_optionLineTwo header_basketCount'>{basket?.length}</span>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Header;
