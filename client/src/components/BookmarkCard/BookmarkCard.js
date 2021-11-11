import React from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

import './BookmarkCard.css';

const BookmarkCard = ({ bookmark, deleteBookmark, index }) => {
  const { title, description, image, url, id } = bookmark;

const stopPropagation = (e, id) => {
  e.stopPropagation();
  deleteBookmark(id);
}

  return (
    bookmark 
    ?  (<div className="bookmark-card__container" onClick={() => window.open(url, "_blank")}>
      <h4 className="bookmark-card__title">{title}</h4>
      <img 
        className="bookmark-card__image"
        src={image || `https://picsum.photos/300/200?random=${index}`} 
        alt={title}/>
        <p className="bookmark-card__description bookmark-card__description--disabled">{description}</p>
        <h2 className="bookmark-card__delete" onClick={(e) => stopPropagation(e, id)}><TiDeleteOutline /></h2>
    </div>)
    : <div>Loading ...</div>
  )
}

export default BookmarkCard
