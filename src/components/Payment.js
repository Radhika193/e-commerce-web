import React, { useState } from 'react'
import './payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link } from 'react-router-dom'
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js'
import { NumericFormat } from 'react-number-format';
import { getBasketTotal } from './Reducer';
import { useEffect } from 'react'
import axios from './axios'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'
import { collection, doc, setDoc } from "firebase/firestore";


function Payment() {

    const [{ basket, value, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();



    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate the special stripe secret which allows us to change a customer

        const getClientSecret = async () => {
            try {
                const response = await axios({
                    method: 'post',
                    //stripe expects the total in a currencies subunits
                    url: `/payments/create?total=${getBasketTotal({ basket }) * 100}`
                })
                console.log('recieved clientSecret:', response.data.clientSecret);
                setClientSecret(response.data.clientSecret)
            } catch (error) {
                console.error('Error getting client secret from server:', error);
            }
        };
        getClientSecret();

    }, [basket])
    console.log('clientSecret state:', clientSecret);

    console.log('the secret is >>>', clientSecret)

    const handleSubmit = async (e) => {
        //do all the stripe stuff
        e.preventDefault();
        setProcessing(true);

        if (!user) {
            alert('You must be logged in to complete the payment.');
            setProcessing(false);
            return;
        }


        // const payload=await stripe
        try {
            const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });
            //paymentIntent = payment confirmation
            console.log('PaymentIntent:', paymentIntent);
            await setDoc(doc(collection(db, 'users', user?.uid, 'orders'), paymentIntent.id),
                {
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                }
            );
            // 4737 2722 7272 7279

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            });

            navigate('/orders', { replace: true });
        } catch (error) {
            console.error('Payment error:', error);
            setError(error.message);
            setProcessing(false);
        }
    }

    const handleChange = (e) => {
        //listen the changes in the CardElement
        //and display any errors as the customer type their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment_container'>

                <h1>
                    Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>
                {/* Payment section - delivery address*/}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>LosAngles , CA</p>
                    </div>

                </div>

                {/* Payment section - Review Items */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {/* all the product in the basket  */}
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment section - Payment method */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment method</h3>
                    </div>
                    <div className='payment_details'>
                        {/* Stripe magic will go yeahhh */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment_priceContainer'>
                                <NumericFormat
                                    renderText={(value) => (
                                        <>
                                            <p>
                                                (Order Total) :
                                                <strong> {value}</strong>
                                            </p>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={value}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rs."}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>processing</p> :
                                        "Buy Now"
                                    }</span>
                                </button>
                            </div>

                            {/* Error handling*/}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment
