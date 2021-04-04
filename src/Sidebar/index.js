import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import ChatRooms from '../ChatRooms/index.js';

import './Sidebar.css';

function Sidebar(props) {
    return (
        <div class="sidebar-container">
            <NavLink id="icon" to="/profile" class = "profile-icon"><img src="/profile.png" /></NavLink>
            <NavLink id="webinars" className="link" to = "/webinars">Upcoming Webinars</NavLink>
            <NavLink id="calendar" className="link" to = "/calendar">Calendar</NavLink>
            <ChatRooms id="chatrooms" />

        </div>
    )
}

export default Sidebar;