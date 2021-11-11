import React from 'react';
import axios from 'axios';

const BookmarkCard = ({ bookmark, setMessage }) => {
  const { title, description, image, url, id } = bookmark;

  const deleteBookmark = () => {
    setMessage('bookmark deleted')
    axios.delete(`/api/bookmarks/${id}`);
    console.log(id, 'deleted')
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <img src={image} alt={title}/>
      <p>{url}</p>
      <h1 onClick={() => deleteBookmark(id)}>delete</h1>
    </div>
  )
}

export default BookmarkCard
