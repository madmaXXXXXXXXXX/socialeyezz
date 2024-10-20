import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";

function Emailverify() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [resp, setresp] = useState({});

  const emailverify = async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/users/verifyemail",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
          // "Content-Type": "multipart/form-data;",
        },
        body: JSON.stringify({ email }),
      }
    );
    let res = await response.json(); // parses JSON response into native JavaScript objects
    setresp(res);
    // console.log(resp.success)

    if (res.success === false) {
      navigate("/register");
    } else {
      document.getElementById("msg").innerHTML = resp.message;

      navigate("/");
    }

    console.log(res.success);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Email
        </h2>
        <p></p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setemail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p style={{ color: "red", fontSize: "small" }} id="msg"></p>
          </div>

          <div>
            <button
              onClick={() => emailverify()}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
           
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
           
          </a>
        </p>
      </div>
    </div>
  );
}

export default Emailverify;
