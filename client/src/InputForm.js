import axios from 'axios';
import React, { useState } from 'react'

const InputForm = ({ setMessage }) => {
  const [value, setValue] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('bookmark created');
    sendRequest();
    setValue('');
  };

  return (
    <div>
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
