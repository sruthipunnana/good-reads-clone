import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { googleSignInInitiate, loginInitiate } from '../../../redux/actions'
import { useSelector,useDispatch } from 'react-redux'

export const Login = () => {
    const [state, setState] =React.useState({
        email:'',
        password:'',
    })
    
    
    const {email,password} =state 

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
   
    const submitForm=async(e)=>{
        e.preventDefault()
        if(!email || !password){
            return;
        }
        try {
          await dispatch(loginInitiate(email, password));
          setState({ email: '', password: ''});
        

        } 
        catch (error) {
         console.log(error.code);
        }
       
      
    
    }
   
    const handleChange=(e)=>{
        let {name,value} =e.target 
        setState({...state, [name]:value})

    } 

   
    const resetPassword=()=>{
      navigate('/reset-password')
    }



  const loginWithGoogle=()=>{
    dispatch(googleSignInInitiate())
  
  }
  
  return (
    <div className="login-form-container">
          <form className="form-container" onSubmit={submitForm}>
             <button className='btn btn-success' onClick={loginWithGoogle}>Continue with Google</button>   
             <p className='or'>OR</p>
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
           
           {error&&<p style={{color:'red'}}>{error.substring(5,)}</p>}
          <button type="submit" className="login-button" style={{marginBottom:'0em'}}>Login</button>
          <p style={{textDecoration:'underline', marginTop:'5px', marginBottom:'0px', fontFamily:'Roboto'}} onClick={resetPassword}>Forgot password?</p>
          <hr/>
          <p style={{marginTop:'1px', fontFamily:'Roboto', color:"#64748b", padding:'0px'}}>Don't have an account?</p>
          <Link to='/register'>
          <button type="submit" className='btn btn-secondary'> Register Now</button>
          </Link>
        </form>      
    </div>
  )
}
