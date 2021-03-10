import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../features/postsSlice";
import { Post } from "./Post/Post";
import { PostForm } from "../Forms/PostForm";

export const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  console.log(posts);

  const renderedPosts = posts.map((post) => (
    <Post
      key={post._id}
      title={post.title}
      author={post.author}
      content={post.content}
      image={post.image}
      date={post.date}
      postNum={post.postNum}
      replies={post.replies}
    />
  ));

  return (
    <>
      <PostForm />
      {renderedPosts}
    </>
  );
};
