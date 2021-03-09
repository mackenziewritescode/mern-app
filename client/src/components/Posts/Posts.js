import React from "react";
import { useSelector } from "react-redux";

import { Post } from "./Post/Post";
import { PostForm } from "../Forms/PostForm";

export const Posts = () => {
  const posts = useSelector((state) => state.posts);

  const renderedPosts = posts.map((post) => (
    <Post
      key={post.id}
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
