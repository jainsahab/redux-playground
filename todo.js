const createStore = require('redux').createStore;
const combineReducers = require('redux').combineReducers;

const initialState = {
    visibilityFilter: 'SHOW_ALL',
    todos: []
};


// Actions

const addToDoAction = function (text) {
    return {type: 'ADD_TODO', text: text}
};

const deleteToDoAction = function (index) {
    return {type: 'DELETE_TODO', index: index}
};

const markAsCompletedAction = function (index) {
    return {type: 'MARK_AS_COMPLETED', index: index}
};

const visibilityAction = function (visibility) {
    return {type: 'VISIBILITY_FILTER', visibility: visibility}
};


// Reducers

const markCompletedAtIndex = function (givenIndex) {
    return (elem, index) => {
        if (index == givenIndex) {
            return Object.assign({}, elem, {completed: true});
        }
        return elem;
    }
};

const toDosReducer = function (state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([{text: action.text, completed: false}]);
        case 'DELETE_TODO':
            return state.filter((elem, index) => action.index != index);
        case 'MARK_AS_COMPLETED':
            return state.map(markCompletedAtIndex(action.index));
        default:
            return state;
    }
};

const visibilityFilterReducer = function (state = "SHOW_ALL", action) {
    switch (action.type) {
        case 'VISIBILITY_FILTER':
            return action.visibility;
        default:
            return state;
    }
};

const reducerMap = {
    visibilityFilter: visibilityFilterReducer,
    todos: toDosReducer
};

const toDoStore = createStore(combineReducers(reducerMap), initialState);
const toDoApp = {};
const print = function (text) {
    console.log(text);
};
toDoApp.addToDo = function (text) {
    toDoStore.dispatch(addToDoAction(text));
};
toDoApp.deleteToDo = function (index) {
    toDoStore.dispatch(deleteToDoAction(index));
};
toDoApp.markAsCompleted = function (index) {
    toDoStore.dispatch(markAsCompletedAction(index))
};
toDoApp.setVisibilityFilter = function (arg) {
  toDoStore.dispatch(visibilityAction(arg))
};
toDoApp.listAll = function () {
    const state = toDoStore.getState();
    let allToDos;
    if (state.visibilityFilter == "SHOW_ALL") {
        allToDos = state.todos;
    } else {
        const completed = state.visibilityFilter == "COMPLETED";
        allToDos = state.todos.filter(elem => elem.completed == completed);
    }
    allToDos.forEach(print);
};
module.exports.toDoApp = toDoApp;
