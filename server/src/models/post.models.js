import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    post: {
      type: String, //clouniray url
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    likes: [],

    isPublished: {
      type: Boolean,
      default: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
