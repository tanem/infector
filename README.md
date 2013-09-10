# Injector

[![Build Status](https://travis-ci.org/tanem/injector.png)](https://travis-ci.org/tanem/injector)

A small dependency injection module for Node.js. Extracted from a file used in a couple of other personal projects.

## Usage

### Installation

````sh
$ npm install injector --save
````

### Example

Define a couple of modules:

````js
// moduleOne.js
var ModuleOne = module.exports = function ModuleOne(moduleTwo){
  this.two = moduleTwo;
};
ModuleOne.inject = ['moduleTwo'];

// moduleTwo.js
module.exports = { foo: 'bar' };
````

Register modules with the injector and define how they are to be returned:

````js
var injector = require('injector');

injector.registerModules({
  'moduleOne': { type: require('./moduleOne') },
  'moduleTwo': { value: require('./moduleTwo') }
});
````

Now when `moduleOne` is required, the injector will instantiate it and inject the required dependencies:

````js
var one = injector.get('moduleOne');
console.log(one.two.foo); // => "bar"
````

## Development

### Dependencies

Ensure the following is installed:

 * [Pygments](http://pygments.org/download/)

Install global dependencies:

````sh
$ npm install -g grunt-cli istanbul
````

Change to your project directory then install the local dependencies:

````sh
$ npm install
````

Start:

````sh
$ grunt start
````

To read descriptions of the various Grunt tasks:

````sh
$ grunt --help
````

## Credits

 * [@appleYaks](https://github.com/appleYaks), whose [grunt-express-workflow](https://github.com/appleYaks/grunt-express-workflow) I leaned heavily on when configuring Istanbul
 * [@vojtajina](https://github.com/vojtajina), whose injector recipe in [node-di](https://github.com/vojtajina/node-di) gave me ideas for module registration
 * [AngularJS](https://github.com/angular/angular.js), where the idea of [how to specify dependencies to be injected](http://docs.angularjs.org/guide/di) came from