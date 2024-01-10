import React from 'react'
import {  NavLink, useNavigate } from 'react-router-dom'
import './Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { registerInitiate } from '../../../redux/actions'

export const Register = () => {
    const [state, setState] =React.useState({
        displayName:'',
        email:'',
        password:'',
        confirmPassword:''

    })



    const {currentUser}= useSelector((state)=>state.user)
    const error= useSelector((state)=>state.user.error)
    console.log(error)

    const dispatch= useDispatch()

    const navigate= useNavigate()

    React.useEffect(()=>{
        if(currentUser){
            navigate('/')
        }
    },[currentUser,navigate])

    const {displayName,email,password, confirmPassword} =state
   
    const submitForm=async(e)=>{
       e.preventDefault()
       if(password!==confirmPassword){
        alert('Passwords do not match')
        return;
       }
       try{
          await dispatch(registerInitiate(email,password,displayName)) 
         
      }
      catch(error){
        console.log('Error occurred:', error);
      }
      
       setState({displayName:'', password:'', confirmPassword:'', email:''})
      
    }
 
    const handleChange=(e)=>{
        let {name,value} =e.target 
        setState({...state, [name]:value})

    }


  return (
    <div className="register-form-container">
          <form className="form-container" onSubmit={submitForm}>
          <h3>SignUp </h3>
          <div className="input-container">
             <label className="input-label" htmlFor="email">FULL NAME</label>
             <input
               type="text"
               id="name"
               name='displayName'
               className="email-input-field"
               onChange={handleChange}
               placeholder="Full Name"
               value={displayName}
               required
            />
            </div>
            <div className="input-container">
             <label className="input-label" htmlFor="email">EMAIL</label>
             <input
               type="text"
               id="email"
               name='email'
               className="email-input-field"
               value={email}
               onChange={handleChange}
               placeholder="Email Address"
               required
            />
            </div>
           <div className="input-container">
            <label className="input-label" htmlFor="password">PASSWORD</label>
            <input
            type="password"
            name='password'
            id="password"
            className="password-input-field"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
            />
           </div> 
           <div className="input-container">
            <label className="input-label" htmlFor="password">CONFIRM PASSWORD</label>
            <input
            type="password"
            name='confirmPassword'
            id="confirmPassword"
            className="password-input-field"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            />
           </div> 
           {error&&<p style={{color:'red'}}>{error.substring(5,)}</p>}
         <div style={{margin:'1.5em', display:'flex', flexDirection:'column'}}>
         <button type="submit" className='btn btn-primary' style={{marginBottom:'10px'}}> Sign Up</button>
          <NavLink to='/login' className='link btn btn-outline-success'>
            <i className='fas fa-angle-left'></i>Back
          </NavLink>
         </div>
         
        </form>      
    </div>
  )
}
export default Register