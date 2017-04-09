var createStore = require('redux').createStore;
var fs = require('fs');

var rawState = [];
var initialState = fs.existsSync('todo.json') && JSON.parse(fs.readFileSync('todo.json')) || rawState;

var addToDoAction = function(text) {
	return { type: 'ADD_TODO', text: text}
}

var deleteToDoAction = function(index) {
	return { type: 'DELETE_TODO', index: index}
}

var toDos = function(state = [], action) {
	switch (action.type) {
	case 'ADD_TODO':
		return state.concat([{ text: action.text, completed: false }]);
	case 'DELETE_TODO':
		return state.filter((elem, index) => action.index != index);
	default:
		return state;
	}
}

var toDoStore = createStore(toDos, initialState);
var toDoApp = {};
var print = function(text) {console.log(text);}
toDoApp.addToDo = function(text) {
	toDoStore.dispatch(addToDoAction(text));
}
toDoApp.deleteToDo = function(index) {
	toDoStore.dispatch(deleteToDoAction(index));
}
toDoApp.listAll = function() {
	var allToDos = toDoStore.getState();
	allToDos.forEach(print);
}
module.exports.toDoApp = toDoApp;