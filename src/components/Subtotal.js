import React from 'react'
import "./subtotal.css"
import { NumericFormat } from 'react-number-format';
import { useStateValue } from './StateProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Subtotal() {
   
   const navigate = useNavigate();

   const [{basket,value},dispatch] =useStateValue();
   const [isGiftChecked, setIsGiftChecked] = useState(false);

   const handleGiftCheckbox = () => {
      setIsGiftChecked(!isGiftChecked);
   };
   

  return (
    <div className='subtotal'>
      <NumericFormat
        renderText={(value)=>(
          <>
             <p>
               Subtotal ({basket?.length} items) :
                 <strong> {value}</strong>
             </p>
             <small className='subtotal_gift'>
                <input type='checkbox' 
                onClick={handleGiftCheckbox}/>
                This order contains a gift
             </small>
             {isGiftChecked && (
              <p className="gift-message">
                <small>Excellent! The gift will be rememberable.</small>
              </p>
            )}
          </>
        )}
        decimalScale={2}
        value={value}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs."}
      />

      <button onClick={e=>navigate('/payment')} className='subtotal_button'>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
