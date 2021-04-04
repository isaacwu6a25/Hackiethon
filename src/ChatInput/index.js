import React from 'react';
import { ChatContext } from '../App.js';
import './ChatInput.css';

function ChatInput() {
  const chatData = React.useContext(ChatContext);
  const input = React.useRef();

  React.useEffect(() => {
    if (chatData.selectedChatroom) {
      input.current.focus();
    }
  }, [chatData.selectedChatroom, input]);

  const onSubmit = ev => {
    if (ev.key !== 'Enter') {
      return;
    }
    chatData.selectedChatroom.sendMessage(input.current.value);
    input.current.value = '';
  }

  return (
    <div id="chat-input">
      <input id="input" type="text" ref={input} onKeyUp={onSubmit} placeholder='Drop your wise words here.' />
    </div>
  )
}

export default ChatInput;