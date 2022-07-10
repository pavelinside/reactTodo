function todos(state = {}, action) {
  console.log('Action: ', action, state);
  let changedPhones = [];
  switch (action.type) {
  case "SET_STATE":
    changedPhones = (state.phones || []).concat(action.state.phones);
    return {phones: changedPhones};
  case 'ADD_PHONE':
    changedPhones = [].concat(state.phones || []);
    changedPhones.push(action.phone);
    return {phones: changedPhones};
  case "DELETE_PHONE":
    if(!state.phones || !state.phones.length) {
      return {phones: []};
    }
    changedPhones = (state.phones || []).filter((item) => item !== action.phone);
    return {phones: changedPhones};
  default:
    return state;
  }
}

export default todos;