import React from "react";
// import Dropdown from 'react-dropdown'
import { parseISO, formatRelative, formatDistance, format } from "date-fns";

import "./styles.scss";

const formatDate = (timestamp) => {
  timestamp = parseISO(timestamp);
  const timeAgo = formatDistance(timestamp, new Date(), { addSuffix: true });
  const date = format(timestamp, "MM/dd/yyyy");
  return `${timeAgo} on ${date}`;
};

export const Post = (props) => {
  const imageCheck = props.image ? "post-content" : "post-content no-image";

  const time = formatDate(props.date);

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
          Posted by {props.author} {time}.
        </div>
        <div className="post-item content">{props.content}</div>
        <div className="replies">Replies: {props.replies.length}</div>
      </div>
    </div>
  );
};
