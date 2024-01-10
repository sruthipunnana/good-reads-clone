
import { CartItem } from '../CartItem/CartItem'
import { useSelector } from 'react-redux'
import './CartListView.css'

export const CartListView = () => {
    const cart= useSelector((state)=>state.cart.cartItems) 
    console.log(cart)

      return (
        <ul className="cart-list">
          {cart.map(eachCartItem => (
            <CartItem key={eachCartItem.name} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      )
    }



