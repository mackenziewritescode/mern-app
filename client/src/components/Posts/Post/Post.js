import React from "react";
import { Link } from "react-router-dom";

import { PostMenu } from "./PostMenu/PostMenu";
import "./styles.scss";
import { formatDate } from "./formatDate";

export const Post = (props) => {
  const imageCheck = props.image ? "post-content" : "post-content no-image";

  const time = formatDate(props.date);

  // const author = (
  //   // <span>
  //   //   <span className="invisible">-</span>
  //   //   <span className="author-prop">{props.author}</span>
  //   //   <span className="invisible">-</span>
  //   // </span>
  // );

  return (
    <div className="post-wrap">
      <PostMenu id={props.id} />
      <Link id="post" to={`/posts/${props.id}`}>
        {props.image ? (
          <div className="post-image-wrap">
            <img className="post-image" alt="" src={props.image} />
          </div>
        ) : null}
        <div id="post-content" className={imageCheck}>
          <div className="post-item post-title">
            <h4>{props.title}</h4>
          </div>
          <div className="post-item author">
            Posted by {props.author} {time}.
          </div>
          <div className="post-item content">{props.content}</div>
          <div className="replies">Replies: {props.replies.length}</div>
        </div>
      </Link>
    </div>
  );
};
