import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
    return res.json({ message: "email exsist", success: false, user });
  }
  return res.json({ message: "email dont exsist ", success: true });
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
    throw new ApiError(401, "invalid user credentials");
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

export { registerUser, loginUser, updateUserAvatar, logoutUser, verifyEmail };
