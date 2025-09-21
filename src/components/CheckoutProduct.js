import React from 'react'
import './checkoutProduct.css'
import {useStateValue} from "./StateProvider";
import { type } from '@testing-library/user-event/dist/type';
import QuantityControl from './QuantityControl';

function CheckoutProduct({id,image,title,price,rating,hideButton}) {
    
    const [{basket},dispatch]=useStateValue() ; 

    const itemInBasket = basket.find(item => item.id === id);
    const quantity = itemInBasket ? itemInBasket.quantity : 0;

    const removeFromBasket = () => {
      dispatch({
        type:'REMOVE_FROM_BASKET',
        id:id,
      });
    };

      const increment = () => {
    const newQty = quantity + 1;
    dispatch({
      type: 'UPDATE_QUANTITY',
      id,
      quantity: newQty
    });
  }

  const decrement = () => {
    if (quantity > 1) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        id,
        quantity: quantity - 1
      });
    } else {
      dispatch({
        type: 'REMOVE_FROM_BASKET',
        id
      });
    }
  }

  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct_image' src={image} /> 

      <div className='checkoutProduct_info'>
        <p className='checkoutProduct_title'>{title}</p>
        <p className='checkout_price'>
            <small>Rs. </small>
            <strong>{price}</strong>
        </p>
        <div className='checkoutProduct_rating'>
            {Array(rating)
            .fill()
            .map( ()=>(<p>🌟</p>))
            }
        </div>
        {/* {!hideButton && (
           <button onClick={removeFromBasket}>Remove from Basket</button>
        )} */}
         {!hideButton && quantity > 0 ? (
          <>
          <QuantityControl
            quantity={quantity}
            onIncrement={increment}
            onDecrement={decrement}
          />
          <button onClick={removeFromBasket}>Remove</button>
          </>
          
        ) : !hideButton ? (
          <button onClick={removeFromBasket}>Remove</button>
        ) : null}
        
      </div>
    </div>
  )
}

export default CheckoutProduct;
