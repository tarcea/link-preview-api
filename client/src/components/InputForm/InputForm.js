import axios from 'axios';
import React, { useState } from 'react';
import './InputForm.css'

const InputForm = ({ setMessage, fetchBookmarks }) => {
  const [value, setValue] = useState('');
  const isUrlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gmi;

  const sendRequest = async () => {
    const url = '/api/bookmarks';
    const data = { "query": value };
    const headers = {
      "Content-Type": "application/json"
  }
    try {
      await axios.post(url, data, headers)
    } catch (err) {
      console.log(err)
    }
  };

  const handleChange  = async (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUrlRegex.test(value)) {
      await sendRequest();
      await fetchBookmarks()
      setMessage('');
    } else {
      setMessage('pleas provide a valid web address')
    }
    setValue('');
  };

  return (
    <div className="input-form__container">
      <form onSubmit={handleSubmit} >
        <input 
          type="text"
          value={value}
          name="url" 
          required 
          onChange={handleChange} />
          <input type="submit" />
      </form>
    </div>
  )
}

export default InputForm
