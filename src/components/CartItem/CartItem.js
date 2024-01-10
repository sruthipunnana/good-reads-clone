import {AiFillCloseCircle} from 'react-icons/ai'
import './CartItem.css'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/actions'


export const CartItem =(props)=> {
      
      const {cartItemDetails} = props
      const {image, name, quantity, price} = cartItemDetails
      const totalPrice = price * quantity
      const dispatch= useDispatch()

      const onRemoveCartItem=()=>{
        dispatch(removeFromCart(name))
      }

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={image} alt={name} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{name}</p>
              <p className="cart-product-brand">Quantity: {quantity}</p>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {totalPrice}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            data-testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }


