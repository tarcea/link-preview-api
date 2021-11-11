import React, { useEffect } from 'react';
import './Message.css';

const Message = ({ message, setMessage }) => {
  
  useEffect(() => {
    const delay = setTimeout(() => {
      setMessage('')
    }, 1500);
    return () => {
      clearTimeout(delay)
    }
  }, [setMessage]); 

console.log(message)
  return (
    <div className="message__container">
      {<p>{message}</p>}
    </div>
  )
}

export default Message
