import React from 'react'
import './ChatContainer.css'
export default function ChatBoxReciever({ user, message }) {

  localStorage.setItem("user", user);
  const word = user.charAt(0);
  return (
    <div className='message'>
      <div className='messageInfo'>
        <span className='logo'>{word}</span>
        <span>{user}</span>
      </div>
      <div className="messageContent">
        <p>{message}</p>
      </div>
    </div>
  )
}