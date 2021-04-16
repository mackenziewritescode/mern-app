import React, { useState, useContext, useEffect } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";
import {
  createReply,
  // updateReply
} from "../../features/repliesActions";
import { ReplyContext } from "../Posts/Post/Replies/Replies";

export const ReplyForm = ({ parentId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [reqStatus, setReqStatus] = useState("idle");
  const [fileKey, setFileKey] = useState("");

  const { currentReplyId, setCurrentReplyId } = useContext(ReplyContext);

  const dispatch = useDispatch();

  const clearForm = () => {
    const randomString = Math.random().toString(36);

    setTitle("");
    setAuthor("");
    setContent("");
    setImage("");
    setFileKey(randomString);
    if (currentReplyId) setCurrentReplyId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setReqStatus("pending");
      console.log(parentId, author, content, image);
      await dispatch(createReply({ parent: parentId, author, content, image }));
    } catch (error) {
      console.log(error);
    } finally {
      setReqStatus("idle");
      clearForm();
    }
  };

  const formWrapperStyle = currentReplyId
    ? "form-wrapper form-edit"
    : "form-wrapper";

  return (
    <div className={formWrapperStyle}>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h2>{currentReplyId ? "Edit" : "Add a"} Reply</h2>
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
        <input
          type="submit"
          className="button"
          value={currentReplyId ? "Update" : "Reply"}
        />
        <button className="button clear-button" onClick={clearForm}>
          {currentReplyId ? "Cancel" : "Clear"}
        </button>
      </form>
    </div>
  );
};

// // const posts = useSelector((state) => state.posts);
// const existingReply = currentReplyId;
// //   ? posts.find((post) => post._id === currentReplyId)
// //   : null;

// // Fill form with post to edit when Edit is clicked
// useEffect(() => {
//   if (currentReplyId) {
//     setTitle(existingReply.title);
//     setAuthor(existingReply.author);
//     setContent(existingReply.content);
//   }
//   // eslint-disable-next-line
// }, [currentReplyId]);

// const fieldsCheck = [author, content]; //----------------- add condition for title
// const canSave = fieldsCheck.every(Boolean) && reqStatus === "idle";
// const clearForm = () => {
//   const randomString = Math.random().toString(36);

//   setTitle("");
//   setAuthor("");
//   setContent("");
//   setImage("");
//   setFileKey(randomString);
//   if (currentReplyId) setCurrentReplyId("");
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (canSave) {
//     if (!existingReply) {
//       //-------------------- CREATE POST
//       try {
//         setReqStatus("pending");
//         await dispatch(
//           createReply({ parent: parentId, author, content, image })
//         );
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setReqStatus("idle");
//         setCurrentReplyId("");
//         clearForm();
//       }
//         } else {
//           //-------------------- EDIT POST
//           try {
//             const updatedReply = image
//               ? { title, author, content, image }
//               : { title, author, content };
//             setReqStatus("pending");
//             await dispatch(updateReply(currentReplyId, updatedReply));
//           } catch (error) {
//             console.log(error);
//           } finally {
//             setReqStatus("idle");
//             setCurrentReplyId("");
//             clearForm();
//           }
//     }
//   }
// };

// const formWrapperStyle = currentReplyId
//   ? "form-wrapper form-edit"
//   : "form-wrapper";
