var toDoApp = require('./todo').toDoApp;
var stdin = process.openStdin();


var executeCommand = function(command, arg) {
	if(command == "add") 
		return toDoApp.addToDo(arg);
	if(command == "del") 
		return toDoApp.deleteToDo(parseInt(arg));
	if(command == "ls") 
		return toDoApp.listAll();
}

stdin.addListener("data", function(d) {
	var input = d.toString().trim()
	var command = input.substr(0, input.indexOf(' ')) || input;
	var arg = input.substr(input.indexOf(' ')+1);
	executeCommand(command, arg);
});