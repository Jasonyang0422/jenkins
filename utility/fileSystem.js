var fs = require('fs');

function FileSystem(filePath) {

	this.filePath = filePath;

	this.writeFile = writeFile;
	this.readFile = readFile;
	this.writeArrayToFile = writeArrayToFile;
	this.pushToArrayInFile = pushToArrayInFile;

}

module.exports = FileSystem;

function writeFile(string) {
	var that = this;

	return new Promise(function(resolve, reject) {
		fs.writeFile(that.filePath, string, function(err) {
		    if(err) { 
		    	reject(err); 
		    } else {
				resolve("The file was saved!");
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

function writeArrayToFile(string, variableName) {
	var that = this;

	return this.writeFile("var " + variableName + " = ['" + string + "'];");
}

function pushToArrayInFile(string) {
	var that = this;
	
	return this.readFile()
		.then(function(originalStr) {
			if(originalStr.length > 0) {
				var len = originalStr.length;
				var newStr = originalStr.slice(0, len - 2) + ", '" + string + "'];";
				return that.writeFile(newStr);
			}
		});
}

function imageStringProcessor(imageStr) {

}







