import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import "./styles.scss";
// import { createPost } from "../../features/postsSlice";

export const PostForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [reqStatus, setReqStatus] = useState("idle");

  const dispatch = useDispatch();

  const fieldsCheck = [title, author, content];
  const canSave = fieldsCheck.every(Boolean) && reqStatus === "idle";

  const handleSubmit = async () => {
    // if (canSave) {
    //   try {
    //     const result = await dispatch(
    //       createPost({ title, author, content, image })
    //     );
    //     unwrapResult(result);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  return (
    <div className="form-wrapper">
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h2>Create a Post</h2>
        <input
          className="form-input"
          type="text"
          name="title"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br />
        <input
          className="form-input"
          type="text"
          name="author"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />{" "}
        <br />
        <textarea
          className="form-input"
          name="content"
          placeholder="Write something"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />{" "}
        <br />
        <div className="file-upload">
          <label htmlFor="image">Add an image</label>
          <FileBase multiple={false} onDone={(image) => setImage(image)} />
        </div>
        <input type="submit" className="submit-button" value="Submit" />
      </form>
    </div>
  );
};
