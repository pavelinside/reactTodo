import React from "react";
import PropTypes from "prop-types";
import "./todo-list.css";
import TodoListItem from "../todo-list-item/todo-list-item";

const TodoList = ({ items, onToggleImportant, onToggleDone, onDelete }) => {
  const elements = items.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
          onDelete={() => onDelete(id)}
        />
      </li>
    );
  });
  return <ul className="todo-list list-group">{elements}</ul>;
};
TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  onToggleImportant: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TodoList;