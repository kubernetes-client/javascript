"use strict";
const args = process.argv;
for (var index = 0; index < args.length; index++) {
  if (args[index]=="-l" || args[index]=="--legacy") {
    require("./cli.js");
    return;
  }
}
const repl = require('repl');
const fs = require('fs');
const path = require("path");
const vt = require("./code.js");
const firstDirectory = process.cwd();
const replServer = repl.start({prompt: '> '});
replServer.defineCommand('pwd', {
  help: 'Prints the working directory.',
  action(garbage) {
    this.lineParser.reset();
    this.bufferedCommand = '';
    console.log(process.cwd());
    this.displayPrompt();
  }
});
replServer.defineCommand('cd', {
  help: 'Sets the working directory.',
  action(input) {
    if (input=="") {
      this.lineParser.reset();
      this.bufferedCommand = '';
      process.chdir(firstDirectory);
      this.displayPrompt();
      return;
    }
    this.lineParser.reset();
    this.bufferedCommand = '';
    if (path.isAbsolute(input)) {
      process.chdir(input);
    } else {
      process.chdir(path.normalize(path.join(process.cwd(), input)));
    }
    this.displayPrompt();
  }
});
