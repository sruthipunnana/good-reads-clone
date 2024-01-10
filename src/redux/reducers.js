import * as types from './actionTypes'

const initialState= {
    loading:null, 
    currentUser:null,
    popularBooks:[],
    books:[],
    selectedGenres:[],
    cartItems:[],
    shippingData:{},
    error:null,
    orders:[]
} 
// user reducer
export const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.REGISTER_START:
        case types.LOGIN_START:
        case types.LOGOUT_START:
        case types.GOOGLE_START:
           return {
            ...state,
            loading:true
           }
           case types.LOGOUT_SUCCESS:
            return{
                ...state,
                currentUser:null,
                loading:false,
                error:null
            }
            case types.SET_USER:
                return {
                 ...state,
                 loading:false,
                 currentUser:action.payload
                }
           case types.REGISTER_SUCCESS:
           case types.LOGIN_SUCCESS:
           case types.GOOGLE_SUCCESS:
            return {
             ...state,
             loading:false,
             currentUser:action.payload,
             error:null
            }
            case types.REGISTER_FAILURE:
            case types.LOGIN_FAILURE:
            case types.LOGOUT_FAILURE:
            case types.GOOGLE_FAILURE:
           return {
            ...state,
            loading:false,
            error:action.payload
           }
        default:
            return state
    }
}
// featured books
export const popularBooksReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.FETCH_POPULAR_BOOKS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case types.FETCH_POPULAR_BOOKS_SUCCESS:
        return {
          ...state,
          loading: false,
          popularBooks: action.payload,
        };
      case types.FETCH_POPULAR_BOOKS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      
      default:
        return state;
    }
  };

//   genre books 

export const genresReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.SET_SELECTED_GENRES:
        return {
          ...state,
          selectedGenres: action.payload,
        };
      default:
        return state;
    }
  };
  

 export  const booksReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.SET_BOOKS:
        return {
          ...state,
          books: action.payload,
        };
      default:
        return state;
    }
  };

  // cart reudcer 
  export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.ADD_TO_CART:
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.name === action.payload.name
        );
  
        if (existingItemIndex !== -1) {
          // If the item already exists, replace its quantity with the payload quantity
          const updatedCart = state.cartItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: action.payload.quantity }
              : item
          );
          return { ...state, cartItems: updatedCart };
        } else {
          // If the item is not in the cart, add it
          const newItem = {
            image: action.payload.image,
            name: action.payload.name,
            quantity: action.payload.quantity,
            price: action.payload.price,
          };
          return {
            ...state,
            cartItems: [...state.cartItems, newItem],
          };
        }
        case types.REMOVE_FROM_CART:
          const updatedCart = state.cartItems.filter(
            (item) => item.name !== action.payload.name
          );
          return {
            ...state,
            cartItems: updatedCart, // Removes the specific item from the cart
          };
          case types.REMOVE_ALL_FROM_CART:
            return {
              ...state,
              cartItems: [], // Clears all items from the cart
            };
        
          case types.CLEAR_CART:
              return {
                ...state,
                cartItems: [], // Reset the cart items to an empty array
              };
      default:
        return state;
    }
  };
  

  // shipping data 
 export const shippingReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.SAVE_SHIPPING_DATA:
        return {
          ...state,
          shippingData: action.payload,
        };
      default:
        return state;
    }
  };

  // order details
 export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.ADD_NEW_ORDER:
        return {
          ...state,
          orders: [...state.orders, ...action.payload],
        };
      default:
        return state;
    }
  };
  
