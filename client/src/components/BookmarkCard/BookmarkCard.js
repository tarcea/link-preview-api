import React from 'react';
import './BookmarkCard.css';

const BookmarkCard = ({ bookmark, setMessage, deleteBookmark, index }) => {
  const { title, description, image, url, id } = bookmark;

  // const deleteBookmark = () => {
  //   setMessage('bookmark deleted')
  //   axios.delete(`/api/bookmarks/${id}`);
  //   console.log(id, 'deleted')
  // };

  return (
    <div className="bookmark-card__container">
      <h1>{title}</h1>
      <p>{description}</p>
      <img 
        className="bookmark-card__image"
        src={image || `https://picsum.photos/300/200?random=${index}`} 
        alt={title}/>
      <p>{url}</p>
      <h1 onClick={() => deleteBookmark(id)}>delete</h1>
    </div>
  )
}

export default BookmarkCard
