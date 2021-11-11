import React, { useEffect, useState } from 'react'

const Message = ({ message, setMessage }) => {
  
  useEffect(() => {
    const delay = setTimeout(() => {
      setMessage('')
    }, 3000);
    return () => {
      clearTimeout(delay)
    }
  }, [setMessage]); 

console.log(message)
  return (
    <div>
      {<p>{message}</p>}
    </div>
  )
}

export default Message
