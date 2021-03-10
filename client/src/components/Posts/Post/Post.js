import React from "react";
import "./styles.scss";

export const Post = (props) => {
  return (
    <>
      <p>Title: {props.title}</p>
      <p>Author: {props.author}</p>
      <p>Content: {props.content}</p>
    </>
  );
};
