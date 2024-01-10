import { Navbar } from '../Navbar/Navbar'
import { CartListView } from '../CartListView/CartListView'
import './Cart.css'
import { CartSummary } from '../CartSummary/CartSummary'
import { useDispatch, useSelector } from 'react-redux'
import { EmptyCartView } from '../EmptyCart/EmptyCart'
import { useNavigate } from 'react-router-dom'
import { removeAllFromCart } from '../../redux/actions'
export const Cart = () => {
      const cart = useSelector((state)=> state.cart.cartItems)
      const navigate= useNavigate()
      const dispatch= useDispatch()
      const showEmptyView = cart.length === 0

      const onClickRemoveAllBtn=()=>{
        dispatch(removeAllFromCart())
      }
      
      const goToBookItemPage=()=>{
          navigate('/genres')
      }
      return (
        <>
          <Navbar />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">

                <div className="remove-all-btn">
                  <button
                    type="button"
                    className="remove-all-btn"
                    onClick={onClickRemoveAllBtn}
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                <div style={{display:'flex',justifyContent:'space-between'}}>
                <div>
                <button className='btn btn-warning' style={{color:'white'}} type='button' onClick={goToBookItemPage}>Back</button>
                </div>  
                <CartSummary />
                </div>
              </div>
            )}
          </div>
        </>
      
    
      )
      }


