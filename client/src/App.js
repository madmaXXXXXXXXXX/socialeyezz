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

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/myprofile" element={<Profile />} />
          <Route path="/emailverify" element={<Emailverify />} />
        </Routes>
      </BrowserRouter>
      {/* <Main /> */}
    </>
  );
}

export default App;
