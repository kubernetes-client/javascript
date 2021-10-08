var speedConcat = require("./code.js");
var workingConcatenator = new speedConcat.newConcatenator("");
var upperBound = 131072; 
for (var index = 0; index < upperBound; index++) {
	workingConcatenator.append(index);
}
var result = workingConcatenator.getResult();
console.log(result);
console.log("\n\n");
var traditional = "";
for (var index = 0; index < upperBound; index++) {
	traditional = traditional + index;
}
console.log(traditional);