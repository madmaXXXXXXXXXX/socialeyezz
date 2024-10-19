import React, { useEffect, useState } from "react";
import Pimg1 from "../images/profile-17.jpg";
import { FaRegMessage } from "react-icons/fa6";

function Freinds() {
  const [freinds, setfreinds] = useState([]);
  const [id, setid] = useState();
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

    // console.log("users", user);
  };

  useEffect(() => {
    loggedUser();
  });

  const alluser = async () => {
    const response = await fetch("http://localhost:5000/api/v1/users/alluser", {
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
    // console.log(res);
    setfreinds(res.user);
    // console.log("users", freinds);
  };

  const follow = async (id) => {
    console.log(id);
    setid(id);
    const response = await fetch("http://localhost:5000/api/v1/users/follow", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
        // "Content-Type": "multipart/form-data;",
      },

      body: JSON.stringify({ id }), // body data type must match "Content-Type" header
    });
    let res = await response.json(); // parses JSON response into native JavaScript objects
    console.log(res);
    // setfreinds(res.user);
    // console.log("users", freinds);
  };

  const unfollow = async (id) => {
    console.log(id);
    setid(id);
    const response = await fetch(
      "http://localhost:5000/api/v1/users/unfollow",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
          // "Content-Type": "multipart/form-data;",
        },

        body: JSON.stringify({ id }), // body data type must match "Content-Type" header
      }
    );
    let res = await response.json(); // parses JSON response into native JavaScript objects
    console.log(res);
    // setfreinds(res.user);
    // console.log("users", freinds);
  };
  useEffect(() => {
    alluser();
  },[]);

  return (
    <div className="friend-requests">
      <h4>Recomendations</h4>
      {freinds.map((obj) => {
        return (
          <>
            <div className="request" key={obj._id}>
              <div className="info">
                <div className="profile-pic">
                  <img src={obj.avatar} />
                </div>
                <div>
                  <h5>{obj.username}</h5>
                  <p className="text-muted">8 mutual friends</p>
                </div>
              </div>
              <div className="action">
                {user.following.includes(obj._id) ? (
                  <button className="btn" onClick={() => unfollow(obj._id)}>
                    unfollow
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => follow(obj._id)}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </>
        );
      })}
      {/* <div className="request">
        <div className="info">
          <div className="profile-pic">
            <img src={Pimg1} />
          </div>
          <div>
            <h5>Srishti Tirkey</h5>
            <p className="text-muted">2 mutual friends</p>
          </div>
        </div>
        <div className="action">
          <button className="btn btn-primary">Accept</button>
          <button className="btn">Decline</button>
        </div>
      </div>
      <div className="request">
        <div className="info">
          <div className="profile-pic">
            <img src="images/profile-5.jpg" />
          </div>
          <div>
            <h5>Christ Kahea</h5>
            <p className="text-muted">1 mutual friend</p>
          </div>
        </div>
        <div className="action">
          <button className="btn btn-primary">Accept</button>
          <button className="btn">Decline</button>
        </div>
      </div> */}
    </div>
  );
}

export default Freinds;
