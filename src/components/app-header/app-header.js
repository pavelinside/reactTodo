import React from "react";
import "./app-header.css";

const AppHeader = ({ toDo, done }) => {
  return (
    <div className="app-header d-flex">
      <h2>
        Todo: {toDo}, Done: {done}
      </h2>
    </div>
  );
};

export default AppHeader;