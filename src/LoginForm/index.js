import React from 'react';
import { ChatContext } from '../App.js';
import { css, /*jsx*/ } from '@emotion/core';

import './LoginForm.css';

function LoginForm(props) {
  const chatData  = React.useContext(ChatContext);
  const userInput = React.useRef();
  const [error, setError] = React.useState(false);
  const login = (ev) => {
    if (ev.type === 'keyup' && ev.key !== 'Enter') {
      return;
    }
    setError(false);
    chatData.login(userInput.current.value).catch(() => setError(true));
    props.history.push('/main');

  }
  const logout = () => chatData.logout();

  if (chatData.user.username === null) {
    return (
      
      <div id="login">
        <h1 className="login">Syntax Chats</h1>
        <h2 className="title-text">Where motivation comes first.</h2>
        
        <input placeholder="Enter your username" id="login-input" type="text" ref={userInput} onKeyUp={login} autoFocus />
        <button id="login-button" onClick={login}>Login</button>
        {error && <>&nbsp;Login error, please try again.</>}
        
      </div>
    );
  }
  else {
    return (
      <div id="login-details">
        <h1>Speedy Chatrooms</h1>

        <div className="username">
          <b id="username">{chatData.user.username}</b>
          <button id="logout" onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default LoginForm;
