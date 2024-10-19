import { Router } from "express";
import {
  allPost,
  allUser,
  community,
  createPost,
  deletePost,
  fetchMessage,
  fetchsavedpost,
  followUser,
  freinds,
  getFeedPosts,
  likePost,
  loggedUser,
  loginUser,
  logoutUser,
  registerUser,
  savePost,
  sendMessage,
  unfollowUser,
  updateUserAvatar,
  userPost,
  verifyEmail,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/verifyemail").post(verifyEmail);

router.route("/login").post(loginUser);
router.route("/updateAvatar").post(
  verifyJWT,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  updateUserAvatar
);
router.route("/addPost").post(
  verifyJWT,
  upload.fields([
    {
      name: "post",
      maxCount: 1,
    },
  ]),
  createPost
);

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/userpost").post(verifyJWT, userPost);
router.route("/allpost").post(allPost);
router.route("/follow").post(verifyJWT, followUser);
router.route("/unfollow").post(verifyJWT, unfollowUser);
router.route("/like").post(verifyJWT, likePost);

router.route("/feedPost").post(verifyJWT, getFeedPosts);
router.route("/savedpost").post(verifyJWT, savePost);
router.route("/fetchsavedpost").post(verifyJWT, fetchsavedpost);

router.route("/deletepost").post(verifyJWT, deletePost);

router.route("/community").post(verifyJWT, community);

router.route("/alluser").post(verifyJWT, allUser);

router.route("/loggedUser").post(verifyJWT, loggedUser);

router.route("/sendmessage").post(verifyJWT, sendMessage);
router.route("/fetchmessage").post(verifyJWT, fetchMessage);
router.route("/freinds").post(verifyJWT, freinds);


export default router;
