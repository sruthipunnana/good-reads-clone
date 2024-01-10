import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import { addToCart } from '../../redux/actions';
import './BookItemDetails.css'
import { useDispatch, useSelector } from 'react-redux';

export const BookItemDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate= useNavigate()

  const cart= useSelector((state)=>state.cart.cartItems)
  console.log(cart)

  const [quantity, setQuantity] = useState(1); 

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const [bookDetails, setBookDetails] = useState(null);


  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBookDetails(data);
        } else {
          throw new Error('Failed to fetch book details');
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

 const handleCart=()=>{
  dispatch(addToCart(bookDetails.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',bookDetails.volumeInfo.title, quantity, bookDetails.saleInfo?.listPrice?.amount || 200));
 }

 const backToGenresPage=()=>{
  navigate('/genres')
 }

  return (
    <div>
      <Navbar/>
      {bookDetails ? (
        <div className="product-details-success-view" >
          <div className="product-details-container">
            <img src={bookDetails.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'} alt="book-cover" className="product-image" />
            <div className="product">
              <h1 className="product-name">{bookDetails.volumeInfo.title}</h1>
              <p className="label">Description:</p>
              <p className="product-description">{bookDetails.volumeInfo.description}</p>
              <div className="label-value-container">
                  <p className="label">Authors:</p>
                  <p className="value">{bookDetails.volumeInfo.authors ? bookDetails.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                </div>
              <div className="label-value-container">
                  <p className="label">Price:</p>
                  <p className="value">Rs {bookDetails.saleInfo?.listPrice?.amount || 200}/-</p>
                </div> 
              <hr className="horizontal-line" />
              <div className="quantity-container">
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={handleDecrease} 
             
                >
                  <BsDashSquare className="quantity-controller-icon" />
                </button>
                
                <p className="quantity" style={{marginTop:'0.9em'}}>{quantity}</p>
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={handleIncrease} 
                >
                  <BsPlusSquare className="quantity-controller-icon" />
                </button>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', padding:'1em'}}>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCart}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={backToGenresPage}
              >
                Back
              </button>
              </div>
              
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
      }  

