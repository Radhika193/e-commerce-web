import React from 'react'
import './checkout.css'
import Subtotal from './Subtotal'
import { NumericFormat } from 'react-number-format';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {

  const [{basket,user},dispatch] =useStateValue();

  return (
    <div className='checkout'>
       <div className='checkout_left'>
            
            <div>
              <h4>...Hello , {user?.email }</h4>
              <h2 className='checkout_heading'>
                Your shopping Basket</h2>
                <p className='checkout_title'>
                  Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.
                </p>
            </div>

            {basket.map(item=>(
              <CheckoutProduct
                 id={item.id}
                 title={item.title}
                 image={item.image}
                 price={item.price}
                 rating={item.rating}
                 quantity={item.quantity}
                 
              />

            ))}
                {/* CheckoutProduct */}
                {/* CheckoutProduct */}
                {/* CheckoutProduct */}
                {/* CheckoutProduct */}
        </div>

        <div className='checkout_right'>
          <Subtotal />
        </div>
    </div>
  )
}

export default Checkout
