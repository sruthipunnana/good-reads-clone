import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingData } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingData, setShippingData] = useState({
    name: '',
    city: '',
    country: '',
    pincode: '',
  });

  const cart = useSelector((state) => state.cart.cartItems);
  let total = 0;
  cart.forEach((eachCartItem) => {
    total += eachCartItem.price * eachCartItem.quantity;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingData({
      ...shippingData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (shippingData.name && shippingData.city && shippingData.country && shippingData.pincode) {
      dispatch(saveShippingData(shippingData));
      navigate('/payment');
    } else {
      alert('Please fill in all the fields.');
    }
  };


  return (
    <div  style={{ marginLeft: '2em', display:'flex',marginTop:'10px', justifyContent:'center' }}>
      <div >
        <h5 style={{color:'#303459', textAlign:'center'}}>Enter Shipping Address</h5>
        <form onSubmit={handleSubmit} style={{border:'1px', borderStyle:'solid',width:'70vw', borderColor:'#adaaaa', borderRadius:'3px',padding:'25px'}}>
          <label className="form-label">Your Name:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder='Enter Name'
            value={shippingData.name}
            onChange={handleChange}
            required
          />
          <br />
          <label className="form-label">Your City:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="city"
            placeholder='Enter City'
            id="city"
            value={shippingData.city}
            onChange={handleChange}
            required
          />
          <br />
          <label className="form-label">Your Country:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="country"
            id="country"
            placeholder='Enter Country'
            value={shippingData.country}
            onChange={handleChange}
            required
          />
          <br />
          <label className="form-label">Your Pincode:</label>
          <br />
          <input
            className="form-control"
            type="number"
            name="pincode"
            placeholder='Enter Pincode'
            id="pin"
            value={shippingData.pincode}
            onChange={handleChange}
            required
          />
          <br />
          <label className="form-label">Total Amount:</label>
          <br />
          <input className="form-control" type="number" id="amount" name="amount" value={total} disabled />
          <br />
          <div style={{display:'flex', justifyContent:'space-between'}}>
        
          <button className="btn btn-success" type='submit'>
          Save & Make Payment
        </button>
          </div>
         
        </form>
       
      </div>
    </div>
  );
};


