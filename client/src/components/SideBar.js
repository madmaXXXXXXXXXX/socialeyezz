import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pimg from "../images/profile-8.jpg";
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegMessage } from "react-icons/fa6";
import { CiBookmarkCheck } from "react-icons/ci";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { VscSymbolColor } from "react-icons/vsc";

function SideBar() {
  const [user, setuser] = useState([]);

  const loggedUser = async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/users/loggedUser",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
          // "Content-Type": "multipart/form-data;",
        },
      }
    );
    let res = await response.json(); // parses JSON response into native JavaScript objects
    // console.log(res);
    setuser(res.user);

    // console.log("users", freinds);
  };

  useEffect(() => {
    loggedUser();
  }, []);

  return (
    <div>
      <div className="left">
        {/* <div className="profile ">
          {/* <Link to={"/myprofile"}>
            <div class="profile-pic">
              <img src={user.avatar} />
            </div>
          </Link> */}
        <div className="handle mt-2 ml-7">
          {/* <h4>{user.username}</h4> */}
          {/* <p class="text-muted">@{user.username}</p> */}
        </div>
        {/* </div> */}

        <div className="sidebar">
          <a className="menu-item active">
            <span>
              <FaHome />
            </span>{" "}
            <h3>Home</h3>
          </a>
          <Link to={"/myprofile"} className="menu-item ">
            <span>
              <MdOutlineExplore />
            </span>{" "}
            <h3>MyProfile</h3>
          </Link>
          {/* <a className="menu-item" id="notifications">
            <span>
              <IoIosNotificationsOutline />
            </span>{" "}
            <h3>Notification</h3>
          </a> */}
          <Link
            to={"/community"}
            className="menu-item"
            id="messages-notifications"
          >
            <FaRegMessage />
            <h3>Community</h3>
          </Link>
          <Link to={"/savedpost"} className="menu-item ">
            <span>
              <CiBookmarkCheck />
            </span>{" "}
            <h3>Saved</h3>
          </Link>
          <Link to={"/chats"} className="menu-item ">
            <span>
              <TbBrandGoogleAnalytics />
            </span>{" "}
            <h3>Messages</h3>
          </Link>
          {/* <a className="menu-item ">
            <span>
              <VscSymbolColor />
            </span>{" "}
            <h3>Theme</h3>
          </a> */}
          <Link to={"/"} className="menu-item ">
            <span>
              <CiSettings />
            </span>{" "}
            <h3>Logout</h3>
          </Link>
          <label className="btn btn-primary" htmlFor="create-post">
            Create Post
          </label>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
