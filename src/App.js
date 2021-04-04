import React, { Fragment, useEffect } from 'react';
import Conversations from '@twilio/conversations';
import {
  Route,
  NavLink,
  Switch,
  HashRouter
} from "react-router-dom";

import LoginForm from './LoginForm/index.js';
import ChatRooms from './ChatRooms/index.js';
import ChatLog from './ChatLog/index.js';
import ChatInput from './ChatInput/index.js';
import Sidebar from './Sidebar';
import UserProfile from './UserProfile';
import Calendar from './Calendar';

import './App.css';
import Webinars from './Webinars/index.js';
import Navbar from './Navbar/index.js';

export const ChatContext = React.createContext();

function App() {
  const [user, setUser] = React.useState({api: null, username: null, chatrooms: [], classrooms: []});
  const [selectedChatroom, setSelectedChatroom] = React.useState(null);
  const [showProfile, setShowProfile] = React.useState(false);

  const chatData = {
    user: user,
    selectedChatroom: selectedChatroom,

    login: (_username) => {
      document.body.style.cursor = 'progress';
      return fetch('/login', {
        method: 'POST',
        body: JSON.stringify({username: _username})
      }).then(res => res.json()).then(data => {
        Conversations.create(data.token).then(client => {
          document.body.style.cursor = 'default';
          setUser({
            api: client,
            username: _username,
            chatrooms: data.chatrooms,
          });
        });
      }).catch((error) => {
        document.body.style.cursor = 'default';
        throw error;
      });
    },

    logout: () => {
      setUser({api: null, username: null, chatrooms: [], classrooms: []});
      setSelectedChatroom(null);
    },

    selectChatroom: (sid) => {
      user.api.getConversationBySid(sid).then(conv => {
        setSelectedChatroom(conv);
      });  
    },

  }

  return (
    <div className="App">
      <ChatContext.Provider value={chatData}>
        <HashRouter>
        <Route exact path="/" component={LoginForm} />

          <Switch>
            {chatData.user.username !== null &&
              <div>
                <div id="chat">
                <Route path="/main" render={() =>
                  <Fragment>
                    <div className="container">
                      <div id="bulk">
                        <LoginForm />
                        <Sidebar />
                        
                        
                      </div>
                      <div id="chat-stuff">
                        <h2 id="heading">Chats</h2>
                        <ChatLog />
                        <ChatInput />
                          
                      </div>
                    </div>
                  </Fragment>
                }/>
                </div>
                <Route path="/profile" component={UserProfile} />
                <Route path="/webinars" component={Webinars} />
                <Route path = "/calendar" component= {Calendar} />
              </div>
            }
          </Switch>
        </HashRouter>
      </ChatContext.Provider>
    </div>

  );
}

export default App;