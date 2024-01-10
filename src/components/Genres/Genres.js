import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedGenres, fetchBooksByGenres } from '../../redux/actions';
import {Navbar} from '../Navbar/Navbar'
import './Genres.css'
import { NavLink } from 'react-router-dom';

const allGenres = [
  'Biography',
  'Education',
  'History',
  'Philosophy',
  'Romance',
  'Science',
  'Sports',
  'Business',
  'Economy',
  'Technology',
];

export const Genres=() =>{
  const dispatch = useDispatch();
  const selectedGenres = useSelector((state) => state.genres.selectedGenres);
  const books = useSelector((state) => state.books.books);


  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedGenres = checked
      ? [...selectedGenres, value]
      : selectedGenres.filter((genre) => genre !== value);

    dispatch(setSelectedGenres(updatedGenres));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchBooksByGenres(selectedGenres));
  };

  
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filterBooks = () => {
    if (!searchQuery) {
      return books;
    }

    return books.filter((book) => {
      const { title, authors, description } = book.volumeInfo;
      const lowercaseTitle = title ? title.toLowerCase() : '';
      const lowercaseAuthors = authors ? authors.join(', ').toLowerCase() : '';
      const lowercaseDescription = description ? description.toLowerCase() : '';

      return (
        lowercaseTitle.includes(searchQuery) ||
        lowercaseAuthors.includes(searchQuery) ||
        lowercaseDescription.includes(searchQuery)
      );
    });
  };

  const filteredBooks = filterBooks();


  return (
<div>
     <Navbar/>
     <div style={{display:'flex'}} className='main-container'>
        <form onSubmit={handleSubmit} className='checkbox-container'>
        <div className='forms'>
        {allGenres.map((genre) => (
                <div className='input'>
                  <input
                     type="checkbox"
                     value={genre}
                     onChange={handleCheckboxChange}
                     checked={selectedGenres.includes(genre)}
                    />
                 <label key={genre} style={{marginLeft:'5px', fontFamily:'Roboto'}} >{genre} </label>
               </div>
        ))}
        </div>
        <div className='fetch-button-container'> <button type="submit" className='btn btn-warning fetch-books' >Fetch Books</button></div>
        <hr/>
      </form>
      <div>
     
      <div style={{textAlign:'center'}}>
      <input placeholder='Search by author, title, description🔍' className='form-control' style={{width:'70vw', margin:'auto', marginTop:'3px'}}type='search' onChange={handleChange}/>
      </div>
     
      <ul style={{display:'flex', flexWrap:'wrap' ,justifyContent:'center'}}>
    {filteredBooks.map((book) => (
    <NavLink to={`/books/${book.id}`} className='active'>
    <div className='card-container mb-3' key={book.id} id={book.id} > 
      <div className="card" style={{ width: '24rem' , height:'100vh'}}>
        {book.volumeInfo.imageLinks && (
          <div style={{textAlign:'center'}}>
            <img
              src={book.volumeInfo.imageLinks.thumbnail || 'https://via.placeholder.com/150'}
              alt="Book Cover"
              style={{ width: '100px', height: '150px' }}
            />
          </div>
        )}
        <div className="card-body">
          <h5 className="card-title" style={{ color: 'rgb(39, 120, 155)' }}>{book.volumeInfo.title}</h5>
          <p className="card-text"><span style={{ color: 'rgb(255, 21, 0)' }}>Authors: </span>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
          <p className="card-text">
                  <span style={{ color: 'rgb(255, 21, 0)' }}>Description: </span>
                 {book.volumeInfo.description && book.volumeInfo.description.length > 50
                ? `${book.volumeInfo.description.substring(0, 300)}...`
                 : book.volumeInfo.description}</p>
          <p className="card-text"><span style={{ color: 'rgb(255, 21, 0)' }}>Price:</span> {book.saleInfo?.listPrice?.amount || 200}Rs/-</p>
        </div>
      </div>
    </div>
    </NavLink>
    
  ))}
</ul>

      </div>
     </div>
 </div>
  );
}


