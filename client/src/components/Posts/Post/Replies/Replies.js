import React, { useEffect, createContext, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./styles.scss";
import { getPosts } from "../../../../features/postsActions";
import { getReplies } from "../../../../features/repliesActions";
import { FullPost } from "./FullPost/FullPost";
import { Reply } from "./Reply/Reply";
import { ReplyForm } from "../../../Forms/ReplyForm";
import { PostForm } from "../../../Forms/PostForm";
import { PostContext } from "../../../../App";

export const ReplyContext = createContext();

export const Replies = ({ match }) => {
  const [currentReplyId, setCurrentReplyId] = useState("");

  const { currentPostId } = useContext(PostContext);

  const { postId } = match.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getReplies());
  }, [dispatch]);

  const post = useSelector((state) =>
    state.posts.find((post) => post._id === postId)
  );

  const replies = useSelector((state) =>
    state.replies.filter((reply) => reply.parent === postId)
  );

  const replyIndex = (reply) => {
    return replies.indexOf(reply) + 1;
  };

  const fullPost = post ? (
    <FullPost
      key={post._id}
      id={post._id}
      title={post.title}
      author={post.author}
      content={post.content}
      image={post.image}
      date={post.date}
      postNum={post.postNum}
      replies={post.replies}
    />
  ) : null;

  const renderedReplies =
    replies && post
      ? replies.map((reply) => (
          <Reply
            key={reply._id}
            id={reply._id}
            number={replyIndex(reply)}
            author={reply.author}
            content={reply.content}
            image={reply.image}
            date={reply.date}
          />
        ))
      : null;

  return (
    <ReplyContext.Provider value={{ currentReplyId, setCurrentReplyId }}>
      {/* If the post doesn't exist */}
      {!post ? (
        ""
      ) : (
        <div id="replies">
          <h2>Title</h2>
          <div id="content">
            {/* Check for edit post form or reply form */}
            {!currentPostId ? (
              <ReplyForm parentId={postId} />
            ) : (
              <PostForm id={postId} />
            )}
            <div id="reply-wrapper">
              {fullPost}
              {renderedReplies}
            </div>
          </div>
        </div>
      )}
    </ReplyContext.Provider>
  );
};
