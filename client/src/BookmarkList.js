import React, { useState, useEffect } from 'react';
import BookmarkCard from './BookmarkCard';
import axios from 'axios';

const BookmarkList = ({ setMessage }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const result = await axios.get('/api/bookmarks/');
      setBookmarks(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchBookmarks();
  },[]);

console.log('martor')
  return (
    <div>
      {bookmarks && bookmarks.map(bookmark => (
        <BookmarkCard bookmark={bookmark} key={bookmark.id} setMessage={setMessage} />
      ))}
    </div>
  )
}

export default BookmarkList
