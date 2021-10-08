# speedconcat
NodeJS module for fast string generation.

## Installation Instructions

### Local Directory

In the directory in question, run this command:

```
npm install speedconcat
```

### Global

Assuming you have the rights to do so, run this command:

```
npm install -g speedconcat
```

## Usage Instructions
There is one member function: newConcatenator. This makes a new speedConcatenator object. It takes a single optional parameter: a string to use as the beginning.

The speedConcatenator object has two member functions: append() and getResult(). append() takes a string or something that can be turned into a string, and adds it to the cue of things that will be concatenated together when needed. getResult() takes all of the strings, concatenates them together in order of insertion, and returns the result.

## Example

```
var speedConcat = require("speedconcat");
var workingConcatenator = new speedConcat.newConcatenator("");
var upperBound = 10; 
for (var index = 0; index < upperBound; index++) {
	workingConcatenator.append(""+index);
}
var result = workingConcatenator.getResult();
console.log(result); /*0123456789*/
```

## FAQ
Why is this faster than manually concatenating a bunch of strings in order?

This is faster because, in standard implementations, when concatenation is performed, a new string is created, which copies the values of the previous two strings. Each character must be copied each time it's in a concatenation as a result, the performance is O(NL), where N is the number of characters, and L is the number of strings, effectively an optimization of O(N^2), since that's what it would be if each string were a single character. This doesn't concatenate them in a sequential manner. They are all concatenated in a tree-like manner, being in iterated sets of two. As a result, rather than O(NL), this is O(N * LOG2(L)), or O(N * LOG2(N)) for single-char strings.

Where would this be useful? 

This would be useful in anything where you need to do string work as quickly as possible, such as in a string salter, or an HTTP or FTP server. 