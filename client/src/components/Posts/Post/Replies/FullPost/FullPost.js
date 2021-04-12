import React from "react";

import "./styles.scss";
import { formatDate } from "../../formatDate";
import { ReplyMenu } from "../ReplyMenu/ReplyMenu";

export const FullPost = (props) => {
  const time = formatDate(props.date);

  const image = props.image ? (
    <>
      <div>
        <img className="image" alt="" src={props.image} />
      </div>
      <hr />
    </>
  ) : null;

  return (
    <div className="full-post">
      <div className="post-content">
        <div className="title-and-menu">
          <h3>{props.title}</h3>
          <ReplyMenu id={props.id} />
        </div>
        <div className="post-item author">
          Posted by {props.author} {time}.
        </div>
        <hr />
        <div className="image-wrap">{image}</div>
        <div className="post-item content">{props.content}</div>
      </div>
    </div>
  );
};
