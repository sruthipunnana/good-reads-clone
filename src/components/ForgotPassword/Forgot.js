import { sendPasswordResetEmail } from 'firebase/auth'
import React from 'react'
import { auth } from '../../firebase'
import './Forgot.css'
import { useNavigate } from 'react-router-dom'

export const Forgot = () => {
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault(); 
      const emailValue = e.target.email.value;
      sendPasswordResetEmail(auth, emailValue)
        .then(() => {
          alert('Check your email');
          navigate('/login');
        })
        .catch((error) => {
          alert(error.code);
        });
    };
  
    return (
      <div className='forgot-container'>
        <h1 className='heading'>Forgot Password</h1>
        <form className='forgot-form' onSubmit={handleSubmit}>
          <input type='email' name='email' className='form-control' placeholder='Enter email address' />
          <br />
          <button type='submit' className='btn btn-info'>Reset</button>
        </form>
      </div>
    );
  };
  
