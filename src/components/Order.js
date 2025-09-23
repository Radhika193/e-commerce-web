import React from 'react'
import './order.css'
import moment from 'moment'
import CheckoutProduct from './CheckoutProduct'
import { NumericFormat } from 'react-number-format'
import { useStateValue } from './StateProvider'


function Order({ order, value }) {
  //console.log(value)
  const calculateBasketTotal = (basket) => {
    return basket?.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };
  //console.log(calculateBasketTotal(order.data.basket))

  return (
    <div className='order'>
      <h2>Order</h2>
      <p className='seperation'>{moment.unix(order.data.created).format('MMM Do YYYY,h:mma')}
        <small >Order ID : {order.id}</small>

      </p>

      {order.data.basket?.map(item => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          quantity={item.quantity || 1}
          hideButton

        />
      ))}
    
      <NumericFormat
        renderText={(value) => (
          <h3 className='order_total'>Order Total : {value}</h3>
        )}
        decimalScale={2}
        value={calculateBasketTotal(order.data.basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs."}
      />

    </div>
  )
}

export default Order
