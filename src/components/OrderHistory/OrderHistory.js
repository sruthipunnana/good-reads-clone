import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';


export const OrderHistory = () => {
  const navigate = useNavigate();

  const orders= useSelector((state)=>state.orderHistory.orders)
  const shippingAddress= useSelector((state)=>state.shipping.shippingData)
  console.log(shippingAddress)
  console.log(orders)


  const handleNewOrder = () => {
    navigate('/genres');
  };

  return (
    <div>
      <h4 style={{fontFamily:'Roboto', textAlign:'center', color:'orangered', margin:'5px'}}>Order History</h4>
      <div>
      <ul>
        {orders.map((order, index) => (
              <li className="cart-item" key={index}>
                <img className="cart-product-image" src={order.image} alt={order.name} />
                <div className="cart-item-details-container">
                <div className="cart-product-title-brand-container">
                <p className="cart-product-title">Name: {order.name}</p>
                <p className="cart-product-brand">Quantity: {order.quantity}</p>
                <p className="cart-product-brand">Price: {order.price}</p>
               </div>
            </div>
            </li>
   ))}
      </ul>
      </div>
      
      
      <div style={{ textAlign: 'center' }}>
        <button type="button" onClick={handleNewOrder} className="btn btn-danger" style={{ color: 'white' }}>
          Place New Order
        </button>
      </div>
    </div>
  );
};


