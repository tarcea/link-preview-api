import React, { useEffect, useState } from 'react'

const Message = ({ message }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowMessage(true)
    }, 1000);
    return () => {
      clearTimeout(delay)
    }
  }, []); 

console.log(message)
  return (
    <div>
      {showMessage && (<p>{message}</p>)}
    </div>
  )
}

export default Message
