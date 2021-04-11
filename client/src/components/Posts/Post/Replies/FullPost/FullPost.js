import React from "react";
import "./styles.scss";

export const FullPost = (props) => {
  return (
    <div className="full-post">
      <div className="post-content">
        <h3>{props.title}</h3>
        <hr />
        {props.image ? (
          <img className="image" alt="" src={props.image} />
        ) : null}
      </div>
    </div>
  );
};
