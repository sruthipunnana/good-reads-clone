import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularBooks } from '../../redux/actions';
import { Navbar } from '../Navbar/Navbar'
import {BookCard} from '../BookCard/BookCard';
import { Link } from 'react-router-dom';
import './Home.css'



export const Home = () => {
  const dispatch = useDispatch();
  const { popularBooks, loading, error } = useSelector((state) => state.popularBooks);
 

  useEffect(() => {
    dispatch(fetchPopularBooks());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div style={{ marginTop:'0px'}}> 
      <div className='heading-container'>
      <h3 className='popular-books-title'>Featured Books</h3>
      <Link to='/genres'><button type='button' className='btn btn-warning' style={{marginTop:'1em', color:'whitesmoke',marginRight:"1.2em"}}>Explore Genres📚</button></Link>
      </div>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="books-container">
        {popularBooks.map((book) => (
          <BookCard key={book.id} each={book} />
        ))}
      </div>
      </div>
    
    </div>
  );
};

