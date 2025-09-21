import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import './orders.css'
import { useStateValue } from './StateProvider';
import Order from './Order';
import firebase from 'firebase/compat/app';
import NewUser from './NewUser';
  import {collection, doc, query, orderBy, onSnapshot} from 'firebase/firestore';


function Orders() {

  const [{ basket,value, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    if (user) {
      const userOrdersRef = collection(doc(collection(db, 'users'), user.uid), 'orders');
      const q = query(userOrdersRef, orderBy('created', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })));
      });

      return unsubscribe; // Clean up listener on unmount
    } else {
      
      setOrders([]);
    }
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      {!user ? <h3>You have to login to your account to see the previous orders !</h3> : <h3>Thanks for trusting us ! Here are your previous orders</h3>}
      <div className='orders_order'>
        {orders?.map(order => (
          <Order order={order} value={value} />
        ))}
      </div>
    </div>
  )
}

export default Orders
