import React from "react";
import "./item-add-form.css";

function itemAddFormHook(props){
  const [label, selLabel] = React.useState('');

  const onLabelChange = function(e){
    selLabel(e.target.value);
  };
  const onSubmit = function(e){
    e.preventDefault();
    const currentLabel = label;
    selLabel("");
    const cb = props.onItemAdded || (() => {});
    cb(currentLabel);
  };
  const onSearch = function(){
    const { onSearchChange = () => {} } = props;
    onSearchChange(label);
  };

  return (
    <form className="bottom-panel d-flex" onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control new-todo-label"
        value={label}
        onChange={onLabelChange}
        placeholder="What needs to be done?"
      />

      <button type="button" onClick={onSearch} className="btn btn-outline-secondary">
        <i className="fa fa-search"></i>
      </button>

      <button type="submit" className="btn btn-outline-secondary">
        <i className="fa fa-plus"></i>
      </button>
    </form>
  );
}

export default itemAddFormHook;