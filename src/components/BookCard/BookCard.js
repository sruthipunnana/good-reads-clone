
import './BookCard.css'

export const BookCard = (props) => {
    const { each:book } = props;
  
    // Check if 'book' is undefined or null before accessing its properties
    if (!book || !book.volumeInfo || !book.volumeInfo.imageLinks) {
      return null;
    }
  
    const { volumeInfo, saleInfo } = book;
    const { imageLinks, title, authors } = volumeInfo;
  
    return (
        <div className='card-container mb-3' data-testid='book'> 
         <div className="card h-100" style={{width: '16rem'}}>
         {imageLinks && (<img src={imageLinks.thumbnail} alt={title} className="thumbnail" />)}
          <div className="card-body">
            <h5 className="card-title" style={{color:'rgb(39, 120, 155)'}}>{title}</h5>
            <p className="card-text"><span style={{color:'rgb(255, 21, 0)'}}>Author: </span> {authors.join(', ')||'Unknown'}</p>
            <p className="card-text"><span  style={{color:'rgb(255, 21, 0)'}}>Price:</span> {saleInfo?.listPrice?.amount || 200}/-</p>
        
          </div>
        </div>
        </div>
        
    );
  };
  

