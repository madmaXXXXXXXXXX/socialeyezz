import React, { useEffect, useState } from "react";
import Pimg1 from "../images/profile-17.jpg";
import { FaRegMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Message() {
  const [user, setuser] = useState([]);

  const freinds = async () => {
    const response = await fetch("http://localhost:5000/api/v1/users/freinds", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
        // "Content-Type": "multipart/form-data;",
      },
    });
    let res = await response.json(); // parses JSON response into native JavaScript objects
    console.log("this is res", res);
    setuser(res.allFollowings);
  };

  useEffect(() => {
    freinds();
  }, []);

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
        <input
          type="search"
          placeholder="Search Messages"
          id="message-search"
        />
      </div>

      {user.slice(0, 3).map((obj) => {
        return (
          <Link to={"/chats"}>
            <div className="message">
              <div className="profile-pic">
                <img src={obj.avatar} />
                <div className="active" />
              </div>
              <div className="message-body">
                <h5>{obj.username}</h5>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Message;
