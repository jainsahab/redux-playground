const createStore = require('redux').createStore;

const initialState = [];


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


// Reducers

const markCompletedAtIndex = function (givenIndex) {
    return (elem, index) => {
        if (index == givenIndex) {
            return Object.assign({}, elem, {completed: true});
        }
        return elem;
    }
};

const toDos = function (state = [], action) {
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

const toDoStore = createStore(toDos, initialState);
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
toDoApp.listAll = function () {
    const allToDos = toDoStore.getState();
    allToDos.forEach(print);
};
module.exports.toDoApp = toDoApp;