import React, { useEffect, useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

import { getPosts } from "../../features/postsActions";
import { getReplies } from "../../features/repliesActions";
import { Post } from "./Post/Post";
import { PostForm } from "../Forms/PostForm";

export const PostContext = createContext();

export const Posts = () => {
  const [currentPostId, setCurrentPostId] = useState("");

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const replies = useSelector((state) => state.replies);

  const replyCount = (parentId) => {
    return replies.filter((reply) => reply.parent === parentId).length;
  };

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getReplies());
  }, [dispatch]);

  const renderedPosts = posts
    .map((post) => (
      <Post
        key={post._id}
        id={post._id}
        title={post.title}
        author={post.author}
        content={post.content}
        image={post.image}
        date={post.date}
        replyCount={replyCount(post._id)}
      />
    ))
    .reverse();

  return (
    <PostContext.Provider value={{ currentPostId, setCurrentPostId }}>
      <div id="posts">
        <h2>REST with MERN</h2>
        <div id="content">
          <PostForm />
          <div id="post-wrapper">{renderedPosts}</div>
        </div>
      </div>
    </PostContext.Provider>
  );
};
