import React from "react";
// import { formatRelative } from "date-fns";

import "./styles.scss";

export const Post = (props) => {
  return (
    <div id="post">
      {props.image ? (
        <div className="post-image-wrap">
          <img className="post-image" alt="" src={props.image} />
        </div>
      ) : null}
      <div className="post-content">
        <div className="post-item">Title: {props.title}</div>
        <div className="post-item">Author: {props.author}</div>
        <div className="post-item">Content: {props.content}</div>
      </div>
    </div>
  );
};
