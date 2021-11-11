import React from 'react';
import BookmarkCard from '../BookmarkCard/BookmarkCard';

const BookmarkList = ({ setMessage, bookmarks, deleteBookmark }) => {
  

  return (
    <div>
      {bookmarks && bookmarks.map((bookmark, index) => (
        <BookmarkCard 
          bookmark={bookmark} 
          index={index}
          key={bookmark.id} 
          setMessage={setMessage} 
          deleteBookmark={deleteBookmark} />
      ))}
    </div>
  )
}

export default BookmarkList
