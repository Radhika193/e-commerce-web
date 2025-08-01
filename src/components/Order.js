import React from 'react'
import './order.css'
import moment from 'moment'
import CheckoutProduct from './CheckoutProduct'
import { NumericFormat } from 'react-number-format'
import { useStateValue } from './StateProvider'


function Order({order ,value}) {
  return (
    <div className='order'>
      <h2>Order</h2>
      <p className='seperation'>{moment.unix(order.data.created).format('MMM Do YYYY,h:mma')}
        <small >Order ID : {order.id}</small>
      </p>
      
      {order.data.basket?.map(item =>(
        <CheckoutProduct 
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideButton
        />
      ))}
      <NumericFormat
              renderText={(value)=>(
                <h3 className='order_total'>Order Total : {value}</h3>
              )}
              decimalScale={2}
              value={order.data.amount /100}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rs."}
            />

    </div>
  )
}

export default Order
