import React, { useState, useContext, useEffect } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import "./styles.scss";
import { createPost } from "../../features/postsSlice";
import { PostContext } from "../Posts/Posts";

export const PostForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [reqStatus, setReqStatus] = useState("idle");

  const { currentPostId, setCurrentPostId } = useContext(PostContext);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.postsData);
  const existingPost = posts.find((post) => post._id === currentPostId);

  // Fill form with post to edit when Edit is clicked
  useEffect(() => {
    if (currentPostId) {
      setTitle(existingPost.title);
      setAuthor(existingPost.author);
      setContent(existingPost.content);
    }
    // eslint-disable-next-line
  }, [currentPostId]);

  const fieldsCheck = [title, author, content];
  const canSave = fieldsCheck.every(Boolean) && reqStatus === "idle";
  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      // if (!existingPost) {
      //-------------------- CREATE POST
      try {
        setReqStatus("pending");
        const result = await dispatch(
          createPost({ title, author, content, image })
        );
        unwrapResult(result);
      } catch (error) {
        console.log(error);
      } finally {
        setReqStatus("idle");
        setCurrentPostId("");
        clearForm();
      }
    } else {
      //-------------------- EDIT POST
    }
    // }
  };

  const formWrapperStyle = currentPostId
    ? "form-wrapper form-edit"
    : "form-wrapper";

  return (
    <div className={formWrapperStyle}>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h2>{currentPostId ? "Edit" : "Create a"} Post</h2>
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
          <FileBase64
            multiple={false}
            onDone={(image) => setImage(image.base64)}
          />
        </div>
        <input
          type="submit"
          className="submit-button"
          value={currentPostId ? "Update" : "Post"}
        />
      </form>
    </div>
  );
};
