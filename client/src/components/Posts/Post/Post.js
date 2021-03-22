import React from "react";
// import { formatRelative } from "date-fns";

import "./styles.scss";

export const Post = (props) => {
  const imageCheck = props.image ? "post-content" : "post-content no-image";

  return (
    <div id="post">
      {props.image ? (
        <div className="post-image-wrap">
          <img className="post-image" alt="" src={props.image} />
        </div>
      ) : null}
      <div className={imageCheck}>
        <h4 className="post-item title">{props.title}</h4>
        <div className="post-item author">
          Posted by {props.author} two minutes ago.
        </div>
        <div className="post-item content">{props.content}</div>
        <div className="replies">Replies: {props.replies.length}</div>
      </div>
    </div>
  );
};
