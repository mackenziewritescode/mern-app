import React from "react";
import "./styles.scss";

export const Reply = (props) => {
  console.log(props.title);

  return <h1>{props.title}</h1>;
};
