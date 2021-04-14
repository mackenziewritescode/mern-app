import React from "react";

import "./styles.scss";
import { formatDate } from "../../formatDate";
import { ReplyMenu } from "../ReplyMenu/ReplyMenu";

export const Reply = (props) => {
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
    <div className="reply">
      <div className="reply-content">
        <div className="number-and-menu">
          <span className="reply-item number">Reply #{props.number}</span>
          <ReplyMenu id={props.id} />
        </div>
        <div className="reply-item author">
          Posted by {props.author} {time}.
        </div>
        <hr />
        <div className="image-wrap">{image}</div>
        <div className="reply-item content">{props.content}</div>
      </div>
    </div>
  );
};
