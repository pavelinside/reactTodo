import React from "react";
import PropTypes from "prop-types";
import {filterList} from "../../define";

const filterButtons = [
  { name: filterList.all, label: "All" },
  { name: filterList.active, label: "Active" },
  { name: filterList.done, label: "Done" },
  { name: filterList.important, label: "Important" }
];

const ItemStatusFilter = ({ filter, onFilterChange = () => {} }) => {
  function onChange(e){
    onFilterChange(e.target.value);
  }
  const options = filterButtons.map(({ name, label }) => {
    return <option key={name} value={name}>{label}</option>;
  });
  return <select value={filter} className="form-select" onChange={onChange}>
    {options}
  </select>;
};
ItemStatusFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func
};


export default ItemStatusFilter;