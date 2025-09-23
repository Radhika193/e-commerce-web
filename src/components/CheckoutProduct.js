import React from 'react'
import './checkoutProduct.css'
import {useStateValue} from "./StateProvider";
import { type } from '@testing-library/user-event/dist/type';
import QuantityControl from './QuantityControl';

function CheckoutProduct({id,image,title,price,rating,quantity: orderQuantity,hideButton}) {
    
    const [{basket,value},dispatch]=useStateValue() ; 

    const itemInBasket = basket.find(item => item.id === id);
    const liveQuantity = itemInBasket ? itemInBasket.quantity : 0;

    const calculateBasketTotal = (basket) => {
  return basket?.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
};
    //console.log('val',value)
    //console.log('quant',basket?[0].quantity)

    const removeFromBasket = () => {
      dispatch({
        type:'REMOVE_FROM_BASKET',
        id:id,
      });
    };

  const increment = () => {
  dispatch({
    type: 'UPDATE_QUANTITY',
    id,
    quantity: liveQuantity + 1   // 👈 use quantity
  });
}

const decrement = () => {
  if (liveQuantity > 1) {
    dispatch({
      type: 'UPDATE_QUANTITY',
      id,
      quantity: liveQuantity - 1   // 👈 use quantity
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
        
          {hideButton ? (
          // Order history (from Firestore)
          <p>Quantity: {orderQuantity}</p>
        ) : liveQuantity > 0 ? (
          // Basket checkout
          <>
            <QuantityControl
              quantity={liveQuantity}
              onIncrement={increment}
              onDecrement={decrement}
            />
            <button onClick={removeFromBasket}>Remove</button>
          </>
        ) : (
          <button onClick={removeFromBasket}>Remove</button>
        )}
      </div>
    </div>
  )
}

export default CheckoutProduct;
