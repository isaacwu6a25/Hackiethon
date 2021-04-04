import React, { Component, useState } from 'react';
import { ChatContext } from '../App.js';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
  
import './UserProfile.css';

const UserProfile = (props) => {
    const [classes, setClasses] = useState([])
    const chatData  = React.useContext(ChatContext);

    return (
        <div class="user-profile">
            <div class="page-profile">
                <NavLink to = "/main">Back</NavLink>
                <h1>Name: {chatData.user.username}</h1>
                {console.log(chatData)}
                
            </div>
        </div>
    )

}

export default UserProfile;