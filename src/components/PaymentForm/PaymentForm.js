import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentForm.css'; 
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/actions';
import { addNewOrder } from '../../redux/actions';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const shippingAddress = useSelector((state) => state.shipping.shippingData); 
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems)
  
  const orders= useSelector((state)=>state.orderHistory.orders)
  console.log(orders)

  const navigate= useNavigate()
  const dispatch= useDispatch()


  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      // Handle successful payment
      setPaymentSuccessful(true);
      // Generate a random order ID (replace this with your actual order ID generation logic)
      const randomOrderId = Math.floor(Math.random() * 1000000);
      setOrderId(`#${randomOrderId}`);
    }
  };

  const goToOrdersPage=()=>{
        dispatch(addNewOrder(cartItems))
        dispatch(clearCart())
        navigate('/order')
       
      
  }

  

  return (
    <div>
      {paymentSuccessful ? (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', marginTop:'4em', alignItems:'center'}}>
             <div className="payment-body">
              <h5 className="payment-title">Congratulations, Payment Successful🎊🎉</h5>
              <p className="payment-text">Your order ID is: {orderId}</p>
              {/* Display shipping address */}
              <p className="payment-text">
               <span style={{color:'orangered'}}> Shipping Address:</span> {shippingAddress.name}, {shippingAddress.city}, {shippingAddress.country} -{' '}
                {shippingAddress.pincode}.
              </p>
              <button onClick={goToOrdersPage} className='btn btn-success'>Go To Orders Page</button>
            </div>
        </div>
           

      ) : (
        <form className='form-payment' onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" className='button-payment' disabled={!stripe}>
            Pay
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
