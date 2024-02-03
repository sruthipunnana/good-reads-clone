import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useSelector,useDispatch } from 'react-redux'
import { logoutInitiate } from '../../redux/actions'

export const Navbar = () => {

  const dispatch= useDispatch()
  const {currentUser} = useSelector((state)=>state.user)
  const cart = useSelector((state)=>state.cart.cartItems)
   const items= cart.length

  
  const onClickLogout=()=>{
     if (currentUser){
       dispatch(logoutInitiate())
     }
    }
     
  return (
    <div>
        <nav className="nav-header" style={{backgroundColor:'#f7f1df'}}>
        <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <NavLink to="/">
            <img
              className="website-logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqy5RzEAJ1816rWtZ9ECtOPzZiyPgrBNSG1M3WKAefAXY7PAyC0_T48gVh9UoqW0SCy8Y&usqp=CAU"
              alt="website logo"
              style={{width:'3em', borderRadius:'50%'}}
            />
          </NavLink>

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-img"
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <NavLink to="/">
            <img
              className="website-logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqy5RzEAJ1816rWtZ9ECtOPzZiyPgrBNSG1M3WKAefAXY7PAyC0_T48gVh9UoqW0SCy8Y&usqp=CAU"
              alt="website logo"
            />
          </NavLink>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-menu-item">
              <NavLink to="/genres" className="nav-link">
                Genres
              </NavLink>
            </li>

            <li className="nav-menu-item">
              <NavLink to="/order" className="nav-link">
                My Orders
              </NavLink>
            </li>

            <li className="nav-menu-item">
              {items!==0? <NavLink to="/cart" className="nav-link">
                Cart <span className='cart-count'>{items}</span>     
              </NavLink>:  <NavLink to="/cart" className="nav-link">
                Cart    
              </NavLink>}
             
            </li>
            
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
<div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <NavLink to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-img"
              />
            </NavLink>
          </li>

          <li className="nav-menu-item-mobile">
            <NavLink to="/genres" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-img"
              />
            </NavLink>
          </li>
          <li className="nav-menu-item-mobile">
           {items!==0?<NavLink to="/cart" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-img"
              />
            <span className='cart-count'>{items}</span>
            </NavLink>: <NavLink to="/cart" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-img"
              />
            </NavLink>}
          </li>
          <li className="nav-menu-item-mobile">
            <NavLink to="/order" className="nav-link">
              My Orders
            </NavLink>
          </li>
        </ul>
      </div>
</nav> 
    </div>
  )
}


