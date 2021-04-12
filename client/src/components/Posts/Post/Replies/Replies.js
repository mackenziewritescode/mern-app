import React, { useEffect, createContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./styles.scss";
import { getPosts } from "../../../../features/postsActions";
import { FullPost } from "./FullPost/FullPost";
import { Reply } from "./Reply/Reply";
import { ReplyForm } from "../../../Forms/ReplyForm";

export const ReplyContext = createContext();

export const Replies = ({ match }) => {
  const [currentReplyId, setCurrentReplyId] = useState("");

  const { postId } = match.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const post = useSelector((state) =>
    state.posts.find((post) => post._id === postId)
  );

  const replies = []; // useDispatch

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

  const renderedReplies = replies.map((reply) => <Reply />);

  return (
    <ReplyContext.Provider value={{ currentReplyId, setCurrentReplyId }}>
      <div id="replies">
        <h2>Title</h2>
        <div id="content">
          <ReplyForm id={postId} />
          <div id="reply-wrapper">
            {fullPost}
            {renderedReplies}
          </div>
        </div>
      </div>
    </ReplyContext.Provider>
  );
};
