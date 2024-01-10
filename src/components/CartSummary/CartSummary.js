import { useNavigate } from 'react-router-dom'
import './CartSummary.css'
import { useSelector } from 'react-redux'

export const CartSummary = () => {
    const cart= useSelector((state)=>state.cart.cartItems)
    const navigate= useNavigate()
      let total = 0
      cart.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
      })

    const navigateToShippingAddress=()=>{
        navigate('/checkout')
    }

      return (
        
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total}
              /-
            </h1>
            <p className="total-items">{cart.length} Items in cart</p>
           <div>
          <button type="button"  onClick={navigateToShippingAddress} className="btn btn-info" style={{color:'whitesmoke'}}>
            Checkout
          </button>
          </div>
          </div>
          
    
      )
    }
