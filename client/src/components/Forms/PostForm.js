import React, { useState, useContext, useEffect } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";
import { createPost, updatePost } from "../../features/postsActions";
import { PostContext } from "../../App";

export const PostForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);
  const [reqStatus, setReqStatus] = useState("idle");
  const [fileKey, setFileKey] = useState("");

  const { currentPostId, setCurrentPostId } = useContext(PostContext);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  const existingPost = currentPostId
    ? posts.find((post) => post._id === currentPostId)
    : null;

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
    const randomString = Math.random().toString(36);

    setTitle("");
    setAuthor("");
    setContent("");
    setImage("");
    setImageRemoved(false);
    setFileKey(randomString);
    if (currentPostId) setCurrentPostId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      if (!existingPost) {
        //-------------------- CREATE POST
        try {
          setReqStatus("pending");
          await dispatch(createPost({ title, author, content, image }));
        } catch (error) {
          console.log(error);
        } finally {
          setReqStatus("idle");
          setCurrentPostId("");
          clearForm();
        }
      } else {
        //-------------------- EDIT POST
        try {
          const updatedPost =
            image || imageRemoved
              ? { title, author, content, image }
              : { title, author, content };

          setReqStatus("pending");
          await dispatch(updatePost(currentPostId, updatedPost));
        } catch (error) {
          console.log(error);
        } finally {
          setReqStatus("idle");
          setCurrentPostId("");
          clearForm();
        }
      }
    }
  };

  const handleRemoveImage = () => {
    const randomString = Math.random().toString(36);

    setImage("");
    setFileKey(randomString);
    setImageRemoved(true);
  };

  const formWrapperStyle = currentPostId
    ? "form-wrapper form-edit"
    : "form-wrapper";

  return (
    <div className={formWrapperStyle}>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h2>{currentPostId ? "Edit" : "Create"} Post</h2>
        <input
          className="form-input"
          type="text"
          name="title"
          placeholder="Post title"
          value={title}
          maxLength="64"
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br />
        <input
          className="form-input"
          type="text"
          name="author"
          placeholder="Your name"
          value={author}
          maxLength="32"
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
            key={fileKey}
            multiple={false}
            onDone={(image) => setImage(image.base64)}
          />
        </div>
        <button
          type="button"
          className="remove-image-button"
          onClick={handleRemoveImage}
        >
          Remove Image
        </button>
        <input
          type="submit"
          className="button"
          value={currentPostId ? "Update" : "Post"}
        />
      </form>
      <button className="button clear-button" onClick={clearForm}>
        {currentPostId ? "Cancel" : "Clear"}
      </button>
    </div>
  );
};
