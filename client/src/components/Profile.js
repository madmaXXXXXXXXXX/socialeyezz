import React, { useEffect, useRef, useState } from "react";
import { FcLike } from "react-icons/fc";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { MdOutlineDelete } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Profile() {
  const [user, setuser] = useState([]);
  const [post, setpost] = useState([]);
  const [id, setid] = useState();
  const [Followers, setFollowers] = useState([]);
  const [Followings, setFollowings] = useState();
  const [Likes, setLikes] = useState([]);

  // setFollowers(user.following.length)

  const [modalPost, setmodalPost] = useState();

  const ref = useRef();

  const showImage = (current) => {
    ref.current.click();
    // console.log(current);
    setmodalPost(current.post);
    setid(current._id);
    setLikes(current.likes.length);
  };

  // console.log(Likes.length);

  //cureent logged user
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
    setFollowers(res.user.followers);

    // console.log("users", freinds);
  };

  const delPost = async () => {
    console.log(id);

    const response = await fetch(
      "http://localhost:5000/api/v1/users/deletepost",
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
    console.log(res);
  };

  //temprory api -> jave to work in madel
  //curret user post

  const userPost = async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/users/userpost",
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
    setpost(res.post);

    // console.log("users", freinds);
  };

  useEffect(() => {
    loggedUser();
  }, []);

  // console.log(user)

  useEffect(() => {
    userPost();
  }, []);

  const Like = async () => {
    // console.log(likeid)
    // console.log(id);

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
    console.log(res);
  };

  // setFollowers(user.followers)
  console.log(Followers);

  // console.log(user.followers)
  // console.log(user.following.length);
  return (
    <>
      {/*  */}
      <>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          show images
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg rounded">
            <div className="modal-content">
              <div className="modal-body">
                <img src={modalPost} height={40} width={50} />
                <div className="d-flex justify-between">
                  <div>
                    <FcLike
                      size={40}
                      onClick={() => Like()}
                      style={{ cursor: "pointer" }}
                    />
                    {Likes} Likes
                  </div>
                  <MdOutlineDelete
                    size={40}
                    onClick={() => delPost()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex w-full mb-20 flex-wrap">
            <div class="">
              <img
                src={user.avatar}
                alt="profile image"
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: 100,
                  objectFit: "contain",
                }}
              />
            </div>
            {/* <h1 className="sm:text-2xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
              My Profile
            </h1> */}
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
              <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-200 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
                <div className="rounded-[10px] bg-white p-4 !pt-10 sm:p-2">
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div> 0 </div>
                    <div> 0 </div>
                  </div>

                  <div
                    className="follower"
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div> FOLLOWERS </div>
                    <div> FOLLOWING </div>
                  </div>
                </div>
              </article>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:grid-cols-3">
            {post.map((obj) => {
              return (
                <div
                  className="container border border-black-100"
                  onClick={() => showImage(obj)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="object-cover object-center w-full h-60 max-w-full rounded-lg 	position: relative"
                    src={obj.post}
                    alt="gallery-photo"
                  />
                </div>
              );
            })}

            {/* dummy data from here */}
            {/* <div>
              <img
                className="object-cover object-center w-full h-60 max-w-full rounded-lg"
                src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="gallery-photo"
              />
            </div>
            <div>
              <img
                className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                alt="gallery-photo"
              />
            </div>
            <div>
              <img
                className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="gallery-photo"
              />
            </div>
            <div>
              <img
                className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="gallery-photo"
              />
            </div>
            <div>
              <img
                className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                alt="gallery-photo"
              />
            </div>
            <div>
              <img
                className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                src="https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg"
                alt="gallery-photo"
              />
            </div>
            <div>
              <img
                className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                src="https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg"
                alt="gallery-photo"
              />
            </div>
            <div>
              <img
                className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                src="https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80"
                alt="gallery-photo"
              />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
