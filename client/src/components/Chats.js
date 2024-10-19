import React, { useEffect, useRef, useState } from "react";
import "../App.css";

function ChatList(prop) {
  const [showmessages, setshowmessages] = useState([]);
  const [message, setmessage] = useState();
  const [incommingmsg, setincommingmsg] = useState("");
  const [outgoingmsg, setoutgoingmsg] = useState("");

  const [user, setuser] = useState([]);

  // console.log(showmessages)

  //   console.log(prop);
  const { id } = prop;
  //   console.log(id);

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

  const getMessage = async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/users/fetchmessage",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
          // "Content-Type": "multipart/form-data;",
        },
        body: JSON.stringify({ id }),
      }
    );
    let res = await response.json(); // parses JSON response into native JavaScript objects
    console.log("this is res", res);
    setshowmessages(res.msg);
    console.log(showmessages);
  };

  // if(showmessages.sender ===user._id){
  //   setoutgoingmsg(showmessages.msg)
  // }

  const sendMessage = async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/users/sendmessage",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
          // "Content-Type": "multipart/form-data;",
        },
        body: JSON.stringify({ id, message }),
      }
    );
    let res = await response.json(); // parses JSON response into native JavaScript objects
    console.log("this is res", res);

    document.getElementById("message").value = "";
  };

  useEffect(() => {
    getMessage();
  });

  useEffect(() => {
    loggedUser();
  }, []);

  return (
    <div className="flex-1  container">
      {/* Chat Header */}
      <header className="bg-white p-4 text-gray-700 ">
        <h1 className="text-2xl font-semibold">Alice</h1>
      </header>
      {/* Chat Messages */}
      <div className="h-screen overflow-y-auto p-6 pb-36 container">
        {showmessages.map((obj) => {
          return (
            <>
              {/* outgojnf*/}

              {obj.sender == user._id ? (
                <div
                  className="flex justify-end mb-4 cursor-pointer container"
                  // id={id == obj.reciever ? "other" : "you"}
                >
                  <div className="flex max-w-96 bg-black text-white rounded-lg p-3 gap-3">
                    {obj.length == 0 ? (
                      <p>start chatting</p>
                    ) : (
                      <p>{obj.message}</p>
                    )}
                  </div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                    <img
                      src={user.avatar}
                      alt="My Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex mb-4 cursor-pointer">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                    <img
                      src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                    <p className="text-gray-700">{obj.message}</p>
                  </div>
                </div>
              )}

              {/* <div
                className="flex justify-end mb-4 cursor-pointer container"
                // id={id == obj.reciever ? "other" : "you"}
              >
                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                  <p>{obj.message}</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                  <img
                    src={user.avatar}
                    alt="My Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              </div> */}

              {/* incoming
               */}
              {/* <div className="flex mb-4 cursor-pointer">
                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                  <img
                    src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                  <p className="text-gray-700">{obj.message}</p>
                </div>
              </div> */}

              {/* outgoing */}
            </>
          );
        })}
        {/* Incoming Message */}
        {/* <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">
              That book sounds interesting! What's it about?
            </p>
          </div>
        </div> */}
        {/* Outgoing Message */}
        {/* <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>
              It's about an astronaut stranded on Mars, trying to survive.
              Gripping stuff!
            </p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div> */}
      </div>
      {/* Chat Input */}
      <div className="">
        <footer className="bg-white border-t border-gray-300 p-2 absolute bottom-0 w-2/4">
          <div className="flex items-center">
            <input
              id="message"
              type="text"
              placeholder="Type a message..."
              className="w-full p-1 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              onChange={(e) => setmessage(e.target.value)}
            />
            <button
              className="bg-black text-white px-4 py-2 rounded-md ml-2"
              onClick={() => sendMessage()}
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Chats() {
  const [id, setid] = useState();
  const [user, setuser] = useState([]);
  const [show, setShow] = useState(true);

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

  const ref = useRef();

  const openChat = async (obj) => {
    setid(obj._id);
    console.log(obj._id);
  };

  return (
    <div>
      <div className="flex h-screen overflow-hidden  ">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r border-gray-300">
          {/* Sidebar Header */}
          <header className="p-2 border-b border-black-300 flex justify-between items-center bg-black text-white">
            <h1 className="text-2xl font-semibold ">Chats</h1>
            <div className="relative">
              <button id="menuButton" className="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
              </button>
              {/* Menu Dropdown */}
              <div
                id="menuDropdown"
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
              >
                <ul className="py-2 px-3">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                    >
                      Option 1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                    >
                      Option 2
                    </a>
                  </li>
                  {/* Add more menu options here */}
                </ul>
              </div>
            </div>
          </header>
          {/* Contact List */}
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            {user.map((obj) => {
              return (
                <div
                  className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                  key={obj._id}
                  onClick={() => openChat(obj)}
                >
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img
                      src={obj.avatar}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{obj.username}</h2>
                    {/* <p className="text-gray-600">Hoorayy!!</p> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Main Chat Area */}
        <div className="container">{show ? <ChatList id={id} /> : null}</div>
      </div>
    </div>
  );
}

export default Chats;
