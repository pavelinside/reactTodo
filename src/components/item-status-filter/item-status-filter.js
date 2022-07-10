import React from "react";

const filterButtons = [
  { name: "all", label: "All" },
  { name: "active", label: "Active" },
  { name: "done", label: "Done" },
  { name: "important", label: "Important" }
];

const ItemStatusFilter = ({ filter, onFilterChange = () => {} }) => {
  function onChange(e){
    onFilterChange(e.target.value);
  }
  const options = filterButtons.map(({ name, label }) => {
    return <option key={name} value={name}>{label}</option>;
  });
  return <select value={filter} className="form-select" onChange={onChange}>{options}</select>;
};
export default ItemStatusFilter;