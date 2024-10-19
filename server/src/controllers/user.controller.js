import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.models.js";
import mongoose from "mongoose";
import { Message } from "../models/messages.model.js";

//generate access and refresh token->
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    //find user by id
    const user = await User.findById(userId);

    //store value of access anf refresh token in variable
    const accessToken = await user.generateAcceessToken();
    const refreshToken = await user.generateRefreshToken();
    console.log("function jwt", accessToken, refreshToken);
    // pitting value in variable from response from user

    user.refreshToken = refreshToken;

    //saving in database
    //validationBeforeSave -> saving without any validation . know what to do
    await user.save({ validateBeforeSave: false });

    //send as object
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong");
  }
};

// auth routes ->

const registerUser = async (req, res) => {
  const { fullname, username, password, email } = req.body;
  console.log("email", email);
  console.log(req.body);
  let avtar = req.files.avatar[0];
  console.log("avaatrt", avtar);

  if (
    [username, fullname, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all field required");
  }

  const exsistingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (exsistingUser) {
    throw new ApiError(409, "user with username or email allready exsist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(avatarLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");

    F;
  } else {
    console.log("images path", avatarLocalPath);
  }

  //   console.log("images path", avatarLocalPath);

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  console.log("avatr image", avatarLocalPath);

  const user = await User.create({
    fullname,
    avatar: avatar.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  console.log("password", password, "after validation", user.password);
  const createdUser = await User.findById(user._id).select(
    " -password -refreshtoken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "registered succesfully"));
};

const verifyEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  let user = await User.findOne({ email });

  if (user) {
    return res.json({ message: "email exsist", success: true, user });
  }
  return res.json({ message: "email dont exsist ", success: false });
};

//login user ->
const loginUser = async (req, res) => {
  //req body -> data
  //username or email
  //find the user
  //password check
  //access and refresh token
  //send through cookie

  const { email, username, password } = req.body;

  // console.log(email,username,password)
  console.log(req.body);
  if (!(email || username)) {
    //(!(email || username))
    throw new ApiError(400, "username or email required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "user does not exsist");
  }

  const isPasswordValid = await user.isPassowrdCorrect(password);

  if (!isPasswordValid) {
    // throw new ApiError(401, "invalid user credentials");
    return res.status(400).json({ message: "invalid cred" });
  }

  //function for generation of access  and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  console.log("raw", accessToken, refreshToken);
  //get user details by id and only show fields except password and refresh token
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // res.json(loggedInUser)

  //send cookies ->

  //option is an object . httpOnly allow user not to edit cookies from frontend .only edited at backend
  const options = {
    httpOnly: true,
    secure: true,
  };

  // const accessToken = await user.generateAcceessToken(loggedInUser._id)
  // console.log(accessToken)

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user logged in successfully"
      )
    );
};

//logout user ->

const logoutUser = async (req, res) => {
  console.log(req.user);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      refreshToken: null, //set value of updated field
    },
    {
      new: true, //show updated result in response
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out"));
};

//
const allUser = async (req, res) => {
  let currentUser = req.user._id;
  let user = await User.find({ _id: { $ne: currentUser } });
  // console.log(user);

  return res.json({ message: "alluser ", success: true, user });
};

//currentUser
const loggedUser = async (req, res) => {
  let user = req.user;
  return res.json({ message: "current user", user });
};

//Follow routes

const followUser = async (req, res) => {
  const { id } = req.body;
  const _id = req.user._id;
  console.log(id, _id);
  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await User.findById(id);
      const followingUser = await User.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

const unfollowUser = async (req, res) => {
  const { id } = req.body;
  const _id = req.user._id;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const unFollowUser = await User.findById(id);
      const unFollowingUser = await User.findById(_id);

      if (unFollowUser.followers.includes(_id)) {
        await unFollowUser.updateOne({ $pull: { followers: _id } });
        await unFollowingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("Unfollowed Successfully!");
      } else {
        res.status(403).json("You are not following this User");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

//friends

const freinds = async (req, res) => {
  const id = req.user._id;

  let followingsId = [];

  let user = await User.find(id).select({ following: 1, _id: 0 });

  console.log(user);

  user.map((obj) => {
    // console.log("followings are ", obj.following);
    followingsId = obj.following;
  });

  let allFollowings = await User.find({ _id: { $in: followingsId } });
  console.log("info are", allFollowings);

  // console.log("id of followigs are ", followingsId);

  return res.json({
    message: "freinds are ",
    allFollowings,
    success: true,
  });
};

//post routes

const createPost = async (req, res) => {
  const { title, description } = req.body;

  console.log(req.body);
  let posted = req.files.post[0];
  console.log("post", posted);
  let createdBy = req.user._id;
  let avatar = req.user.avatar;
  let username = req.user.username;
  console.log(createdBy);

  const postLocalPath = req.files?.post[0]?.path;
  console.log(postLocalPath);

  if (!postLocalPath) {
    throw new ApiError(400, "post is required");
  } else {
    console.log("images path", postLocalPath);
  }

  //   console.log("images path", avatarLocalPath);

  const post = await uploadOnCloudinary(postLocalPath);
  console.log("avatr image", post);

  const user = await Post.create({
    title,
    post: post.url || "",
    description,
    owner: createdBy,
    avatar: avatar,
    username: username,
  });

  return res.status(201).json(new ApiResponse(200, "posted succesfully", user));
};

//get user specific post

const userPost = async (req, res) => {
  const id = req.user._id;
  // console.log(id);
  let post = await Post.find({ owner: id });

  return res.json({ message: "Post ", success: true, post });
};

//all post(community)
const allPost = async (req, res) => {
  let post = await Post.find();

  return res.json({ message: "allPost ", success: true, post });
};

//get following post
const getFeedPosts = async (req, res) => {
  //get userid
  // search user and its followings
  // get information of the following user

  const id = req.user._id;

  let followingsId = [];

  let user = await User.find(id).select({ following: 1, _id: 0 });

  // console.log(user.following);

  user.map((obj) => {
    // console.log("followings are ", obj.following);
    followingsId = obj.following;
  });

  let allFollowings = await Post.find({ owner: { $in: followingsId } });
  // console.log("info are", allFollowings);

  // console.log("id of followigs are ", followingsId);

  return res.json({
    message: "all post of followings are",
    allFollowings,
    success: true,
  });
};

const savePost = async (req, res) => {
  //post id
  // user save

  let { id } = req.body;
  let userid = req.user._id;
  // console.log(postid);

  let post = await Post.findById(id);

  console.log(post);
  let user = await User.findById(userid);
  console.log(user.savedPost);

  if (user.savedPost.includes(id)) {
    await user.updateOne({ $pull: { savedPost: id } });
    res.status(200).json("Post unaved");
  } else {
    await user.updateOne({ $push: { savedPost: id } });
    res.status(200).json("Post saved");
  }
};

//dete post ->

const deletePost = async (req, res) => {
  //post id
  // user save

  let { id } = req.body;

  // console.log(postid);

  let post = await Post.findByIdAndDelete(id);
  return res.json({ message: "Post deleted successfully", post });
};

//fetch saved post
const fetchsavedpost = async (req, res) => {
  const id = req.user._id;
  // let user = await User.findById(id);
  let postId = [];

  let user = await User.find(id).select({ savedPost: 1, _id: 0 });
  // console.log(user);

  // console.log(user.following);

  user.map((obj) => {
    // console.log("followings are ", obj.following);
    postId = obj.savedPost;
  });

  // console.log(postId)

  let allPost = await Post.find({ _id: { $in: postId } });
  // console.log("info are", allPost);

  return res.json({
    message: "all post of followings are",
    allPost,
    success: true,
  });
};

//update profile image->
const updateUserAvatar = async (req, res) => {
  console.log(req.user);
  // const avatarLocalPath = req.files?.path;
  // console.log(req.files.avatar[0].path)

  const avatarLocalPath = req.files.avatar[0].path;

  if (!avatarLocalPath) {
    throw new ApiError(401, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  console.log(avatar.url);
  const newImage = avatar.url;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      avatar: newImage,
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "avatar image updated "));
};

const community = async (req, res) => {
  let id = req.user._id;
  // console.log(id);
  let post = await Post.find({ owner: { $ne: id } });

  return res.json({ message: "community post", post });
};

//Like or dislike

const likePost = async (req, res) => {
  const { id } = req.body;

  const userId = req.user._id;

  console.log(userId);
  console.log(id);

  const post = await Post.findById(id);

  if (post.likes.includes(userId)) {
    await post.updateOne({ $pull: { likes: userId } });
    res.status(200).json("Post disliked");
  } else {
    await post.updateOne({ $push: { likes: userId } });
    res.status(200).json("Post liked");
  }
};

//messages  routes ->
const sendMessage = async (req, res) => {
  //get sender id
  //get message to send
  //get reciever id

  const { id, message } = req.body; //reciever id and msg

  const userId = req.user._id; // sender id

  console.log("msg send by ->", userId, "to ->", id, "message ->", message);

  let msg = await Message.create({
    sender: userId,
    message: message,
    reciever: id,
  });

  return res.json({ message: "message sent ", msg, success: true });
};

const fetchMessage = async (req, res) => {
  const { id } = req.body; //reciever id and msg

  const userId = req.user._id; // sender id
  // console.log("sender->" , userId,"rec->",id)

  let msg = await Message.find({
    // $and: [{ sender: userId }, { reciever: id }],
    $or: [
      {
        $and: [{ sender: userId }, { reciever: id }],
      },
      {
        $and: [{ sender: id }, { reciever: userId }],
      },
    ],
  });
  // console.log(msg);

  return res.json({ message: "messages fetched", msg, success: true });
};

export {
  registerUser,
  loginUser,
  updateUserAvatar,
  logoutUser,
  verifyEmail,
  createPost,
  userPost,
  allPost,
  followUser,
  allUser,
  unfollowUser,
  getFeedPosts,
  loggedUser,
  community,
  likePost,
  savePost,
  fetchsavedpost,
  deletePost,
  sendMessage,
  fetchMessage,
  freinds,
};
