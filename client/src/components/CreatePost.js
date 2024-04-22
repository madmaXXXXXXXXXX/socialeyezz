import React from "react";
import "../App.css";
import Pimg from'../images/profile-8.jpg'

function CreatePost() {
  return (
    <div>
      <form className="create-post">
        <div className="profile-pic">
          <img src={Pimg} alt="" />
        </div>
        <input
          type="text"
          placeholder="What's on your mind Chirag?"
          id="create-post"
        />
        <button style={{background:"black",height:50,width:150,borderRadius:20,color:"white",fontWeight:"bold",}}>Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
