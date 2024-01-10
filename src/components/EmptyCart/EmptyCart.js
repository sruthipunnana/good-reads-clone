import {Link} from 'react-router-dom'

import './EmptyCart.css'

export const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

    <Link to="/genres">
      <button type="button" className="btn btn-warning" style={{color:'white'}}>
        Shop Books
      </button>
    </Link>
  </div>
)

