import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    post: {
      type: String, //clouniray url
      required: true,
    },

    // thumbnail: {
    //   type: String, //clouniray url
    //   required: true,
    // },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    // duration: {
    //   type: Number, //clouniray url
    //   required: true,
    // },

    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
