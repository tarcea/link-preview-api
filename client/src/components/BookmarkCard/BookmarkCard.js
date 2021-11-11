import React from 'react';
import './BookmarkCard.css';

const BookmarkCard = ({ bookmark, deleteBookmark, index }) => {
  const { title, description, image, url, id } = bookmark;

  return (
    bookmark 
    ?  (<div className="bookmark-card__container">
      <h3 className="bookmark-card__title">{title}</h3>
      <img 
        className="bookmark-card__image"
        src={image || `https://picsum.photos/300/200?random=${index}`} 
        alt={title}/>
        <p className="bookmark-card__description">{description}</p>
        {/* <p className="bookmark-card__url bookmark-card__url--disabled">{url}</p> */}
        <p className="bookmark-card__delete" onClick={() => deleteBookmark(id)}>X</p>
    </div>)
    : <div>Loading ...</div>
  )
}

export default BookmarkCard
