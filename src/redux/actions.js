import { auth, googleProvider } from '../firebase'
import * as types from './actionTypes'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { updateProfile } from 'firebase/auth'
import apiKey from '../components/API'

// user related actions
const registerStart=()=>({
  type:types.REGISTER_START,
})

const registerSuccess=(user)=>({
    type:types.REGISTER_SUCCESS,
    payload:user,
  })


const registerFailure=(error)=>({
    type:types.REGISTER_FAILURE,
    payload:error,
  })


const loginStart=()=>({
    type:types.LOGIN_START,
  })

const loginSuccess=(user)=>({
 
    type:types.LOGIN_SUCCESS,
      payload:user,
    })
  
const loginFailure=(error)=>({
      type:types.LOGIN_FAILURE,
      payload:error,
    })


    const googleStart=()=>({
      type:types.GOOGLE_START,
    })
  
  const googleSuccess=(user)=>({
        type:types.GOOGLE_SUCCESS,
        payload:user,
      })
    
  const googleFailure=(error)=>({
        type:types.GOOGLE_FAILURE,
        payload:error,
      })
  
const logoutStart=()=>({
        type:types.LOGOUT_START,
      })
    
const logoutSuccess=()=>({
      type:types.LOGOUT_SUCCESS,
            })
      
const logoutFailure=(error)=>({
          type:types.LOGOUT_FAILURE,
          payload:error,
        }) 


export const setUser= (user)=>({
  type:types.SET_USER,
  payload: user
})
   

export const registerInitiate = (email, password, displayName) => {
    return function(dispatch) {
      dispatch(registerStart());
  
      // Initiating user creation with Firebase
      createUserWithEmailAndPassword(auth,email, password)
        .then(({ user }) => {
          // Updating user profile with display name
          updateProfile(user,{ displayName })
            .then(() => {
              dispatch(registerSuccess(user)); // Dispatch success action after profile update
            })
            .catch(error => {
              dispatch(registerFailure(error)); // Dispatch failure if updating profile fails
            });
        })
        .catch(error => {
          console.log(error)
          dispatch(registerFailure(error.code)); // Dispatch failure action if user creation fails
        });
    };
  };

  export const loginInitiate = (email, password) => {
    return function(dispatch) {
      dispatch(loginStart());
  
      // Initiating user login with Firebase
      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          dispatch(loginSuccess(user)); // Dispatch success action after successful login
        })
        .catch(error => {
          dispatch(loginFailure(error.code)); // Dispatch failure action if login fails
        });
    };
  };
  
  export const logoutInitiate = () => {
    return function(dispatch) {
      dispatch(logoutStart());
  
      // Initiating user login with Firebase
      signOut(auth)
        .then(() => 
          dispatch(logoutSuccess())// Dispatch success action after successful login
        )
        .catch(error => {
          dispatch(logoutFailure(error)); // Dispatch failure action if login fails
        });
    };
  };
  
  
export const googleSignInInitiate=()=>{
  return function(dispatch){
    dispatch(googleStart())
    signInWithPopup(auth, googleProvider)
    .then(({user})=>{
      dispatch(googleSuccess(user))
    })
    .catch((error)=>{
      dispatch(googleFailure(error.message))
    })
  }
}

// popular books related actions 
export const fetchPopularBooksRequest = () => ({ type: types.FETCH_POPULAR_BOOKS_REQUEST });
export const fetchPopularBooksSuccess = (books) => ({ type: types.FETCH_POPULAR_BOOKS_SUCCESS, payload: books });
export const fetchPopularBooksFailure = (error) => ({ type: types.FETCH_POPULAR_BOOKS_FAILURE, payload: error });

export const fetchPopularBooks = () => {
  return (dispatch) => {
    dispatch(fetchPopularBooksRequest());
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:popular&orderBy=relevance&key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchPopularBooksSuccess(data.items));
      })
      .catch((error) => {
        dispatch(fetchPopularBooksFailure(error.message));
      });
  };
};


//genre-books related actions
export const setSelectedGenres = (selectedGenres) => ({
  type: types.SET_SELECTED_GENRES,
  payload: selectedGenres,
});

export const setBooks = (books) => ({
  type: types.SET_BOOKS,
  payload: books,
});

export const fetchBooksByGenres = (selectedGenres) => 
   (dispatch) => {
  const API_KEY = apiKey;
  const genresQuery = selectedGenres.join('+subject:');
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=subject:${genresQuery}&key=${API_KEY}&maxResults=10`;

  fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      return response.json();
    })
    .then((data) => {
      const books = data.items || [];
      dispatch(setBooks(books));
    })
    .catch((error) => {
      console.error(error);
    });
};

// cart related 
export const addToCart = (image, name, quantity, price) => ({
  type: types.ADD_TO_CART,
  payload: { image, name,quantity, price }
});

export const removeFromCart = (name) => ({
  type: types.REMOVE_FROM_CART,
  payload: { name },
});

export const removeAllFromCart = () => ({
  type: types.REMOVE_ALL_FROM_CART,
});


export const saveShippingData = (data) => ({
  type: types.SAVE_SHIPPING_DATA,
  payload: data,
});

export const addNewOrder = (orderDetails) => ({
  type: types.ADD_NEW_ORDER,
  payload: orderDetails,
});

export const clearCart=()=>({
  type: types.CLEAR_CART,

})