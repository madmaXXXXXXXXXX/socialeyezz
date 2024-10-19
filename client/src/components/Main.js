import React from "react";
import SideBar from "./SideBar";
import "../App.css";
import Post from "./Post";
import RightBar from "./RightBar";
import Navbar from "./Navbar";

function Main() {
  return (
    <main>
      <div className="container">
        <SideBar />
        <Post />
        <RightBar />
      </div>
    </main>
  );
}

export default Main;
