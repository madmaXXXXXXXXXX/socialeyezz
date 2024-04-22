import React from "react";
import Pimg1 from'../images/profile-17.jpg'
import { FaRegMessage } from "react-icons/fa6";

function Freinds() {
  return (
    <div className="friend-requests">
      <h4>Requests</h4>
      <div className="request">
        <div className="info">
          <div className="profile-pic">
            <img src={Pimg1} />
          </div>
          <div>
            <h5>Wilson Fisk</h5>
            <p className="text-muted">8 mutual friends</p>
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
      </div>
    </div>
  );
}

export default Freinds;
