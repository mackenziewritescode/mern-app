import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

export const Header = () => {
  return (
    <Link className="site-header" to="/">
      <h2>Restful Forum</h2>
      <h4>
        A comprehensive coding exercise with a proprietary REST API made with
        React, Redux, Node.js and MongoDB
      </h4>
    </Link>
  );
};
