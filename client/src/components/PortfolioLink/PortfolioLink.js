import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";

import "./styles.scss";

export const PortfolioLink = () => {
  return (
    <a id="portfolio-link" href="http://www.sunkenworld.com/#page-3">
      <p id="portfolio-text">
        <RiArrowGoBackLine className="arrow" /> Back to portfolio
      </p>
    </a>
  );
};
