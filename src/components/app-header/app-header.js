import React from "react";
import "./app-header.css";
import PropTypes from "prop-types";

const AppHeader = ({ all, done, important }) => {
  return (
    <div className="app-header d-flex">
      <h2>
        All: {all} Done: {done} Important: {important}
      </h2>
    </div>
  );
};
AppHeader.propTypes = {
  all: PropTypes.number.isRequired,
  done: PropTypes.number.isRequired,
  important: PropTypes.number.isRequired
};

export default AppHeader;