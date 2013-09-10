# Injector

[![Build Status](https://travis-ci.org/tanem/injector.png)](https://travis-ci.org/tanem/injector)

A small dependency injection module for Node.js. Extracted from a file used in a couple of other personal projects. Inspired by the dependency injection approaches in [AngularJS](https://github.com/angular/angular.js) and [node-di](https://github.com/vojtajina/node-di).

## Usage

### Installation

````sh
$ npm install injector --save
````

### Example

Take a look in the `example` dir. To run the example:

````sh
$ node example
````

## Development

### Dependencies

To generate the docs, ensure the following is installed:

 * [Pygments](http://pygments.org/download/)

Install global dependencies:

````sh
$ npm install -g grunt-cli istanbul
````

Change to your project directory then install local dependencies:

````sh
$ npm install
````

Start:

````sh
$ grunt start
````

To find out more about the various Grunt tasks, see `Gruntfile.js`. For for a high-level overview run:

````sh
$ grunt --help
````

## Credits

 * [@appleYaks](https://github.com/appleYaks), whose [grunt-express-workflow](https://github.com/appleYaks/grunt-express-workflow) I leaned heavily on when configuring Istanbul
 * [@vojtajina](https://github.com/vojtajina), whose injector recipe in [node-di](https://github.com/vojtajina/node-di) gave me ideas for module registration
 * [AngularJS](https://github.com/angular/angular.js), where the idea of [how to specify dependencies to be injected](http://docs.angularjs.org/guide/di) came from