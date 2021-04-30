import React from "react";

import "./styles.scss";

export const Footer = () => {
  return (
    <footer>
      <p>
        This site was made by Mackenzie Charlton in 2021. Check out the rest of
        my portfolio at{" "}
        <a className="footer-link" href="http://www.sunkenworld.com/">
          sunkenworld.com
        </a>{" "}
        and see the code on{" "}
        <a
          className="footer-link"
          href="https://github.com/mackenziewritescode/restful-forum"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
};
