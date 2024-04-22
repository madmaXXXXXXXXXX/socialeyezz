import React from 'react'
import s1 from'../images/profile-2.jpg'
import f2 from'../images/profile-8.jpg'

function Stories() {
  return (
    <div className="stories">
        <div className="story">
          <div className="profile-pic">
            <img src={f2} alt="" />
          </div>
          <p className="name">Your Story</p>
        </div>
        <div className="story">
          <div className="profile-pic">
            <img src="./images/profile-9.jpg" alt="" />
          </div>
          <p className="name">Lilla James</p>
        </div>
        <div className="story">
          <div className="profile-pic">
            <img src={s1} alt="" />
          </div>
          <p className="name">Jasmine Singh</p>
        </div>
        <div className="story">
          <div className="profile-pic">
            <img src="./images/profile-3.jpg" alt="" />
          </div>
          <p className="name">Celina Fernandes</p>
        </div>
        <div className="story">
          <div className="profile-pic">
            <img src="./images/profile-4.jpg" alt="" />
          </div>
          <p className="name">Mia Addams</p>
        </div>
        <div className="story">
          <div className="profile-pic">
            <img src="./images/profile-5.jpg" alt="" />
          </div>
          <p className="name">Christy Kahea</p>
        </div>
      </div>
  )
}

export default Stories