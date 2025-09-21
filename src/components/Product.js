import React from 'react'
import './product.css'
import { useState } from 'react'
import { useStateValue } from './StateProvider'
import { toast, ToastContainer, Slide } from 'react-toastify'
import QuantityControl from './QuantityControl'

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const itemInBasket = basket.find(item => item.id === id);
  const quantity = itemInBasket ? itemInBasket.quantity : 0;


  const addToBasket = () => {
    //dispatching the item into the data layer
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        quantity: 1
      },
    })

    // setQuantity(1)

    toast.success("Item added to Basket", {
      position: "top-right", // use string instead of toast.POSITION.TOP_RIGHT
      autoClose: 2000,
      transition: Slide, // optional, for slide-in animation
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
    <div className='product'>
      <div className='product_info'>
        <p>{title}</p>
        <p className='product_price'>
          <small>Rs.</small>
          <strong>{price}</strong>
        </p>
        <div className='product_rating'>
          {Array(rating)
            .fill()
            .map(() => (<p>🌟</p>))
          }
        </div>
      </div>

      <img src={image}></img>
      {/* <button onClick={addToBasket}>Add to Basket</button> */}
      {quantity > 0 ? (
        <QuantityControl
          quantity={quantity}
          onIncrement={increment}
          onDecrement={decrement}
        />
      ) : (
        <button onClick={addToBasket}>Add to Basket</button>
      )}
    </div>
  );
}
export default Product
