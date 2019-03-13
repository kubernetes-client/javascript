// This script is supposed to be run in travis to check package version matches
// because of this it is designed to be run on a "clean" git checkout 
// this will fail if run after npm install (since npm install updates package-lock)
const packageVersion = require('./package.json').version 
const lockVersion = require('./package-lock.json').version
if (packageVersion != lockVersion) {
    console.log(`version in package.json (${packageVersion}) does not match package-lock.json (${lockVersion})`);
    process.exit(1);
}
