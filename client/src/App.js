import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import RegisterDetails from "./components/RegisterDetails";
import Emailverify from "./components/Emailverify";
import Community from "./components/Community";
import SideBar from "./components/SideBar";
import ShowNavbar from "./components/ShowNavbar";
import Savedpost from "./components/Savedpost";
import Chats from "./components/Chats";

function App() {
  
  return (
    <>
      <BrowserRouter>
        {/* navbar with hiding feature */}
        <ShowNavbar>
          <Navbar />
        </ShowNavbar>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/myprofile" element={<Profile />} />
          <Route path="/emailverify" element={<Emailverify />} />
          <Route path="/community" element={<Community />} />
          <Route path="/savedpost" element={<Savedpost />} />
          <Route path="/chats" element={<Chats />} />

        </Routes>
      </BrowserRouter>
      {/* <Main /> */}
    </>
  );
}

export default App;
