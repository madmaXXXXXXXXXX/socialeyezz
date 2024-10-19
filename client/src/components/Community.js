import React, { useEffect, useRef, useState } from "react";
import { FcLike } from "react-icons/fc";

function Community() {
  const [post, setpost] = useState([]);
  const [modalPost, setmodalPost] = useState();
  const [id, setid] = useState();
  const [Likes, setLikes] = useState([]);

  //temprory api -> jave to work in madel
  //curret user post

  const communityPosts = async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/users/community",
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
    setpost(res.post);
  };

  useEffect(() => {
    communityPosts();
    // Like();
  }, []);

  const ref = useRef();

  const showImage = (current) => {
    ref.current.click();
    console.log(current);
    setmodalPost(current.post);
    setid(current._id);
    setLikes(current.likes.length);
  };

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
  return (
    <div className="container" style={{ marginTop: 90 }}>
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
                <img src={modalPost} />
                <FcLike
                  size={40}
                  onClick={() => Like()}
                  style={{ cursor: "pointer" }}
                />
                {Likes} Likes
              </div>
            </div>
          </div>
        </div>
      </>
      <div style={{ fontSize: 50, marginLeft: 500, fontWeight: "bold" }}>
        Community
      </div>
      <div className="container">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:grid-cols-3">
          {post.map((obj) => {
            return (
              <div
                onClick={() => showImage(obj)}
                className="border border-black-100 container"
              >
                <img
                  className="object-cover object-center w-full h-60 max-w-full rounded-lg"
                  src={obj.post}
                  alt="gallery-photo"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Community;
