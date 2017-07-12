var fs = require('fs');

function FileSystem(filePath) {

	this.filePath = filePath;

	this.arrayExist = false;

	this.writeFile = writeFile;
	this.readFile = readFile;
	this.writeArrayToFile = writeArrayToFile;
	this.pushToArrayInFile = pushToArrayInFile;
	this.createObjectStr = createObjectStr;

}

module.exports = FileSystem;

function writeFile(string) {
	var that = this;

	return new Promise(function(resolve, reject) {
		fs.writeFile(that.filePath, string, function(err) {
		    if(err) { 
		    	reject(err); 
		    } else {
		    	that.arrayExist = true;
				resolve("Success: the screenshot has been saved to variables.js!");
		    }
		});
	});
}

function readFile() {
	var that = this;

	return new Promise(function(resolve, reject) {
		fs.readFile(that.filePath, "utf8", function(err, data) {
			if(err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

function writeArrayToFile(objectStr, variableName) {
	var that = this;

	return this.writeFile('var ' + variableName + ' = [' + objectStr + '];');
}

function pushToArrayInFile(objectStr) {
	var that = this;
	
	return this.readFile()
		.then(function(originalStr) {
			if(originalStr.length > 0) {
				var len = originalStr.length;
				var newStr = originalStr.slice(0, len - 2) + ', ' + objectStr + '];';
				return that.writeFile(newStr);
			}
		});
}

function createObjectStr(obj) {
	var str = "{ "
	for(var key in obj) {
		str += (key + ': "' + obj[key] + '",');
	}
	return str.slice(0, str.length - 1) + ' }';
}






