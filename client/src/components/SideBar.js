import React from "react";
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
  return (
    <div>
      <div className="left">
        <div class="profile">
          <Link to={'/myprofile'}>
            <div class="profile-pic">
              <img src={Pimg} />
            </div>
          </Link>
          <div class="handle">
            <h4>Chirag</h4>
            <p class="text-muted">@chirag</p>
          </div>
        </div>

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
            <h3>Explore</h3>
          </Link>
          <a className="menu-item" id="notifications">
            <span>
              <IoIosNotificationsOutline />
            </span>{" "}
            <h3>Notifications</h3>
            <div className="notifications-popup">
              <div>
                <div className="profile-pic">
                  <img src="./images/profile-10.jpg" />
                </div>
                <div className="notification-body">
                  <b>Abigail Willey</b> accepted your friend request
                  <small className="text-muted">2 DAYS AGO</small>
                </div>
              </div>
              <div>
                <div className="profile-pic">
                  <img src="./images/profile-11.jpg" />
                </div>
                <div className="notification-body">
                  <b>Varun Nair</b> commented on your post
                  <small className="text-muted">1 HOUR AGO</small>
                </div>
              </div>
              <div>
                <div className="profile-pic">
                  <img src="./images/profile-12.jpg" />
                </div>
                <div className="notification-body">
                  <b>Marry Opmong</b> and 210 other liked your post
                  <small className="text-muted">4 MINUTES AGO</small>
                </div>
              </div>
              <div>
                <div className="profile-pic">
                  <img src="./images/profile-13.jpg" />
                </div>
                <div className="notification-body">
                  <b>Wilson Fisk</b> started following you
                  <small className="text-muted"> 11 HOURS AGO</small>
                </div>
              </div>
            </div>
          </a>
          <a className="menu-item" id="messages-notifications">
            <FaRegMessage />
            <h3>Messages</h3>
          </a>
          <a className="menu-item ">
            <span>
              <CiBookmarkCheck />
            </span>{" "}
            <h3>Bookmarks</h3>
          </a>
          <a className="menu-item ">
            <span>
              <TbBrandGoogleAnalytics />
            </span>{" "}
            <h3>Analytics</h3>
          </a>
          <a className="menu-item ">
            <span>
              <VscSymbolColor />
            </span>{" "}
            <h3>Theme</h3>
          </a>
          <a className="menu-item ">
            <span>
              <CiSettings />
            </span>{" "}
            <h3>Settings</h3>
          </a>
          <label className="btn btn-primary" htmlFor="create-post">
            Create Post
          </label>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
