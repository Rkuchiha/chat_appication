import React, { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client";
import ChatBoxReciever from './ChatBox';
import InputText from './InputText';
import './ChatContainer.css'


export default function ChatContainer() {

  let socketio = socketIOClient("http://localhost:5001")
  const [chats, setChats] = useState([])
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
  const random_user = Math.floor(Math.random() * user_list.length);
  const user = (random_user, user_list[random_user]);
  const word = user.charAt(0);



  useEffect(() => {
    scrollToBottom()
  }, [chats])

  useEffect(() => {
    socketio.on('chat', senderChats => {
      setChats(senderChats)
    })
  })


  function sendChatToSocket(chat) {
    socketio.emit("chat", chat)
  }

  function addMessage(chat) {
    const newChat = { ...chat, user: user }
    setChats([...chats, newChat])
    sendChatToSocket([...chats, newChat])
  }

  function ChatsList() {
    return (<div className='chat_container' style={{ height: '80vh' }}>
      {
        chats.map((chat, index) => {
          return <ChatBoxReciever key={index} message={chat.message} user={chat.user} />
        })
      }
      <div ref={messagesEndRef} />
    </div>)
  }

  return (
      <div >
        <div className='card_left'>
        <span>{word}</span>
        <h4>{user}</h4>
        </div>
        <ChatsList />
        <InputText addMessage={addMessage} user={user}/>
      </div>

  )
}
