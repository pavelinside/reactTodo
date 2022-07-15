import React from "react";
import PropTypes from "prop-types";
import "./app.css";

import AppHeader from "../app-header";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

import { connect } from "react-redux";
import {getList, addItem, deleteItem, toggleImportant, toggleDone, setSearch, setFilter} from "../../reducers";

const App = (props) => { console.log("items", props);
  React.useEffect(() => {
    console.log('useEffectInit');
    props.getList();
  }, []);
  React.useEffect(() => {
    console.log('useEffect');
  });

  if(props.error){
    return (
      <div className="todo-app">
        <ErrorIndicator error={props.error} />
        <i className="fa fa-refresh" aria-hidden="true" onClick={props.getList}> Refresh</i>
      </div>
    );
  }

  const spinner = props.loading ? <Spinner /> : "";
  console.log("render");
  return (
    <div className="todo-app">
      {spinner}
      <div className="search-panel d-flex">
        <ItemAddForm onItemAdded={props.addItem} onSearchChange={props.setSearch} />

        <ItemStatusFilter
          filter={props.filter}
          onFilterChange={props.setFilter}
        />
      </div>

      <TodoList
        items={props.items}
        onToggleImportant={props.toggleImportant}
        onToggleDone={props.toggleDone}
        onDelete={props.deleteItem}
      />

      <AppHeader all={props.allCount} done={props.doneCount} important={props.importantCount} />
    </div>
  );
};
App.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  filter: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  doneCount: PropTypes.number.isRequired,
  importantCount: PropTypes.number.isRequired,
  allCount: PropTypes.number.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,

  getList: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  toggleImportant: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};
App.defaultProps = {
  filter: "all",
  search: ""
};

function mapStateToProps(state) {
  //console.log('qq', state);
  return {
    items: state.items,
    filter: state.filter,
    search: state.search,
    doneCount: state.doneCount,
    importantCount: state.importantCount,
    allCount: state.allCount,
    error: state.error,
    loading: state.loading,
  };

}

// import { bindActionCreators } from 'redux'
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ increment, decrement, reset }, dispatch)
// }

const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => dispatch(getList()),
    addItem: (item) => dispatch(addItem(item)),
    deleteItem: (id) => dispatch(deleteItem(id)),
    toggleImportant: (id) => dispatch(toggleImportant(id)),
    toggleDone: (id) => dispatch(toggleDone(id)),
    setSearch: (search) => dispatch(setSearch(search)),
    setFilter: (filter) => dispatch(setFilter(filter))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);