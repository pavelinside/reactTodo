import React from "react";
import PropTypes from "prop-types";
import "./app.css";

import AppHeader from "../app-header";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
import Pagination from "../pagination";

import { connect } from "react-redux";
import {getList, addItem, deleteItem, toggleImportant, toggleDone, setSearch, setFilter, onPageChanged} from "../../actions";

const App = (props) => {
  console.log(`APP F:${props.filter} S:${props.search} All:${props.allCount} Done:${props.doneCount} Imp:${props.importantCount} page:${props.pageNumber} pages:${props.pagesTotal}`);
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
  const pagination = props.allCount > 0 ?
    <Pagination
      pageNumber={props.pageNumber}
      totalRecords={props.allCount}
      pageLimit={props.pageLimit}
      pageNeighbours={1}
      onPageChanged={props.onPageChanged}
    /> : "";

  console.log("render");
  return (
    <div className="todo-app">
      {spinner}
      <div className="search-panel d-flex">
        <ItemAddForm value={props.search} onItemAdded={props.addItem} onSearchChange={props.setSearch} />

        <ItemStatusFilter filter={props.filter} onFilterChange={props.setFilter}  />
      </div>

      <TodoList
        items={props.items}
        onToggleImportant={props.toggleImportant}
        onToggleDone={props.toggleDone}
        onDelete={props.deleteItem}
      />

      {pagination}
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
  pageLimit: PropTypes.number,
  pageNumber: PropTypes.number,
  pagesTotal: PropTypes.number,

  getList: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  toggleImportant: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  onPageChanged: PropTypes.func
};
App.defaultProps = {
  filter: "all",
  search: ""
};

function mapStateToProps(state) {
  return {
    items: state.items,
    filter: state.filter,
    search: state.search,
    doneCount: state.doneCount,
    importantCount: state.importantCount,
    allCount: state.allCount,
    error: state.error,
    loading: state.loading,
    pageNumber: state.pageNumber,
    pagesTotal: state.pagesTotal,
    pageLimit: state.pageLimit
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
    setFilter: (filter) => dispatch(setFilter(filter)),
    onPageChanged: (paginationData) => dispatch(onPageChanged(paginationData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);