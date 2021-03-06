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
      if (err.message === 'Request failed with status code 500') {
        setMessage('the requested URL does not allow fetching info')
      }
      console.log(err.message)
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
      // setMessage('');
    } else {
      setMessage('pleas provide a valid web address')
    }
    setValue('');
  };

  return (
    <div className="input-form__container">
      <form onSubmit={handleSubmit} >
        <input
          placeholder="paste your URL here"
          type="text"
          value={value}
          name="url" 
          required 
          onChange={handleChange} />
          <input type="submit" value="add !t" className={value === '' ? 'input-form__button--empty' : 'input-form__button--dark'} />
      </form>
    </div>
  )
}

export default InputForm
