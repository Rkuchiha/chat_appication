import React, { useState } from 'react'
import './ChatContainer.css'
import { FaRegSmileWink } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import Picker from 'emoji-picker-react';

export default function InputText({ addMessage, user }) {

  const [message, setMessage] = useState('')
  const [showPicker, setShowPicker] = useState(false);

  function addAMessage() {
    addMessage({
      message
    })
    setMessage('')
  }

  return (
    <div className="message-form" >
      <input
        className="message-input"
        placeholder="Write something..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <FaRegSmileWink onClick={() => setShowPicker(val => !val)} />
          {showPicker && <Picker
          pickerStyle={{ width: '100%'  }}
          onEmojiClick={(emojiObject)=> setMessage((prevMsg)=> prevMsg + emojiObject.emoji)} />}
        </span>
      </label>
      <button
        className="send-button"
        onClick={() => addAMessage()}
      >
        <IoMdSend className="send-icon" />
      </button>
    </div>
  )
}
