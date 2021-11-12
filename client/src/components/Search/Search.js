import React, { useEffect, useState } from 'react';
import BookmarkList from '../BookmarkList/BookmarkList';
import './Search.css';

const Search = ({ bookmarks, setMessage, deleteBookmark }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const editSearchTerm = (e) => {
      setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setData(bookmarks)
  },[bookmarks]);
    
  const dSearch = () => {
    return data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  };

  return (
   bookmarks.length 
    && (<div  className="search__container">
        <input type="text"
          className="search__input-field"
          value={searchTerm}
          onChange={editSearchTerm}
          placeholder="Search"
        />
        <BookmarkList 
          setMessage={setMessage}
          deleteBookmark={deleteBookmark}
          bookmarks={dSearch()}/>
    </div>)
  );
};

export default Search;