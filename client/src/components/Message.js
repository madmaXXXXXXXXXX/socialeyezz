import React from 'react'
import Pimg1 from'../images/profile-17.jpg'
import { FaRegMessage } from "react-icons/fa6";

function Message() {
  return (
    <div className="messages">
    <div className="heading">
      <h4>Messages</h4>
      <span>
        <FaRegMessage />
      </span>
    </div>
    <div className="search-bar">
      <span>
        <i className="uil uil-search" />
      </span>
      <input type="search" placeholder="Search Messages" id="message-search" />
    </div>
    <div className="category">
      <h6 className="active">Primary</h6>
      <h6>General</h6>
      <h6 className="message-requests">Requests(7)</h6>
    </div>
    <div className="message">
      <div className="profile-pic">
        <img src={Pimg1} />
        <div className="active" />
      </div>
      <div className="message-body">
        <h5>Kareena Joshua</h5>
        <p className="text-muted">Just woke up bruh..</p>
      </div>
    </div>
    <div className="message">
      <div className="profile-pic">
        <img src={Pimg1} />
        <div className="active" />
      </div>
      <div className="message-body">
        <h5>Dan Smith</h5>
        <p className="text-bold">2 New Messages</p>
      </div>
    </div>
    <div className="message">
      <div className="profile-pic">
        <img src={Pimg1} />
      </div>
      <div className="message-body">
        <h5>Chris Brown</h5>
        <p className="text-muted">Lol u right</p>
      </div>
    </div>
    <div className="message">
      <div className="profile-pic">
        <img src={Pimg1} />
      </div>
      <div className="message-body">
        <h5>Lana Rose</h5>
        <p className="text-bold">Birthday tomorrow!!</p>
      </div>
    </div>
    <div className="message">
      <div className="profile-pic">
        <img src="images/profile-11.jpg" />
      </div>
      <div className="message-body">
        <h5>Varun Nair</h5>
        <p className="text-muted">Ssup?</p>
      </div>
    </div>
    <div className="message">
      <div className="profile-pic">
        <img src="images/profile-1.jpg" />
        <div className="active" />
      </div>
      <div className="message-body">
        <h5>Jahnvi Doifode</h5>
        <p className="text-bold">3 New Messages</p>
      </div>
    </div>
  </div>
  )
}

export default Message