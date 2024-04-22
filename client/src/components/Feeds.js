import React from "react";
import f1 from'../images/profile-14.jpg'
import f2 from'../images/feed-2.jpg'
import { FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";

function Feeds() {
  return (
    <div className="feeds">
      <div className="feed">
        <div className="head"></div>
        <div className="user">
          <div className="profile-pic">
            <img src={f1} alt="profile image" />
          </div>
          <div className="info">
            <h3>Lana Rose</h3>
            <small>Dubai, 15 MINUTES AGO</small>
          </div>
          <span className="edit">
            <i className="uil uil-ellipsis-h" />
          </span>
        </div>
        <div className="photo">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzk92qOx7c5k5fybjVbUkwg6BGW_ptjgID9A&s" alt="image" />
        </div>
        <div className="action-button">
          <div className="interaction-button">
            <span>
             <FcLikePlaceholder />
            </span>
            <span>
             <MdOutlineInsertComment/>
            </span>
            <span>
              <i className="uil uil-share" />
            </span>
          </div>
          <div className="bookmark">
            <span>
              <i className="uil uil-bookmark" />
            </span>
          </div>
        </div>
        <div className="liked-by">
          <span>
            <img src="./images/profile-15.jpg" />
          </span>
          <span>
            <img src="images/profile-16.jpg" />
          </span>
          <span>
            <img src="images/profile-17.jpg" />
          </span>
          ,
          <p>
            Liked by <b>Enrest Achiever</b>snd <b>220 others</b>
          </p>
        </div>
        <div className="caption">
          <p>
            <b>Lana Rose</b>Lorem ipsum dolor storiesquiquam eius.
            <span className="hash-tag">#lifestyle</span>
          </p>
        </div>
        <div className="comments text-muted">View all 130 comments</div>
      </div>
      <div className="feed">
        <div className="head"></div>
        <div className="user">
          <div className="profile-pic">
            <img src={f1} alt="" />
          </div>
          <div className="info">
            <h3>Chris Brown</h3>
            <small>New York, 1 HOUR AGO</small>
          </div>
          <span className="edit">
            <i className="uil uil-ellipsis-h" />
          </span>
        </div>
        <div className="photo">
          <img src={f2} alt="" />
        </div>
        <div className="action-button">
          <div className="interaction-button">
            <span>
              <i className="uil uil-thumbs-up" />
            </span>
            <span>
              <i className="uil uil-comment" />
            </span>
            <span>
              <i className="uil uil-share" />
            </span>
          </div>
          <div className="bookmark">
            <span>
              <i className="uil uil-bookmark" />
            </span>
          </div>
        </div>
        <div className="liked-by">
          <span>
            <img src="images/profile-2.jpg" />
          </span>
          <span>
            <img src="images/profile-4.jpg" />
          </span>
          <span>
            <img src="images/profile-6.jpg" />
          </span>
          ,
          <p>
            Liked by <b>Enrest Achiever</b>snd <b>188 others</b>
          </p>
        </div>
        <div className="caption">
          <p>
            <b>Chirs Brown</b>Lorem ipsum dolor storiesquiquam eius.
            <span className="hash-tag">#lifestyle</span>
          </p>
        </div>
        <div className="comments text-muted">View all 40 comments</div>
      </div>
      <div className="feed">
        <div className="head"></div>
        <div className="user">
          <div className="profile-pic">
            <img src={f1} alt="" />
          </div>
          <div className="info">
            <h3>John Samron</h3>
            <small>Amsterdam, 7 HOURS AGO</small>
          </div>
          <span className="edit">
            <i className="uil uil-ellipsis-h" />
          </span>
        </div>
        <div className="photo">
          <img src={f2} alt="" />
        </div>
        <div className="action-button">
          <div className="interaction-button">
            <span>
              <i className="uil uil-thumbs-up" />
            </span>
            <span>
              <i className="uil uil-comment" />
            </span>
            <span>
              <i className="uil uil-share" />
            </span>
          </div>
          <div className="bookmark">
            <span>
              <i className="uil uil-bookmark" />
            </span>
          </div>
        </div>
        <div className="liked-by">
          <span>
            <img src="images/profile-3.jpg" />
          </span>
          <span>
            <img src="images/profile-5.jpg" />
          </span>
          <span>
            <img src="images/profile-7.jpg" />
          </span>
          ,
          <p>
            Liked by <b>Enrest Achiever</b>snd <b>130 others</b>
          </p>
        </div>
        <div className="caption">
          <p>
            <b>John Samron</b>Lorem ipsum dolor storiesquiquam eius.
            <span className="hash-tag">#lifestyle</span>
          </p>
        </div>
        <div className="comments text-muted">View all 15 comments</div>
      </div>
      <div className="feed">
        <div className="head"></div>
        <div className="user">
          <div className="profile-pic">
            <img src={f1} alt="" />
          </div>
          <div className="info">
            <h3>Kareena Joshua</h3>
            <small>USA, 3 HOURS AGO</small>
          </div>
          <span className="edit">
            <i className="uil uil-ellipsis-h" />
          </span>
        </div>
        <div className="photo">
          <img src={f2} alt="" />
        </div>
        <div className="action-button">
          <div className="interaction-button">
            <span>
              <i className="uil uil-thumbs-up" />
            </span>
            <span>
              <i className="uil uil-comment" />
            </span>
            <span>
              <i className="uil uil-share" />
            </span>
          </div>
          <div className="bookmark">
            <span>
              <i className="uil uil-bookmark" />
            </span>
          </div>
        </div>
        <div className="liked-by">
          <span>
            <img src="images/profile-8.jpg" />
          </span>
          <span>
            <img src="images/profile-10.jpg" />
          </span>
          <span>
            <img src="images/profile-12.jpg" />
          </span>
          ,
          <p>
            Liked by <b>Enrest Achiever</b>snd <b>280 others</b>
          </p>
        </div>
        <div className="caption">
          <p>
            <b>Kareena Joshua</b>Lorem ipsum dolor storiesquiquam eius.
            <span className="hash-tag">#lifestyle</span>
          </p>
        </div>
        <div className="comments text-muted">View all 110 comments</div>
      </div>
      <div className="feed">
        <div className="head"></div>
        <div className="user">
          <div className="profile-pic">
            <img src={f1} alt="" />
          </div>
          <div className="info">
            <h3>Dan Smith</h3>
            <small>Paris, 1 DAY AGO</small>
          </div>
          <span className="edit">
            <i className="uil uil-ellipsis-h" />
          </span>
        </div>
        <div className="photo">
          <img src={f2} alt="" />
        </div>
        <div className="action-button">
          <div className="interaction-button">
            <span>
              <i className="uil uil-thumbs-up" />
            </span>
            <span>
              <i className="uil uil-comment" />
            </span>
            <span>
              <i className="uil uil-share" />
            </span>
          </div>
          <div className="bookmark">
            <span>
              <i className="uil uil-bookmark" />
            </span>
          </div>
        </div>
        <div className="liked-by">
          <span>
            <img src="images/profile-9.jpg" />
          </span>
          <span>
            <img src="images/profile-11.jpg" />
          </span>
          <span>
            <img src="images/profile-13.jpg" />
          </span>
          ,
          <p>
            Liked by <b>Enrest Achiever</b>snd <b>420 others</b>
          </p>
        </div>
        <div className="caption">
          <p>
            <b>Dan Smith</b>Lorem ipsum dolor storiesquiquam eius.
            <span className="hash-tag">#lifestyle</span>
          </p>
        </div>
        <div className="comments text-muted">View all 120 comments</div>
      </div>
      <div className="feed">
        <div className="head"></div>
        <div className="user">
          <div className="profile-pic">
            <img src={f1} alt="" />
          </div>
          <div className="info">
            <h3>Karim Benzema</h3>
            <small>Mumbai, 30 MINUTES AGO</small>
          </div>
          <span className="edit">
            <i className="uil uil-ellipsis-h" />
          </span>
        </div>
        <div className="photo">
          <img src={f2} alt="" />
        </div>
        <div className="action-button">
          <div className="interaction-button">
            <span>
              <i className="uil uil-thumbs-up" />
            </span>
            <span>
              <i className="uil uil-comment" />
            </span>
            <span>
              <i className="uil uil-share" />
            </span>
          </div>
          <div className="bookmark">
            <span>
              <i className="uil uil-bookmark" />
            </span>
          </div>
        </div>
        <div className="liked-by">
          <span>
            <img src="images/profile-15.jpg" />
          </span>
          <span>
            <img src="images/profile-14.jpg" />
          </span>
          <span>
            <img src="images/profile-17.jpg" />
          </span>
          ,
          <p>
            Liked by <b>Enrest Achiever</b>snd <b>150 others</b>
          </p>
        </div>
        <div className="caption">
          <p>
            <b>Karim Benzema</b>Lorem ipsum dolor storiesquiquam eius.
            <span className="hash-tag">#lifestyle</span>
          </p>
        </div>
        <div className="comments text-muted">View all 30 comments</div>
      </div>
      <div className="feed">
        <div className="head"></div>
        <div className="user">
          <div className="profile-pic">
            <img src="images/profile-20.jpg" alt="" />
          </div>
          <div className="info">
            <h3>Srishti Tirkey</h3>
            <small>Bangalore, 11 HOURS AGO</small>
          </div>
          <span className="edit">
            <i className="uil uil-ellipsis-h" />
          </span>
        </div>
        <div className="photo">
          <img src="images/feed-7.jpg" alt="" />
        </div>
        <div className="action-button">
          <div className="interaction-button">
            <span>
              <i className="uil uil-thumbs-up" />
            </span>
            <span>
              <i className="uil uil-comment" />
            </span>
            <span>
              <i className="uil uil-share" />
            </span>
          </div>
          <div className="bookmark">
            <span>
              <i className="uil uil-bookmark" />
            </span>
          </div>
        </div>
        <div className="liked-by">
          <span>
            <img src="" alt="image"/>
          </span>
          <span>
            <img src="images/profile-13.jpg" />
          </span>
          <span>
            <img src="images/profile-10.jpg" />
          </span>
          ,
          <p>
            Liked by <b>Enrest Achiever</b>snd <b>530 others</b>
          </p>
        </div>
        <div className="caption">
          <p>
            <b>Srishti Tirkey</b>Lorem ipsum dolor storiesquiquam eius.
            <span className="hash-tag">#lifestyle</span>
          </p>
        </div>
        <div className="comments text-muted">View all 190 comments</div>
      </div>
    </div>
  );
}

export default Feeds;
