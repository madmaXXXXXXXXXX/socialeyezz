import React, { useRef, useState } from "react";
import "../App.css";
import Pimg from "../images/profile-8.jpg";

function CreatePost() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [Post, setPost] = useState("");

  const ref = useRef();

  const addPost = async (current) => {
    ref.current.click();
  };

  const createPost = async (e) => {
    e.preventDefault();

    console.log(description);
  };

  return (
    <div>
      <div className="create-post">
        <div className="profile-pic">
          <img src={Pimg} alt="" />
        </div>
        <input
          type="text"
          placeholder="What's on your mind Chirag?"
          id="create-post"
        />
        <button
          style={{
            background: "black",
            height: 50,
            width: 150,
            borderRadius: 20,
            color: "white",
            fontWeight: "bold",
          }}
          onClick={() => addPost()}
        >
          Post
        </button>
      </div>
      <>
        {/* Button trigger modal */}
        <button
          ref={ref}
          type="button"
          className="btn btn-primary h-100 w-50 d-none "
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          ADD POST
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Create Post
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form
                    className="space-y-6"
                    encType="multipart/form-data"
                    onSubmit={createPost}
                  >
                    <div class="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-50 border-2 border-gray-300  rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          {/* <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p> 
                             <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          onChange={(e) => setPost(e.target.files[0])}
                          class="hidden"
                          placeholder="avatar"
                        />
                      </label>
                    </div>

                    <div>
                      <label
                        htmlFor="text"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Title
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="text"
                          autoComplete="email"
                          onChange={(e) => settitle(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="text"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Description
                        </label>
                      </div>
                      <div className="mt-2">
                        <textarea
                          class="resize-y rounded-md block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => setdescription(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* <div>
                      <button
                        // onClick={() => createPost()}
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button>
                    </div> */}
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        create Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default CreatePost;
