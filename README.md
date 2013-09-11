# Infector

[![Build Status](https://travis-ci.org/tanem/infector.png)](https://travis-ci.org/tanem/infector)

A small dependency injection module for Node.js. Inspired by the dependency injection approaches in [AngularJS](https://github.com/angular/angular.js) and [node-di](https://github.com/vojtajina/node-di). No relation to [Infector++](https://code.google.com/p/infectorpp/), see the credits section below.

## Usage

### Installation

````sh
$ npm install infector --save
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

### Docs

To generate:

````sh
$ grunt docs
````

Outputs to `_docs`. Open `_docs/README.md.html` in a browser to view.

### Unit Tests

To run the unit tests via [Mocha](https://github.com/visionmedia/mocha):

````sh
$ grunt test
````

### Code Coverage

To run the unit tests and generate an HTML code coverage report via [Istanbul](https://github.com/gotwarlost/istanbul):

````sh
$ grunt cover
````

Outputs to `_coverage`. Open `_coverage/index.html` in a browser to view.

### JSHint

To run [JSHint](https://github.com/jshint/jshint/) over the required files:

````sh
$ grunt jshint
````

### Start

The start task will execute certain tasks, then will watch the relevant files for changes, running appropriate tasks when required:

````sh
$ grunt start
````

To find out more about the various Grunt tasks, see `Gruntfile.js`.

## Credits

 * [@appleYaks](https://github.com/appleYaks), whose [grunt-express-workflow](https://github.com/appleYaks/grunt-express-workflow) I leaned heavily on when configuring Istanbul
 * [@vojtajina](https://github.com/vojtajina), whose injector recipe in [node-di](https://github.com/vojtajina/node-di) gave me ideas for module registration
 * [AngularJS](https://github.com/angular/angular.js), where the idea of [how to specify dependencies to be injected](http://docs.angularjs.org/guide/di) came from
 * [Infector++](https://code.google.com/p/infectorpp/), where the name for this component came from... it made me laugh :)