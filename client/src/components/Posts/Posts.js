import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

import { getPosts } from "../../features/postsActions";
import { getReplies } from "../../features/repliesActions";
import { Post } from "./Post/Post";
import { PostForm } from "../Forms/PostForm";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { NoPosts } from "./NoPosts/NoPosts";

export const Posts = () => {
  const [noPosts, setNoPosts] = useState(false);
  const [fetchStatus, setFetchStatus] = useState("initial");

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const replies = useSelector((state) => state.replies);

  const replyCount = (parentId) => {
    return replies.filter((reply) => reply.parent === parentId).length;
  };

  useEffect(() => {
    const getPostsAndReplies = async () => {
      try {
        await dispatch(getPosts());
        await dispatch(getReplies());
      } catch (error) {
        console.log(error);
      } finally {
        setFetchStatus("complete");
      }
    };
    getPostsAndReplies();
  }, [dispatch]);

  // if getPosts successfully dispatches but here are no posts, return "no posts" message
  useEffect(() => {
    if (fetchStatus === "complete" && posts.length === 0) setNoPosts(true);
  }, [posts, fetchStatus]);

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
    <div id="posts">
      <Header />
      <div id="content">
        <PostForm />
        <div id="post-wrapper">{noPosts ? NoPosts : renderedPosts}</div>
      </div>
      <Footer />
    </div>
  );
};
