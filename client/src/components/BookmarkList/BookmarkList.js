import React from 'react';
import BookmarkCard from '../BookmarkCard/BookmarkCard';
import './BookmarkList.css'

const BookmarkList = ({ setMessage, bookmarks, deleteBookmark }) => {
  

  return (
    bookmarks.length ? (<><div className="bookmark-list__counter">
      {bookmarks ? bookmarks.length : ''}
    </div>
    <div className="bookmark-list__container">
      <div className="bookmark-list--flex">
        {bookmarks && bookmarks.map((bookmark, index) => (
          <BookmarkCard 
            bookmark={bookmark} 
            index={index}
            key={bookmark.id} 
            setMessage={setMessage} 
            deleteBookmark={deleteBookmark} />
        ))}
      </div>
    </div></>) : <div className="bookmark-list__nothing">Nothing here...</div>
  )
}

export default BookmarkList
