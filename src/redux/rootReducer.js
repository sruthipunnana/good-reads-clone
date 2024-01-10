import { combineReducers } from 'redux'
import { booksReducer, orderReducer, shippingReducer, userReducer } from './reducers'
import { popularBooksReducer } from './reducers'
import { genresReducer } from './reducers'
import { cartReducer } from './reducers'

const combinedReducer = combineReducers({
    user: userReducer,
    popularBooks: popularBooksReducer,
    genres: genresReducer,
    books:booksReducer,
    cart:cartReducer,
    shipping: shippingReducer,
    orderHistory: orderReducer
  
})

export default combinedReducer