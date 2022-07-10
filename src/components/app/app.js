import React from "react";
import AppHeader from "../app-header";
import TodoList from "../todo-list";
//import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
//import DummyTodoService from "../../services/dummy-todo-service";
import ErrorIndicator from "../error-indicator";
import "./app.css";

const App = (props) => {
  let items = props.items;
  console.log("items", props, items);

  //const [error, setError] = React.useState('');

  React.useEffect(() => {
    // const Service = new DummyTodoService();
    // Service.getList().then((data) => {
    //   setError('');
    //   setItems(data);
    // }).catch((err) => {
    //   setError(err.message);
    // });
  },[]); // эффект срабатывает только один раз - при самом первом рендеринге

  const doneCount = items.filter((item) => item.done).length;
  const toDoCount = items.length - doneCount;
  const filterItems = function(items, filter){
    if (filter === "all") {
      return items;
    } else if (filter === "active") {
      return items.filter((item) => !item.done);
    } else if (filter === "done") {
      return items.filter((item) => item.done);
    } else if (filter === "important") {
      return items.filter((item) => item.important);
    }
  };
  const searchItems = function(items, search){
    if (search.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  };
  const visibleItems = searchItems(
    filterItems(items, props.filter),
    props.search
  );

  if(props.error){
    return <ErrorIndicator error={props.error} />;
  }

  return (
    <div className="todo-app">
      <div className="search-panel d-flex">
        <ItemAddForm onItemAdded={props.addItem} onSearchChange={props.setSearch} />

        <ItemStatusFilter
          filter={props.filter}
          onFilterChange={props.setFilter}
        />
      </div>

      <TodoList
        items={visibleItems}
        onToggleImportant={props.toggleImportantItem}
        onToggleDone={props.toggleDoneItem}
        onDelete={props.deleteItem}
      />

      <AppHeader toDo={toDoCount} done={doneCount} />

    </div>
  );
};
//App.defaultProps = {};


import { connect } from "react-redux";
//import actions from "../../actions";
import {actions} from "../../reducers/todoSlice";
//export const { setItems, addItem, deleteItem, toggleDoneItem, toggleImportantItem, setFilter, setSearch } = todoSlice.actions

function mapStateToProps(state) {
  console.log('mStP', state);
  return {
    items: state.items,
    filter: state.filter,
    search: state.search
  };
}



export default connect(mapStateToProps, actions)(App);

//export default App;