import { Router } from "express";
import {
  allPost,
  createPost,
  loginUser,
  logoutUser,
  registerUser,
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

export default router;
