import React, { useEffect, useRef, useState } from "react";
import f1 from "../images/profile-14.jpg";
import f2 from "../images/feed-2.jpg";
import { FcLike } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FcDislike } from "react-icons/fc";
import { GoBookmarkSlash } from "react-icons/go";
import moment from "moment";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Feeds() {
  const ref = useRef();
  const [post, setpost] = useState([]);
  const [user, setuser] = useState({});

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

    console.log("users", user);
  };

  useEffect(() => {
    loggedUser();
  }, []);

  //Like post

  const Like = async (id) => {
    console.log(id);

    const response = await fetch("http://localhost:5000/api/v1/users/like", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ id }), // body data type must match "Content-Type" header
    });
    let res = await response.json(); // parses JSON response into native JavaScript objects
    // console.log(res);
  };

  const save = async (id) => {
    console.log(id);

    const response = await fetch(
      "http://localhost:5000/api/v1/users/savedpost",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ id }), // body data type must match "Content-Type" header
      }
    );
    let res = await response.json(); // parses JSON response into native JavaScript objects
    // console.log(res);
  };

  const userPost = async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/users/feedPost",
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
    // console.log("this is res", res);
    setpost(res.allFollowings);
  };

  const open = async (current) => {
    ref.current.click();
  };

  console.log(post);

  useEffect(() => {
    userPost();
  }); //remove [] -> after removing consoles

  return (
    <div className="feeds">
      {post.map((obj) => {
        return (
          <div className="feed" id="feed" key={obj._id}>
            <div className="head"></div>
            <div className="user d-flex space-around">
              <div className="profile-pic">
                <img src={obj.avatar || f1} alt="profile image" />
              </div>

              <div className="info">
                <h3>{obj.username}</h3>
                <small>{obj.createdAt.substring(0, 10)}</small>
              </div>
              <span className="edit"></span>
            </div>
            <div className="photo ">
              <img src={obj.post} alt="image" />
            </div>
            <div className="action-button d-flex justify-around">
              <div className="interaction-button">
                {obj.likes.includes(user._id) ? (
                  <span>
                    <FcDislike
                      size={40}
                      onClick={() => Like(obj._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                ) : (
                  <span>
                    <FcLike
                      size={40}
                      onClick={() => Like(obj._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                )}
                {/* coments icon */}
                {/* <span>
                  <MdOutlineInsertComment size={40} />
                </span> */}
                <span>
                  <i className="uil uil-share" />
                </span>
              </div>
              <div className="bookmark">
                {user.savedPost.includes(obj._id) ? (
                  <GoBookmarkSlash
                    size={40}
                    onClick={() => save(obj._id)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <span>
                    <CiBookmark
                      size={40}
                      onClick={() => save(obj._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                )}
              </div>
            </div>
            <div className="liked-by">
              <p>
                Liked by <b>{obj.likes.length}</b>
              </p>
            </div>
            <div className="caption">
              <p>
                <b>{obj.title}</b> {obj.description}
                {/* <span className="hash-tag">#lifestyle</span> */}
              </p>
            </div>
            <div className="comments text-muted">View all 130 comments</div>
          </div>
        );
      })}
    </div>
  );
}

export default Feeds;
