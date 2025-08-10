import React from 'react'
import './product.css'
import { useStateValue } from './StateProvider'
import { toast,ToastContainer,Slide } from 'react-toastify'

function Product({id,title,image,price,rating}) {
  const [{basket},dispatch] =  useStateValue()

    const addToBasket=()=>{
      //dispatching the item into the data layer
      dispatch({
        type:'ADD_TO_BASKET',
        item:{
          id:id,
          title:title,
          image:image,
          price:price,
          rating:rating,
        },
      });
  

      toast.success("Item added to Basket",{
          position: "top-right", // use string instead of toast.POSITION.TOP_RIGHT
          autoClose: 2000,
          transition: Slide, // optional, for slide-in animation
      });
      
    };

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
          .map(()=>(<p>🌟</p>))
          }
          
        </div>

      </div>

      <img src={image}></img>
      <button onClick={addToBasket}>Add to Basket</button>

    </div>
  );

}

export default Product 
