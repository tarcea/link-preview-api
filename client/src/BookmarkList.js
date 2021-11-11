import React from 'react';
import BookmarkCard from './BookmarkCard';

const BookmarkList = ({ setMessage, bookmarks, deleteBookmark }) => {
  

  return (
    <div>
      {bookmarks && bookmarks.map(bookmark => (
        <BookmarkCard bookmark={bookmark} key={bookmark.id} setMessage={setMessage} deleteBookmark={deleteBookmark} />
      ))}
    </div>
  )
}

export default BookmarkList
